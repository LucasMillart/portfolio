"use client";

import { useEffect, useState } from "react";

interface BacklogItem {
  _id: string;
  title: string;
  status: string;
  description: string;
}

interface Backlog {
  _id: string;
  projectId: {
    _id: string;
    name: string;
  };
  items: BacklogItem[];
}

export default function AllBacklogsPage() {
  const [backlogs, setBacklogs] = useState<Backlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBacklogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/backlogs`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch backlogs");
        }
        const data = await response.json();
        setBacklogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBacklogs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "badge-success";
      case "in-progress":
        return "badge-info";
      case "todo":
        return "badge-warning";
      default:
        return "badge-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return "✅";
      case "in-progress":
        return "🔄";
      case "todo":
        return "📋";
      default:
        return "❔";
    }
  };

  const filteredBacklogs =
    filter === "all"
      ? backlogs
      : backlogs.map((bl) => ({
          ...bl,
          items: bl.items.filter((item) => item.status === filter),
        }));

  const totalItems = filteredBacklogs.reduce(
    (sum, b) => sum + b.items.length,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Project Backlogs</h1>
        <p className="text-base-content/70">
          Global overview of all backlog items across all projects
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="filter mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`btn ${filter === "all" ? "btn-primary" : "btn-soft"}`}
        >
          All Items ({totalItems})
        </button>
        <button
          onClick={() => setFilter("done")}
          className={`btn ${filter === "done" ? "btn-success" : "btn-soft"}`}
        >
          Done
        </button>
        <button
          onClick={() => setFilter("in-progress")}
          className={`btn ${filter === "in-progress" ? "btn-info" : "btn-soft"}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter("todo")}
          className={`btn ${filter === "todo" ? "btn-warning" : "btn-soft"}`}
        >
          To Do
        </button>
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

      {!loading && filteredBacklogs.length === 0 && (
        <div className="alert alert-info">
          <span>No backlogs found</span>
        </div>
      )}

      {!loading && filteredBacklogs.length > 0 && (
        <div className="space-y-6">
          {filteredBacklogs.map((backlog) =>
            backlog.items.length > 0 ? (
              <div key={backlog._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    {backlog.projectId.name}
                  </h2>

                  <div className="space-y-3">
                    {backlog.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-4 p-3 bg-base-200 rounded-lg"
                      >
                        <div className="text-2xl pt-1">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-base-content/70 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span
                          className={`badge badge-lg ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
