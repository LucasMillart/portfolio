import { cacheLife } from "next/cache";

export type Day = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number };
export type Contributions = { days: Day[]; total: number };

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

/**
 * Calendrier de contributions des 12 derniers mois. Mis en cache quelques heures.
 *
 * - Avec GITHUB_TOKEN : API GraphQL officielle. Si le token appartient au même
 *   compte, les contributions aux repos privés sont comptées.
 * - Sans token (ou si l'API échoue) : page publique de github.com, qui ne compte
 *   que les contributions publiques.
 */
export async function getContributions(username: string): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const fromApi = await viaApi(username, token);
    if (fromApi) return fromApi;
  }
  return viaPublicPage(username);
}

async function viaApi(login: string, token: string): Promise<Contributions | null> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!res.ok || !cal) {
      console.error("[github] API GraphQL :", res.status, json?.errors?.[0]?.message ?? json?.message);
      return null;
    }
    type ApiDay = { date: string; contributionCount: number; contributionLevel: keyof typeof LEVELS };
    const days: Day[] = cal.weeks.flatMap((w: { contributionDays: ApiDay[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    );
    return { days, total: cal.totalContributions };
  } catch (e) {
    console.error("[github] API GraphQL injoignable :", e);
    return null;
  }
}

async function viaPublicPage(username: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`);
    if (!res.ok) return null;
    const html = await res.text();

    // Nombre de contributions par case, via les infobulles <tool-tip for="id">
    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)/g)) {
      const n = /^(\d[\d,]*) contribution/.exec(m[2].trim());
      counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
    }

    const days: Day[] = [];
    for (const m of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
      const tag = m[0];
      const date = /data-date="([^"]+)"/.exec(tag)![1];
      const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0) as Day["level"];
      const id = /id="([^"]+)"/.exec(tag)?.[1] ?? "";
      days.push({ date, level, count: counts.get(id) ?? 0 });
    }
    if (days.length === 0) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));
    return { days, total: days.reduce((s, d) => s + d.count, 0) };
  } catch {
    return null;
  }
}
