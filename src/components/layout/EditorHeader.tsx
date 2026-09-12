"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import IconButton from "@/components/ui/icon-button";
import { PropsWithChildren, ReactNode, RefObject } from "react";

interface EditorHeaderProps {
  backHref?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  titleContainerRef?: RefObject<HTMLDivElement | null>;
}

const EditorHeader = ({
  backHref = "/",
  title,
  subtitle = "Saved to LiveInk",
  className,
  titleContainerRef,
  children,
}: PropsWithChildren<EditorHeaderProps>) => {
  return (
    <header
      className={cn(
        "flex min-h-20 w-full min-w-full flex-nowrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Link href={backHref} aria-label="Back to documents" className="shrink-0">
          <IconButton
            icon={<ArrowLeft />}
            aria-label="Back to documents"
            variant="ghost"
            size="md"
          />
        </Link>
 
        <div ref={titleContainerRef} className="min-w-0">
          <div className="flex min-w-0 items-center gap-2 font-serif text-lg font-bold leading-6 text-ink sm:text-xl">
            {title}
          </div>
          {subtitle && (
            <p className="truncate text-xs text-ink-muted">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        {children}
      </div>
    </header>
  );
};

export default EditorHeader;
