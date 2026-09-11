"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

/**
* Resolves Clerk's theme from next-themes on the client.
* Defaults to Clerk's dark theme until the theme is resolved.
*/

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <ClerkProvider appearance={{ theme: isLight ? undefined : dark }}>
      {children}
    </ClerkProvider>
  );
}
