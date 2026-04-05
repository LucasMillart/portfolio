import ProjectsFooter from "./components/ProjectsFooter";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectsHeader from "./components/ProjectsHeader";
import ProjectsSidebar from "./components/ProjectsSidebar";
import type { Project } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

async function fetchProjects(): Promise<{
  projects: Project[];
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        projects: [],
        error: "Impossible de charger les projets depuis l'API.",
      };
    }

    const projects = (await response.json()) as Project[];
    return { projects };
  } catch {
    return {
      projects: [],
      error: "Erreur de connexion au backend. Verifie que l'API est lancee.",
    };
  }
}

export default async function ProjectsPage() {
  const { projects, error } = await fetchProjects();

  return (
    <div className="flex min-h-screen flex-col text-base-content">
      <ProjectsHeader />

      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <ProjectsSidebar />
        <ProjectsGrid projects={projects} error={error} />
      </div>

      <ProjectsFooter />
    </div>
  );
}
