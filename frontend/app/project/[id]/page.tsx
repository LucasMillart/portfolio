"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TimelineView from "../../components/TimelineView";

interface BacklogItem {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  changes: Array<{ change: string; timestamp: string }>;
  status: string;
  createdAt?: string;
}

interface Backlog {
  _id: string;
  projectId: {
    _id: string;
    name: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    technologies: string[];
    status: string;
    github?: string;
    liveUrl?: string;
  };
  items: BacklogItem[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [backlog, setBacklog] = useState<Backlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBacklog = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/backlogs/project/${projectId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data = await response.json();
        setBacklog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchBacklog();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !backlog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Link href="/projects" className="btn btn-ghost mb-4">
          ← Back to Projects
        </Link>
        <div className="alert alert-error">
          <span>{error || "Project not found"}</span>
        </div>
      </div>
    );
  }

  const project = backlog.projectId;
  const latestItems = [...backlog.items].sort((a, b) => {
    const aLatest = a.changes?.[0]?.timestamp || a.createdAt || 0;
    const bLatest = b.changes?.[0]?.timestamp || b.createdAt || 0;
    return new Date(bLatest).getTime() - new Date(aLatest).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/projects" className="btn btn-ghost mb-8">
        ← Back to Projects
      </Link>

      {/* Project Header */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          {project.imageUrl && (
            <figure className="mb-6 rounded-lg overflow-hidden h-96">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={1600}
                height={900}
                unoptimized
                className="w-full h-full object-cover"
              />
            </figure>
          )}

          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <p className="text-lg text-base-content/70 max-w-2xl">
                {project.description}
              </p>
            </div>
            <div className="badge badge-lg badge-primary">{project.status}</div>
          </div>

          {/* Technologies */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="badge badge-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.github || project.liveUrl) && (
            <div className="mt-6 flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Video */}
      {project.videoUrl && (
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Project Overview</h2>
            <div className="w-full bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="400"
                src={project.videoUrl.replace("watch?v=", "embed/")}
                title={project.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Backlog Items Timeline */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Latest Updates</h2>
        {latestItems.length === 0 ? (
          <div className="alert alert-info">
            <span>No backlog items yet. Start adding tasks!</span>
          </div>
        ) : (
          latestItems.map((item) => <TimelineView key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
