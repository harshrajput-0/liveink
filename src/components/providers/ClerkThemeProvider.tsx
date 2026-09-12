"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";
import { useMountedTheme } from "@/hooks/theme/useMountedTheme";

/**
 * Shared appearance config for every Clerk UI (SignIn, SignUp, UserButton,
 * UserProfile, ...). Built from the app's own design tokens (see
 * globals.css) via Tailwind classes on `elements`, so Clerk's UI looks like
 * a native part of the app instead of an embedded widget — this is on top
 * of, not instead of, the light/dark `baseTheme` swap below.
 */
const clerkAppearance = {
  variables: {
    fontFamily: "var(--font-sans)",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-surface-raised shadow-card border border-border rounded-2xl p-8",
    header: "gap-1",
    headerTitle: "text-ink text-xl font-semibold",
    headerSubtitle: "text-ink-muted text-sm",

    // OAuth ("Continue with Google") buttons
    socialButtonsBlockButton:
      "h-11 rounded-lg border border-border-strong bg-surface text-ink transition-colors hover:bg-border hover:text-ink focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
    socialButtonsBlockButtonText: "text-sm font-medium text-ink",
    socialButtonsProviderIcon: "size-4.5",

    dividerRow: "my-5",
    dividerLine: "bg-border",
    dividerText: "text-ink-muted text-xs uppercase tracking-wide",

    formFieldLabel: "text-ink text-sm font-medium",
    formFieldInput:
      "h-11 rounded-lg border border-border-strong bg-surface text-ink placeholder:text-ink-muted transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
    formFieldInputShowPasswordButton: "text-ink-muted hover:text-ink",
    formFieldAction: "text-primary hover:text-primary-hover",

    formButtonPrimary:
      "h-11 rounded-lg bg-primary text-sm font-medium text-primary-foreground normal-case shadow-none transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary/30",

    footer: "bg-transparent",
    footerAction: "gap-1",
    footerActionText: "text-ink-muted text-sm",
    footerActionLink: "text-primary font-semibold hover:text-primary-hover",

    identityPreview: "border-border-strong bg-surface",
    identityPreviewText: "text-ink",
    identityPreviewEditButton: "text-primary hover:text-primary-hover",

    otpCodeFieldInput: "border-border-strong bg-surface text-ink",
    formResendCodeLink: "text-primary hover:text-primary-hover",

    badge: "bg-primary-tint text-primary",
  },
};

/**
 * Resolves Clerk's theme from next-themes on the client.
 * Defaults to Clerk's dark theme until the theme is resolved.
 */
export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { isLight } = useMountedTheme();

  return (
    <ClerkProvider
      appearance={{
        theme: isLight ? undefined : dark,
        ...clerkAppearance,
      }}
    >
      {children}
    </ClerkProvider>
  );
}