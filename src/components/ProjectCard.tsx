import type { Project } from "@/content/site";

export function Logo({ logo, size }: { logo: string; size: "md" | "sm" }) {
  const box = size === "md" ? "size-10 text-xl" : "size-8 text-lg";
  if (logo.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt="" className={`${box} shrink-0 rounded-lg object-cover`} />;
  }
  return (
    <span className={`${box} grid shrink-0 place-items-center rounded-lg bg-white/[0.06]`}>
      {logo}
    </span>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="size-4 shrink-0 -translate-x-1 translate-y-1 text-subtle opacity-0 transition duration-200 group-hover:translate-0 group-hover:text-fg group-hover:opacity-100"
    >
      <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const external = (href: string) => href.startsWith("http");

/** Grande carte : projets phares */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      {...(external(project.href) && { target: "_blank", rel: "noreferrer" })}
      className="group flex flex-col gap-4 rounded-card border border-line bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card-hover"
    >
      <div className="flex items-center gap-3">
        <Logo logo={project.logo} size="md" />
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        <span className="ml-auto">
          <Arrow />
        </span>
      </div>
      <p className="text-muted">{project.description}</p>
    </a>
  );
}

/** Ligne compacte : autres projets */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      {...(external(project.href) && { target: "_blank", rel: "noreferrer" })}
      className="group -m-3 flex gap-3 rounded-xl p-3 transition hover:bg-card"
    >
      <Logo logo={project.logo} size="sm" />
      <div className="min-w-0">
        <h3 className="flex items-center gap-1 font-semibold">
          {project.name}
          <Arrow />
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </a>
  );
}
