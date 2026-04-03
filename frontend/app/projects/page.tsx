"use client";

import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  status: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Projects</h1>
        <p className="text-base-content/70">
          Browse my portfolio projects. Click on any project to see more details
          and recent updates.
        </p>
        <div className="divider divider-start">catalog</div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="alert alert-info">
          <span>No projects found. Start by adding a new project!</span>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
