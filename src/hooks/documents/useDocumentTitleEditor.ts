"use client";

import { useEffect, useRef, useState } from "react";
import { updateDocument } from "@/lib/actions/room.actions";
import type { UserType } from "@/types/types";

interface UseDocumentTitleEditorParams {
  roomId: string;
  initialTitle: string;
  currentUserType: UserType;
}

/**
 * Drives the inline document-title editor in the editor header:
 * edit/loading state, the Enter-to-save handler, click-outside-to-save,
 * and auto-focusing the input when editing starts.
 */
export function useDocumentTitleEditor({
  roomId,
  initialTitle,
  currentUserType,
}: UseDocumentTitleEditorParams) {
  const [documentTitle, setDocumentTitle] = useState(initialTitle);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== initialTitle) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      setEditing(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        if (currentUserType === "creator" && documentTitle !== initialTitle) {
          updateDocument(roomId, documentTitle);
        }
        updateDocument(roomId, documentTitle);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [documentTitle, roomId, currentUserType, initialTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return {
    documentTitle,
    setDocumentTitle,
    editing,
    setEditing,
    loading,
    containerRef,
    inputRef,
    updateTitleOnEnter,
  };
}
