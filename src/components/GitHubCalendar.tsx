import { getContributions } from "@/lib/github";
import { CalendarGrid } from "./CalendarGrid";
import { SectionTitle } from "./SectionTitle";
import { SocialIcon } from "./SocialIcon";

export async function GitHubCalendar({ username }: { username: string }) {
  const data = await getContributions(username);

  const link = (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 transition hover:text-fg"
    >
      <SocialIcon type="github" />
      {username} <span aria-hidden>↗</span>
    </a>
  );

  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title="GitHub" aside={link} />

      <div className="rounded-card border border-line bg-card p-5 sm:p-7">
        {data ? (
          <>
            <p className="text-muted">
              <strong className="font-semibold text-fg">{data.total.toLocaleString("fr-FR")}</strong>{" "}
              contributions sur les 12 derniers mois
            </p>
            <CalendarGrid days={data.days} />
          </>
        ) : (
          <p className="text-muted">Calendrier indisponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
