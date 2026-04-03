"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const htmlElement = document.documentElement;
    return htmlElement.getAttribute("data-theme") === "curatedcanvasdark";
  });

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const newIsDark = !isDark;
    if (newIsDark) {
      htmlElement.setAttribute("data-theme", "curatedcanvasdark");
      localStorage.setItem("theme", "curatedcanvasdark");
    } else {
      htmlElement.setAttribute("data-theme", "curatedcanvas");
      localStorage.setItem("theme", "curatedcanvas");
    }
    setIsDark(newIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm gap-2"
      title={isDark ? "Light mode" : "Dark mode"}
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
