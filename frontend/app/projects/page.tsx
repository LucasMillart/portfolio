import ProjectsFooter from "./components/ProjectsFooter";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectsHeader from "./components/ProjectsHeader";
import ProjectsSidebar from "./components/ProjectsSidebar";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col text-base-content">
      <ProjectsHeader />

      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <ProjectsSidebar />
        <ProjectsGrid />
      </div>

      <ProjectsFooter />
    </div>
  );
}
