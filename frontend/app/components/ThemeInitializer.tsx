"use client";

import { useEffect } from "react";

const LIGHT_THEME = "curatedcanvas";
const DARK_THEME = "curatedcanvasdark";

function getPreferredTheme(): string {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
}

export default function ThemeInitializer() {
  useEffect(() => {
    const theme = getPreferredTheme();
    const htmlElement = document.documentElement;

    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, []);

  return null;
}
