import { projects } from "../data";

export default function ProjectsGrid() {
  return (
    <section className="flex-1 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Mes réalisations
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        Projets d&apos;Applications
      </h1>

      <div className="mt-10 grid max-w-245 grid-cols-1 gap-6 xl:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-base-content/15 bg-base-100 px-7 py-6 shadow-[0_2px_0_rgba(255,255,255,0.6)]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${project.accent}`}
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[24px] text-base-content">
                  {project.icon}
                </span>
              </div>
              <div>
                <h2 className="text-[28px] leading-7 font-semibold tracking-tight">
                  {project.name}
                </h2>
                <p className="mt-2 max-w-[44ch] text-sm leading-6 text-base-content/70">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
