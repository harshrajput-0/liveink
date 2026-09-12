"use client";

import { Moon, Sun } from "lucide-react";
import IconButton, { IconButtonProps } from "@/components/ui/icon-button";
import { useMountedTheme } from "@/hooks/theme/useMountedTheme";

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
  const { mounted, isDark, setTheme } = useMountedTheme();

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
