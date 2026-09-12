"use client";

import { useOthers } from "@liveblocks/react/suspense";

/**
 * Returns the info of every other user currently present in the room
 * (i.e. everyone Liveblocks has resolved presence/info for).
 */
export function useActiveCollaborators() {
  const others = useOthers();

  return others.filter((other) => other.info).map((other) => other.info);
}
