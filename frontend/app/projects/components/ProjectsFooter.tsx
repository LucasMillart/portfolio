import { socialLinks } from "../data";

export default function ProjectsFooter() {
  return (
    <footer className="border-t border-base-content/10 bg-base-100">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-4 py-5 text-[11px] tracking-[0.25em] text-base-content/55 uppercase sm:flex-row sm:px-8">
        <p>© 2026 - Portfolio</p>
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-base-content transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
