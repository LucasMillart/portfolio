import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container mx-auto">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            Portfolio
          </Link>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          <ul className="menu menu-horizontal gap-1 rounded-box bg-base-200 p-1">
            <li>
              <Link href="/" className="btn btn-ghost btn-sm">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="btn btn-ghost btn-sm">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/all-backlogs" className="btn btn-ghost btn-sm">
                Backlogs
              </Link>
            </li>
            <li>
              <Link href="/stats" className="btn btn-primary btn-sm">
                Stats
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
