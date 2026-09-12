import {
  $createParagraphNode,
  $getSelection,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

export type ToolbarBlockType = "h1" | "h2" | "h3" | "quote";

/**
 * Toggle the current selection's block type. Must be called from inside
 * `editor.update(() => ...)` since it reads/writes Lexical editor state.
 */
export function toggleBlockType(
  activeBlock: string | null,
  type: ToolbarBlockType,
) {
  const selection = $getSelection();

  if (activeBlock === type) {
    return $setBlocksType(selection, () => $createParagraphNode());
  }

  if (type === "h1") {
    return $setBlocksType(selection, () => $createHeadingNode("h1"));
  }

  if (type === "h2") {
    return $setBlocksType(selection, () => $createHeadingNode("h2"));
  }

  if (type === "h3") {
    return $setBlocksType(selection, () => $createHeadingNode("h3"));
  }

  if (type === "quote") {
    return $setBlocksType(selection, () => $createQuoteNode());
  }
}
