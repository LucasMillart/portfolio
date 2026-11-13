import type { Project } from "@/content/site";

function Logo({ logo }: { logo: string }) {
  if (logo.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt="" className="size-9 shrink-0 rounded-lg object-cover" />;
  }
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-lg">
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

/** Carte projet : logo, titre, une phrase. Toute la carte est un lien. */
export function ProjectCard({ project }: { project: Project }) {
  const external = project.href.startsWith("http");
  return (
    <a
      href={project.href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className="group flex items-start gap-4 rounded-card border border-line bg-card p-4 transition duration-200 hover:border-line-strong hover:bg-card-hover"
    >
      <Logo logo={project.logo} />
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center justify-between gap-2 font-semibold tracking-tight">
          {project.name}
          <Arrow />
        </h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </a>
  );
}
