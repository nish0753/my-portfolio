import { useEffect } from "react";

// Force dark mode globally; no toggle exposed.
export function useTheme() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    localStorage.setItem("portfolio-theme", "dark");
  }, []);

  return { theme: "dark" as const };
}
