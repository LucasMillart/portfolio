"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  totalBacklogItems: number;
  projectsByStatus: {
    planning: number;
    inProgress: number;
    completed: number;
    onHold: number;
  };
  projectsByTech: Record<string, number>;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="alert alert-error">
          <span>{error || "Failed to load statistics"}</span>
        </div>
      </div>
    );
  }

  const completionRate =
    stats.totalProjects > 0
      ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
      : 0;

  const topTechnologies = Object.entries(stats.projectsByTech)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Portfolio Statistics</h1>
        <p className="text-base-content/70">
          Comprehensive overview of my development activity and progress
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="stats stats-vertical w-full gap-4 bg-transparent p-0 md:stats-horizontal mb-12">
        <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
          <div className="stat-figure text-primary text-4xl">📦</div>
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-primary">{stats.totalProjects}</div>
        </div>

        <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
          <div className="stat-figure text-success text-4xl">✅</div>
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">
            {stats.completedProjects}
          </div>
          <div className="stat-desc">{completionRate}% completion rate</div>
        </div>

        <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
          <div className="stat-figure text-info text-4xl">🔄</div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-info">{stats.inProgressProjects}</div>
        </div>

        <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
          <div className="stat-figure text-warning text-4xl">📋</div>
          <div className="stat-title">Backlog Items</div>
          <div className="stat-value text-warning">
            {stats.totalBacklogItems}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Project Status Distribution</h2>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Planning</span>
                  <span className="font-bold">
                    {stats.projectsByStatus.planning}
                  </span>
                </div>
                <progress
                  className="progress progress-warning"
                  value={stats.projectsByStatus.planning}
                  max={stats.totalProjects}
                ></progress>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>In Progress</span>
                  <span className="font-bold">
                    {stats.projectsByStatus.inProgress}
                  </span>
                </div>
                <progress
                  className="progress progress-info"
                  value={stats.projectsByStatus.inProgress}
                  max={stats.totalProjects}
                ></progress>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Completed</span>
                  <span className="font-bold">
                    {stats.projectsByStatus.completed}
                  </span>
                </div>
                <progress
                  className="progress progress-success"
                  value={stats.projectsByStatus.completed}
                  max={stats.totalProjects}
                ></progress>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>On Hold</span>
                  <span className="font-bold">
                    {stats.projectsByStatus.onHold}
                  </span>
                </div>
                <progress
                  className="progress progress-error"
                  value={stats.projectsByStatus.onHold}
                  max={stats.totalProjects}
                ></progress>
              </div>
            </div>
          </div>
        </div>

        {/* Top Technologies */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Top Technologies</h2>
            <div className="space-y-3 mt-4">
              {topTechnologies.map(([tech, count]) => (
                <div key={tech}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{tech}</span>
                    <span className="badge badge-lg badge-primary">
                      {count}
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary"
                    value={count}
                    max={Math.max(...Object.values(stats.projectsByTech))}
                  ></progress>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
