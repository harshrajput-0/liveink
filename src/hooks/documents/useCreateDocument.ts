"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/actions/room.actions";

interface UseCreateDocumentParams {
  userId: string;
  email: string;
}

/**
 * Encapsulates the "create a blank document, then open it" flow —
 * shared by the dashboard's AddDocumentBtn and NewDocumentCard UI.
 */
export function useCreateDocument({ userId, email }: UseCreateDocumentParams) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createAndOpenDocument = async () => {
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

  return { loading, createAndOpenDocument };
}
