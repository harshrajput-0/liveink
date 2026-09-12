"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * next-themes only knows the real theme after the client has mounted
 * (to avoid a server/client hydration mismatch). This hook centralizes
 * that "mounted" guard so every component that needs the resolved theme
 * doesn't have to re-implement it.
 */
export function useMountedTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const isLight = mounted && resolvedTheme === "light";

  return { mounted, resolvedTheme, setTheme, isDark, isLight };
}
