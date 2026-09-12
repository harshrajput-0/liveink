"use client";

import { useState } from "react";
import { deleteDocument } from "@/lib/actions/room.actions";

/**
 * Encapsulates the delete-document confirmation dialog's open/loading
 * state and the delete action itself.
 */
export function useDeleteDocument(roomId: string) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }

    setLoading(false);
  };

  return { open, setOpen, loading, deleteDocumentHandler };
}
