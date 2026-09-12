"use client";

import { AddDocumentBtnProps } from "@/types/types";
import { Loader2, Plus } from "lucide-react";
import { useCreateDocument } from "@/hooks/documents/useCreateDocument";

const NewDocumentCard = ({ userId, email }: AddDocumentBtnProps) => {
  const { loading, createAndOpenDocument } = useCreateDocument({
    userId,
    email,
  });

  return (
    <button
      type="button"
      onClick={createAndOpenDocument}
      disabled={loading}
      className="flex aspect-3/4 w-37 shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-border-strong bg-surface px-4 py-5 shadow-card transition-colors hover:bg-border disabled:pointer-events-none disabled:opacity-70"
    >
      <div className="flex size-9 items-center justify-center rounded-full bg-primary-tint text-primary">
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Plus size={18} />
        )}
      </div>
      <p className="text-sm">{loading ? "Creating..." : "Blank document"}</p>
    </button>
  );
};

export default NewDocumentCard;
