import { GitHubCalendar } from "@/components/GitHubCalendar";
import { HeroCard } from "@/components/HeroCard";
import { Profile } from "@/components/Profile";
import { ProjectCard, ProjectRow } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { featured, others, profile } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12 lg:py-12 lg:pl-8 xl:gap-16">
      {/* Colonne gauche : fixe au défilement sur grand écran */}
      <aside className="lg:sticky lg:top-12 lg:self-start">
        <Profile />
      </aside>

      {/* Colonne droite : contenu */}
      <div className="flex min-w-0 flex-col gap-14">
        <HeroCard />

        <section className="flex flex-col gap-6">
          <SectionTitle title="Projets phares" aside={featured.length} />
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionTitle title="Autres projets" aside={others.length} />
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((p) => (
              <ProjectRow key={p.name} project={p} />
            ))}
          </div>
        </section>

        <GitHubCalendar username={profile.github} />
      </div>
    </main>
  );
}
