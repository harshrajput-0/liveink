"use client";

import { cn } from "@/lib/utils";
import InkSyncLogo from "../icons/InkSyncLogo";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

export const Header = ({
  className,
  search,
  children,
}: PropsWithChildren<{ className?: string; search?: ReactNode }>) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        "min-h-20 min-w-full flex-nowrap bg-surface border-b border-border flex w-full items-center justify-between gap-2 px-4",
        className,
      )}
    >
      <Link href={"/"}>
        <InkSyncLogo
          width={200}
          theme={mounted && resolvedTheme === "light" ? "light" : "dark"}
        />
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