/**
 * MIT License
 * Copyright (c) Meta Platforms, Inc. and affiliates.

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OPEN_FLOATING_COMPOSER_COMMAND } from "@liveblocks/react-lexical";
import { MessageSquarePlus } from "lucide-react";
import { createPortal } from "react-dom";
import { useFloatingSelectionRange } from "@/hooks/editor/useFloatingSelectionRange";
import { useFloatingToolbarPosition } from "@/hooks/editor/useFloatingToolbarPosition";

export default function FloatingToolbar() {
  const { range, setRange } = useFloatingSelectionRange();

  if (range === null) return null;

  return (
    <Toolbar range={range} onRangeChange={setRange} container={document.body} />
  );
}

function Toolbar({
  range,
  onRangeChange,
  container,
}: {
  range: Range;
  onRangeChange: (range: Range | null) => void;
  container: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();
  const { setFloating, strategy, x, y } = useFloatingToolbarPosition(range);

  return createPortal(
    <div
      ref={setFloating}
      style={{
        position: strategy,
        top: 0,
        left: 0,
        transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`,
        minWidth: "max-content",
      }}
    >
      <div className="floating-toolbar">
        <button
          onClick={() => {
            const isOpen = editor.dispatchCommand(
              OPEN_FLOATING_COMPOSER_COMMAND,
              undefined,
            );
            if (isOpen) {
              onRangeChange(null);
            }
          }}
          className="floating-toolbar-btn"
          aria-label="Add comment"
        >
          <MessageSquarePlus size={20} />
        </button>
      </div>
    </div>,
    container,
  );
}