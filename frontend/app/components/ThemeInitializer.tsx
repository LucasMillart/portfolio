"use client";

import { useEffect } from "react";

const LIGHT_THEME = "curatedcanvas";
const DARK_THEME = "curatedcanvasdark";
const VALID_THEMES = new Set([LIGHT_THEME, DARK_THEME]);

function getPreferredTheme(): string {
  // Guard for SSR
  if (typeof window === "undefined") {
    return LIGHT_THEME;
  }

  // Validate localStorage value
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && VALID_THEMES.has(savedTheme)) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
}

export default function ThemeInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const theme = getPreferredTheme();
    const htmlElement = document.documentElement;

    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, []);

  return null;
}
