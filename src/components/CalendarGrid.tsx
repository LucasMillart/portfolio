"use client";

import { useEffect, useRef, useState } from "react";
import type { Day } from "@/lib/github";

// Niveaux 0 → 4 : du gris foncé au blanc
const LEVEL = ["bg-[#262626]", "bg-[#4a4a4a]", "bg-[#737373]", "bg-[#a8a8a8]", "bg-fg"];
const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const utc = (date: string) => new Date(date + "T00:00:00Z");
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;

function toWeeks(days: Day[]) {
  // Chaque colonne commence un dimanche, comme sur GitHub.
  const padded: (Day | null)[] = [...Array(utc(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

type Tip = { day: Day; x: number; y: number };

export function CalendarGrid({ days, total }: { days: Day[]; total: number }) {
  const weeks = toWeeks(days);
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
  return (
    <div ref={box} className="relative">
      <p className="text-muted">
        <strong className="font-semibold text-fg tabular-nums">{total.toLocaleString("fr-FR")}</strong>{" "}
        contributions sur les 12 derniers mois
      </p>

      {/* Défile horizontalement dans la carte sur petit écran */}
      <div className="-mx-1 mt-6 overflow-x-auto px-1 pt-1 pb-1">
        <div className="grid min-w-[640px] grid-cols-[auto_1fr] gap-x-3">
          <div />
          <div className="grid gap-px pb-2 text-[11px] text-subtle" style={cols}>
            {monthLabels.map((label, i) => (
              <span key={i} className="whitespace-nowrap">{label}</span>
            ))}
          </div>

          <div className="grid grid-rows-7 gap-px text-[11px] leading-none text-subtle">
            {["", "lun.", "", "mer.", "", "ven.", ""].map((d, i) => (
              <span key={i} className="flex items-center">{d}</span>
            ))}
          </div>

          <div
            className={`grid grid-flow-col grid-rows-7 gap-px ${reveal ? "cal-reveal" : ""}`}
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
                    className={`cal-cell aspect-square transition-transform duration-150 hover:z-10 hover:scale-125 ${LEVEL[day.level]}`}
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
          <span key={c} className={`size-2.5 ${c}`} />
        ))}
        Plus
      </div>
    </div>
  );
}
