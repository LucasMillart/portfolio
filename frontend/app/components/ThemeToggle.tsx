"use client";

import { useState } from "react";

const LIGHT_THEME = "curatedcanvas";
const DARK_THEME = "curatedcanvasdark";
const VALID_THEMES = new Set([LIGHT_THEME, DARK_THEME]);

function isDarkThemeEnabled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const currentTheme = document.documentElement.getAttribute("data-theme");
  return (
    currentTheme &&
    VALID_THEMES.has(currentTheme) &&
    currentTheme === DARK_THEME
  );
}

function applyTheme(isDark: boolean): void {
  const htmlElement = document.documentElement;
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(isDarkThemeEnabled);

  const toggleTheme = (): void => {
    const newIsDark = !isDark;

    applyTheme(newIsDark);
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
