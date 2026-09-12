"use client";

import { useState } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { updateDocumentAccess } from "@/lib/actions/room.actions";
import type { UserType } from "@/types/types";

interface UseShareDocumentParams {
  roomId: string;
}

/**
 * Drives the "share this document" dialog: dialog open state, the
 * invite form fields, and the invite submission handler.
 */
export function useShareDocument({ roomId }: UseShareDocumentParams) {
  const self = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);
    setError("");

    try {
      await updateDocumentAccess({
        roomId,
        email,
        userType,
        updatedBy: self.info,
      });
      setEmail("");
    } catch (error) {
      console.log(error);
      setError("Unable to send invite. Check email and try again");
    }

    setLoading(false);
  };

  return {
    self,
    open,
    setOpen,
    loading,
    error,
    email,
    setEmail,
    userType,
    setUserType,
    shareDocumentHandler,
  };
}
