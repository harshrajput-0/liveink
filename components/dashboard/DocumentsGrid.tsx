"use client";

import { useState } from "react";
import Link from "next/link";
import { RoomDocument } from "@/types/types";
import { FileText, LayoutGrid, List } from "lucide-react";
import DeleteModal from "@/components/shared/DeleteModal";
import { dateConverter, cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

const DocumentsGrid = ({ documents }: { documents: RoomDocument[] }) => {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-20 semibold">My Documents</h3>

        <div className="flex items-center gap-1 rounded-md border border-dark-300 bg-dark-200 p1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="Grid"
            aria-pressed={view === "grid"}
            className={cn(
              "flex size-7 items-center justify-center rounded-md transition-colors",
              view === "grid" ? "bg-dark-400" : "bg-dark-300",
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
              "flex size-7 items-center justify-center rounded-md transition-colors",
              view === "list" ? "bg-dark-400" : "bg-dark-300",
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
              className="group relative rounded-xl border border-dark-300 bg-dark-200 p-5 shadow-md transition-colors hover:bg-dark-300"
            >
              <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <DeleteModal roomId={id} />
              </div>

              <Link
                href={`/documents/${id}`}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-dark-500">
                  <FileText size={18} />
                </div>
                <p className="line-clamp-1 w-full text-sm truncate">{metadata.title}</p>
                <p className="text-10 text-blue-100">
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
              className="flex items-center justify-between gap-4 rounded-md border border-dark-300 bg-dark-200 p-4 shadow-md transition-colors hover:bg-dark-300 sm:p-5"
            >
              <Link
                href={`/documents/${id}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <div className="hidden shrink-0 rounded-md bg-dark-500 p-2 sm:block">
                  <FileText size={26} />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="line-clamp-1 text-lg truncate">{metadata.title}</p>
                  <p className="text-sm font-light text-blue-100">
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
