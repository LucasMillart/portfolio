"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement;

    if (savedTheme) {
      htmlElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      htmlElement.setAttribute("data-theme", "curatedcanvasdark");
      localStorage.setItem("theme", "curatedcanvasdark");
    } else {
      htmlElement.setAttribute("data-theme", "curatedcanvas");
      localStorage.setItem("theme", "curatedcanvas");
    }
  }, []);

  return null;
}
