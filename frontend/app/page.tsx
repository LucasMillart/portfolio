import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content container mx-auto flex-col px-4 py-14">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center gap-2">
            <span className="badge badge-primary badge-outline">Portfolio</span>
            <span className="badge badge-secondary badge-outline">
              Backlogs
            </span>
            <span className="badge badge-accent badge-outline">Stats</span>
          </div>
          <h1 className="text-4xl font-bold md:text-6xl">
            Build. Track. Improve.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base-content/70 md:text-lg">
            Découvrez mes projets, suivez les évolutions via une timeline
            backlog verticale, et visualisez une vue globale de ma progression.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/projects"
            className="card card-border bg-base-100 shadow-sm transition hover:shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">Projects</h2>
              <p>Tous les projets avec accès direct aux détails.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-primary btn-sm">Explorer</span>
              </div>
            </div>
          </Link>

          <Link
            href="/all-backlogs"
            className="card card-border bg-base-100 shadow-sm transition hover:shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">All Backlogs</h2>
              <p>Vue consolidée de toutes les tâches et changements.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-secondary btn-sm">Voir</span>
              </div>
            </div>
          </Link>

          <Link
            href="/stats"
            className="card card-border bg-base-100 shadow-sm transition hover:shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">Statistics</h2>
              <p>Indicateurs de progression et distribution technologique.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-accent btn-sm">Analyser</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
