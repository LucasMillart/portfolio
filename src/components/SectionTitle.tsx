import type { ReactNode } from "react";

/** Titre de section, avec à droite un compteur ou un lien. */
export function SectionTitle({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {aside && <div className="text-muted">{aside}</div>}
    </div>
  );
}
