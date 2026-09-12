import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useEffect, useState } from "react";
import { createDOMRange } from "@/lib/editor/domRange";

/**
 * Watches the Lexical selection and exposes it as a browser `Range`
 * whenever there's a non-collapsed, non-collaboration selection —
 * i.e. whenever the floating "add comment" toolbar should be shown.
 */
export function useFloatingSelectionRange() {
  const [editor] = useLexicalComposerContext();
  const [range, setRange] = useState<Range | null>(null);

  useEffect(() => {
    editor.registerUpdateListener(({ tags }) => {
      return editor.getEditorState().read(() => {
        // Ignore selection updates related to collaboration
        if (tags.has("collaboration")) return;

        const selection = $getSelection();
        if (!$isRangeSelection(selection) || selection.isCollapsed()) {
          setRange(null);
          return;
        }

        const { anchor, focus } = selection;

        const domRange = createDOMRange(
          editor,
          anchor.getNode(),
          anchor.offset,
          focus.getNode(),
          focus.offset,
        );

        setRange(domRange);
      });
    });
  }, [editor]);

  return { range, setRange };
}
