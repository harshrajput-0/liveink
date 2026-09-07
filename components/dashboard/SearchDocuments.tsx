"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchDocuments = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 300);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full max-w-105">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-100"
      />
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder="Search"
        aria-label="Search"
        className="h-9 rounded-lg border-dark-300 bg-dark-200 pl-9 pr-8 text-sm text-white placeholder:text-blue-100 focus-visible:ring-blue-400/50"
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear Search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-100 hover:text-white"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchDocuments;
