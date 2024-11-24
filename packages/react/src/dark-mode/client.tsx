"use client";

import React from "react";
import { MoonIcon, SunIcon } from "../icons";

export function useDarkModeSelector() {
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

  return { selected, select };
}

export function DarkModeSelector(props: React.ComponentProps<"div">) {
  const { selected, select } = useDarkModeSelector();

  return (
    <div {...props} className={"relative" + (props.className ? ` ${props.className}` : "")}>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center text-lg">
        <MoonIcon className="hidden dark:block" />
        <SunIcon className="dark:hidden" />
      </div>
      <select
        value={selected}
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
