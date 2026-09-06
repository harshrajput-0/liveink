import { cn } from "@/lib/utils";
import InkSyncLogo from "../icons/InkSyncLogo";
import { PropsWithChildren } from "react";
import Link from "next/link";

export const Header = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
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
      {children}
    </div>
  );
};
