"use client";

import { useState } from "react";

export type DocumentsViewMode = "grid" | "list";

/** Local toggle between grid and list layout for the documents dashboard. */
export function useDocumentsView(initial: DocumentsViewMode = "grid") {
  const [view, setView] = useState<DocumentsViewMode>(initial);

  return { view, setView };
}
