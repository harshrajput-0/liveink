"use client";

import { cn } from "@/lib/utils";
import LiveInkLogo from "@/components/icons/LiveInkLogo";
import { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import { useMountedTheme } from "@/hooks/theme/useMountedTheme";
import ThemeToggle from "./ThemeToggle";

export const Header = ({
  className,
  search,
  children,
}: PropsWithChildren<{ className?: string; search?: ReactNode }>) => {
  const { isLight } = useMountedTheme();

  return (
    <div
      className={cn(
        "min-h-20 min-w-full flex-nowrap bg-surface border-b border-border flex w-full items-center justify-between gap-2 px-4",
        className,
      )}
    >
      <Link href={"/"}>
        <LiveInkLogo width={200} theme={isLight ? "light" : "dark"} />
      </Link>
      {search && (
        <div className="hidden flexx-1 justify-center px-4 md:flex">
          {search}
        </div>
      )}
      <div className="flex items-center gap-2 lg:gap-4">
        <ThemeToggle />
        {children}
      </div>
    </div>
  );
};
