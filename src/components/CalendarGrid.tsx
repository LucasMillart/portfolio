"use client";

import { useEffect, useRef, useState } from "react";
import type { Day } from "@/lib/github";

// Niveaux 0 → 4 : vide puis les 4 tons de la palette pixel ; les plus hauts brillent.
const LEVEL = [
  "bg-white/[0.09]",
  "bg-pix-0",
  "bg-pix-1",
  "bg-pix-2 shadow-[0_0_6px_rgb(139_172_15/0.35)]",
  "bg-pix-3 shadow-[0_0_10px_rgb(196_227_58/0.55)]",
];
const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtShort = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

const utc = (date: string) => new Date(date + "T00:00:00Z");
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;

function toWeeks(days: Day[]) {
  // Chaque colonne commence un dimanche, comme sur GitHub.
  const padded: (Day | null)[] = [...Array(utc(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

function stats(days: Day[]) {
  let longest = 0, run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Série actuelle : on tolère un jour vide aujourd'hui (la journée n'est pas finie)
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);
  return { longest, current, best };
}

type Tip = { day: Day; x: number; y: number };

export function CalendarGrid({ days, total }: { days: Day[]; total: number }) {
  const weeks = toWeeks(days);
  const { longest, current, best } = stats(days);
  const box = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [reveal, setReveal] = useState(false);

  // Les cases s'allument colonne par colonne quand le calendrier entre à l'écran
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setReveal(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(box.current!);
    return () => io.disconnect();
  }, []);

  const monthOf = (w: (Day | null)[]) => {
    const d = w.find(Boolean);
    return d ? utc(d.date).getUTCMonth() : -1;
  };
  const monthLabels = weeks.map((w, i) => {
    const m = monthOf(w);
    return m >= 0 && (i === 0 || m !== monthOf(weeks[i - 1])) ? MONTHS[m] : "";
  });

  const show = (el: HTMLElement, day: Day) => {
    const a = el.getBoundingClientRect();
    const b = box.current!.getBoundingClientRect();
    setTip({ day, x: a.left - b.left + a.width / 2, y: a.top - b.top });
  };

  const cols = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };
  const items = [
    { label: "Plus longue série", value: plural(longest, "jour") },
    { label: "Série en cours", value: plural(current, "jour") },
    { label: "Meilleur jour", value: best.count > 0 ? `${best.count} · ${fmtShort.format(utc(best.date))}` : "—" },
  ];

  return (
    <div ref={box} className="relative">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div>
          <p className="text-4xl font-bold tracking-tight tabular-nums">{total.toLocaleString("fr-FR")}</p>
          <p className="mt-1 text-sm text-muted">contributions sur les 12 derniers mois</p>
        </div>
        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {items.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-subtle">{s.label}</dt>
              <dd className="mt-0.5 font-semibold tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Défile horizontalement dans la carte sur petit écran */}
      <div className="-mx-1 mt-7 overflow-x-auto px-1 pt-1 pb-1">
        <div className="grid min-w-[640px] grid-cols-[auto_1fr] gap-x-3">
          <div />
          <div className="grid gap-1 pb-2 text-[11px] text-subtle" style={cols}>
            {monthLabels.map((label, i) => (
              <span key={i} className="whitespace-nowrap">{label}</span>
            ))}
          </div>

          <div className="grid grid-rows-7 gap-1 text-[11px] leading-none text-subtle">
            {["", "lun.", "", "mer.", "", "ven.", ""].map((d, i) => (
              <span key={i} className="flex items-center">{d}</span>
            ))}
          </div>

          <div
            className={`grid grid-flow-col grid-rows-7 gap-1 ${reveal ? "cal-reveal" : ""}`}
            style={cols}
            onMouseLeave={() => setTip(null)}
          >
            {weeks.flatMap((week, wi) =>
              Array.from({ length: 7 }, (_, di) => {
                const day = week[di];
                if (!day) return <span key={`${wi}-${di}`} />;
                return (
                  <span
                    key={day.date}
                    aria-label={`${plural(day.count, "contribution")}, ${fmtLong.format(utc(day.date))}`}
                    onMouseEnter={(e) => show(e.currentTarget, day)}
                    style={{ animationDelay: `${wi * 14}ms` }}
                    className={`cal-cell aspect-square rounded-[4px] transition-transform duration-150 hover:z-10 hover:scale-125 ${LEVEL[day.level]}`}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>

      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-bg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          <strong className="font-semibold text-fg">
            {tip.day.count === 0 ? "Aucune contribution" : plural(tip.day.count, "contribution")}
          </strong>
          <span className="text-muted"> · {fmtLong.format(utc(tip.day.date))}</span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-end gap-1.5 text-[11px] text-subtle">
        Moins
        {LEVEL.map((c) => (
          <span key={c} className={`size-2.5 rounded-[3px] ${c}`} />
        ))}
        Plus
      </div>
    </div>
  );
}
