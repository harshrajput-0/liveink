"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { AddDocumentBtnProps } from "@/types/types";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewDocumentCard = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addDocumentHandler = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={addDocumentHandler}
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
