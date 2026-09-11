"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IconButton, { IconButtonProps } from "@/components/shared/IconButton";

interface ThemeToggleProps {
  variant?: IconButtonProps["variant"];
  rounded?: IconButtonProps["rounded"];
  size?: IconButtonProps["size"];
  className?: string;
}

const ThemeToggle = ({
  variant = "ghost",
  rounded = true,
  size = "md",
  className,
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <IconButton
      icon={
        mounted ? (
          isDark ? (
            <Moon />
          ) : (
            <Sun />
          )
        ) : (
          // reserve the icon's footprint before hydration to avoid layout shift
          <span className="block size-5" />
        )
      }
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle theme"
      }
      variant={variant}
      rounded={rounded}
      size={size}
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
};

export default ThemeToggle;