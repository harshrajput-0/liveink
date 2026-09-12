import type { UserType } from "@/types/types";

/**
 * Whether a Liveblocks room-access list grants write access.
 */
export const hasWriteAccess = (accesses?: string[]) =>
  !!accesses?.some(
    (access) => access === "room:write" || access === "*:write",
  );

/**
 * Whether a given LiveInk user role is allowed to edit document content.
 */
export const canEditContent = (userType?: UserType | string) => {
  return userType === "editor" || userType === "creator";
};
