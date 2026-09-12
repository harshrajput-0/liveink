"use client";

import Link from "next/link";
import { RoomDocument } from "@/types/types";
import { FileText, LayoutGrid, List } from "lucide-react";
import DeleteModal from "@/components/documents/DeleteModal";
import { dateConverter } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useDocumentsView } from "@/hooks/dashboard/useDocumentsView";

const viewToggle =
  "flex size-7 items-center justify-center rounded-md transition-colors";

const DocumentsGrid = ({ documents }: { documents: RoomDocument[] }) => {
  const { view, setView } = useDocumentsView();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-20 semibold">My Documents</h3>

        <div className="flex items-center gap-1 rounded-md border border-border bg-surface p1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="Grid"
            aria-pressed={view === "grid"}
            className={cn(
              viewToggle,
              view === "grid" ? "bg-primary-tint text-primary" : "bg-transparent text-ink-muted",
            )}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            aria-label="List"
            aria-pressed={view === "list"}
            className={cn(
              viewToggle,
              view === "list" ? "bg-primary-tint text-primary" : "bg-transparent text-ink-muted",
            )}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {documents.map(({ id, metadata, createdAt }) => (
            <li
              key={id}
              className="group relative rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:bg-border"
            >
              <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <DeleteModal roomId={id} />
              </div>

              <Link
                href={`/documents/${id}`}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <FileText size={18} />
                </div>
                <p className="line-clamp-1 w-full text-sm truncate">
                  {metadata.title}
                </p>
                <p className="text-10 text-ink-muted">
                  {dateConverter(createdAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex w-full flex-col gap-4">
          {documents.map(({ id, metadata, createdAt }) => (
            <li
              key={id}
              className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface p-4 shadow-card transition-colors hover:bg-border sm:p-5"
            >
              <Link
                href={`/documents/${id}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <div className="hidden shrink-0 rounded-md bg-primary-tint p-2 text-primary sm:block">
                  <FileText size={26} />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="line-clamp-1 text-lg truncate">
                    {metadata.title}
                  </p>
                  <p className="text-sm font-light text-ink-muted">
                    Created At {dateConverter(createdAt)}
                  </p>
                </div>
              </Link>

              <DeleteModal roomId={id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentsGrid;
