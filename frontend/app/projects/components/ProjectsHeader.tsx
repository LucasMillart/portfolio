import { headerActions, navItems } from "../data";

export default function ProjectsHeader() {
  return (
    <header className="h-16 border-b border-base-content/10 bg-base-100">
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8 lg:gap-16">
          <span className="text-lg font-semibold">Portfolio</span>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                className={
                  item.isActive
                    ? "font-semibold text-primary underline underline-offset-8"
                    : "text-base-content/70 transition-colors hover:text-base-content"
                }
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {headerActions.map((action) => (
            <button
              key={action.label}
              aria-label={action.label}
              className="btn btn-ghost btn-circle btn-sm text-base-content/80"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {action.icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
