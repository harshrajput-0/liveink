import { cn } from "@/lib/utils";
import InkSyncLogo from "../icons/InkSyncLogo";
import { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";

export const Header = ({
  className,
  search,
  children,
}: PropsWithChildren<{ className?: string; search?: ReactNode }>) => {
  return (
    <div
      className={cn(
        "min-h-23 min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4",
        className,
      )}
    >
      <Link href={"/"}>
        <InkSyncLogo width={200} theme="dark" />
      </Link>
      {search && (
        <div className="hidden flexx-1 justify-center px-4 md:flex">
          {search}
        </div>
      )}
      {children}
    </div>
  );
};
