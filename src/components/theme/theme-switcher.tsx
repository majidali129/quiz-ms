"use client";

import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} size={"icon"} variant={"outline"}>
      <SunIcon className="w-4 h-4 transition-all rotate-0 scale-100 dark:scale-0 dark:-rotate-90" />
      <Moon className="w-4 h-4 transition-transform rotate-90 scale-0 dark:scale-100 dark:-rotate-0 absolute" />
    </Button>
  );
};
