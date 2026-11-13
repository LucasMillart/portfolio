import { GitHubCalendar } from "@/components/GitHubCalendar";
import { HeroCard } from "@/components/HeroCard";
import { Profile } from "@/components/Profile";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { profile, projects } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14 lg:py-16 lg:pl-8 xl:gap-20">
      {/* Colonne gauche : fixe au défilement sur grand écran */}
      <aside className="lg:sticky lg:top-16 lg:self-start">
        <Profile />
      </aside>

      {/* Colonne droite : contenu */}
      <div className="flex min-w-0 flex-col gap-14">
        <HeroCard />

        <section className="flex flex-col gap-6">
          <SectionTitle title="Projets" aside={projects.length} />
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </section>

        <GitHubCalendar username={profile.github} />
      </div>
    </main>
  );
}
