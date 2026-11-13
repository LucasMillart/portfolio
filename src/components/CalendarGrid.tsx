"use client";

import { useRef, useState } from "react";
import type { Day } from "@/lib/github";

// Niveaux 0 → 4 : vide puis les 4 tons de la palette pixel
const LEVEL = ["bg-white/[0.05]", "bg-pix-0", "bg-pix-1", "bg-pix-2", "bg-pix-3"];
const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const utc = (date: string) => new Date(date + "T00:00:00Z");

function toWeeks(days: Day[]) {
  // Chaque colonne commence un dimanche, comme sur GitHub.
  const padded: (Day | null)[] = [...Array(utc(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

type Tip = { day: Day; x: number; y: number };

export function CalendarGrid({ days }: { days: Day[] }) {
  const weeks = toWeeks(days);
  const box = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

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
    <div ref={box} className="relative mt-5">
      {/* Défile horizontalement dans la carte sur petit écran */}
      <div className="overflow-x-auto pb-1">
        <div className="grid min-w-[640px] grid-cols-[auto_1fr] gap-x-3">
          <div />
          <div className="grid gap-[3px] pb-2 font-mono text-[11px] text-subtle" style={cols}>
            {monthLabels.map((label, i) => (
              <span key={i} className="whitespace-nowrap">{label}</span>
            ))}
          </div>

          <div className="grid grid-rows-7 gap-[3px] font-mono text-[11px] leading-none text-subtle">
            {["", "lun.", "", "mer.", "", "ven.", ""].map((d, i) => (
              <span key={i} className="flex items-center">{d}</span>
            ))}
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={cols} onMouseLeave={() => setTip(null)}>
            {weeks.flatMap((week, wi) =>
              Array.from({ length: 7 }, (_, di) => {
                const day = week[di];
                if (!day) return <span key={`${wi}-${di}`} />;
                return (
                  <span
                    key={day.date}
                    tabIndex={-1}
                    aria-label={`${day.count} contribution${day.count > 1 ? "s" : ""}, ${fmt.format(utc(day.date))}`}
                    onMouseEnter={(e) => show(e.currentTarget, day)}
                    className={`aspect-square ${LEVEL[day.level]} hover:outline hover:outline-1 hover:outline-fg`}
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
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-bg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg"
          style={{ left: tip.x, top: tip.y - 6 }}
        >
          <strong className="font-semibold text-fg">
            {tip.day.count === 0 ? "Aucune" : tip.day.count} contribution{tip.day.count > 1 ? "s" : ""}
          </strong>
          <span className="text-muted"> · {fmt.format(utc(tip.day.date))}</span>
        </div>
      )}

      <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[11px] text-subtle">
        moins
        {LEVEL.map((c) => (
          <span key={c} className={`size-2.5 ${c}`} />
        ))}
        plus
      </div>
    </div>
  );
}
