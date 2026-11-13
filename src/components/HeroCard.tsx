import { Desk3D } from "./Desk3D";

/** Grande carte en haut à droite : le bureau en 3D, rendu en pixel art. */
export function HeroCard() {
  return (
    <section className="overflow-hidden rounded-card border border-line bg-card px-4 py-4">
      <Desk3D />
    </section>
  );
}
