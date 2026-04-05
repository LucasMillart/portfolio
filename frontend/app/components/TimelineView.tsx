"use client";

interface BacklogChange {
  change: string;
  timestamp: string;
}

interface BacklogItem {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  changes: BacklogChange[];
  status: string;
}

export default function TimelineView({ item }: { item: BacklogItem }) {
  const sortedChanges = [...(item.changes || [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="card bg-base-100 shadow-lg mb-4">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title">{item.title}</h3>
            <p className="text-sm mt-1">{item.description}</p>
          </div>
          <span className="badge badge-lg">
            {item.status === "done"
              ? "✅ Done"
              : item.status === "in-progress"
                ? "🔄 In Progress"
                : "📋 Todo"}
          </span>
        </div>

        {item.videoUrl && (
          <div className="mt-4">
            <p className="text-sm mb-2">Video Demo:</p>
            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="315"
                src={item.videoUrl.replace("watch?v=", "embed/")}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {sortedChanges.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-4">Last Updates</h4>
            <ul className="timeline timeline-vertical timeline-snap-icon">
              {sortedChanges.map((change) => (
                <li key={`${item._id}-${change.timestamp}-${change.change}`}>
                  <div className="timeline-middle text-primary">●</div>
                  <div className="timeline-end timeline-box mb-4 w-full">
                    <p className="text-xs">
                      {new Date(change.timestamp).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-1 text-sm">{change.change}</p>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
