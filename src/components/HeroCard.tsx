import { IsoDesk } from "./IsoDesk";

/** Grande carte en haut à droite : le bureau isométrique en pixel art. */
export function HeroCard() {
  return (
    <section className="overflow-hidden rounded-card border border-line bg-card px-4 py-8">
      <IsoDesk />
    </section>
  );
}
