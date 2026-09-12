"use client";

import { useState } from "react";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";
import type { User, UserType } from "@/types/types";

interface UseCollaboratorAccessParams {
  roomId: string;
  email: string;
  collaborator: User;
  updatedBy: User;
}

/**
 * Drives a single row in the collaborators list: the row's own
 * access-level state plus the change-access and remove handlers.
 */
export function useCollaboratorAccess({
  roomId,
  email,
  collaborator,
  updatedBy,
}: UseCollaboratorAccessParams) {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer",
  );
  const [loading, setLoading] = useState(false);

  const changeAccessHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (targetEmail: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email: targetEmail });

    setLoading(false);
  };

  return {
    userType,
    setUserType,
    loading,
    changeAccessHandler,
    removeCollaboratorHandler,
  };
}
