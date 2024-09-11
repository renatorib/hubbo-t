"use client";

import React from "react";
import { MoonIcon, SunIcon } from "~/components/icons";

export function DarkModeSelector() {
  const [selected, setSelected] = React.useState<"system" | "light" | "dark">("system");
  const [prefersDark, setPrefersDark] = React.useState(false);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    setSelected(theme === "dark" || theme === "light" ? theme : "system");
    setPrefersDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  function select(theme: string) {
    if (theme === "dark" || theme === "light" || theme === "system") {
      if (theme === "dark" || (theme === "system" && prefersDark)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      setSelected(theme);
      localStorage.setItem("theme", theme);
    }
  }

  return (
    <div className="relative h-8 w-8 rounded dark:hover:bg-zinc-800 focus-within:ring">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center text-lg">
        <MoonIcon className="hidden dark:block" />
        <SunIcon className="dark:hidden" />
      </div>
      <select
        value={selected || "system"}
        onChange={(e) => select(e.currentTarget.value)}
        className="appearance-none absolute inset-0 opacity-0"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
