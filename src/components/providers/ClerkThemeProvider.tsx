"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";
import { useMountedTheme } from "@/hooks/theme/useMountedTheme";

/**
 * Resolves Clerk's theme from next-themes on the client.
 * Defaults to Clerk's dark theme until the theme is resolved.
 */
export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { isLight } = useMountedTheme();

  return (
    <ClerkProvider appearance={{ theme: isLight ? undefined : dark }}>
      {children}
    </ClerkProvider>
  );
}
