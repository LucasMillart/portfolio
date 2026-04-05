import Link from "next/link";
import type { Project } from "../types";

type ProjectsGridProps = {
  projects: Project[];
  error?: string;
};

const iconByStatus: Record<Project["status"], string> = {
  planning: "event_note",
  "in-progress": "construction",
  completed: "task_alt",
  "on-hold": "pause_circle",
};

const accentByStatus: Record<Project["status"], string> = {
  planning: "bg-warning/20",
  "in-progress": "bg-info/20",
  completed: "bg-success/20",
  "on-hold": "bg-base-300",
};

export default function ProjectsGrid({ projects, error }: ProjectsGridProps) {
  return (
    <section className="flex-1 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Mes réalisations
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        Projets d&apos;Applications
      </h1>

      {error ? (
        <div className="alert alert-error mt-8">
          <span>{error}</span>
        </div>
      ) : null}

      {!error && projects.length === 0 ? (
        <div className="alert alert-info mt-8">
          <span>Aucun projet trouvé en base pour le moment.</span>
        </div>
      ) : null}

      <div className="mt-10 grid max-w-245 grid-cols-1 gap-6 xl:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/project/${project._id}`}
            className="h-full"
          >
            <article className="h-full rounded-2xl border border-base-content/15 bg-base-100 px-7 py-6 shadow-[0_2px_0_rgba(255,255,255,0.6)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${accentByStatus[project.status]}`}
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[24px] text-base-content">
                    {iconByStatus[project.status]}
                  </span>
                </div>
                <div>
                  <h2 className="text-[28px] leading-7 font-semibold tracking-tight">
                    {project.name}
                  </h2>
                  <p className="mt-2 max-w-[44ch] text-sm leading-6 text-base-content/70">
                    {project.description}
                  </p>
                  <span className="badge badge-outline mt-3">
                    {project.status}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
