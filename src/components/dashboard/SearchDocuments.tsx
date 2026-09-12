"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDocumentSearch } from "@/hooks/dashboard/useDocumentSearch";

const SearchDocuments = () => {
  const { value, setValue } = useDocumentSearch();

  return (
    <div className="relative w-full max-w-105">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
      />
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder="Search"
        aria-label="Search"
        className="h-9 rounded-lg border-border bg-surface pl-9 pr-8 text-sm text-ink placeholder:text-ink-muted focus-visible:ring-ring/50"
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear Search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchDocuments;
