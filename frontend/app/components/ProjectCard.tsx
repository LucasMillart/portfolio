"use client";

import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  status: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    planning: "badge-warning",
    "in-progress": "badge-info",
    completed: "badge-success",
    "on-hold": "badge-error",
  };

  return (
    <Link href={`/project/${project._id}`} className="h-full">
      <div className="card card-border h-full cursor-pointer bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
        {project.imageUrl && (
          <figure className="h-48 overflow-hidden bg-base-200">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </figure>
        )}
        <div className="card-body">
          <div className="flex justify-between items-start gap-2">
            <h2 className="card-title text-lg">{project.name}</h2>
            <div
              className={`badge ${statusColors[project.status as keyof typeof statusColors]}`}
            >
              {project.status}
            </div>
          </div>
          <p className="line-clamp-2 text-base-content/70">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="badge badge-sm badge-outline">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="badge badge-sm">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-sm btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
