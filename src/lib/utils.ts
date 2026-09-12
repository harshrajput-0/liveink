import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deep-clone a JSON-serializable value. Used to strip non-plain objects
 * (e.g. class instances returned by the Liveblocks SDK) before passing
 * data from a Server Component/Action to a Client Component.
 */
export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));
