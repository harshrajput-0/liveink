/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import {
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { useRef } from "react";
import { useToolbarFormatState } from "@/hooks/editor/useToolbarFormatState";
import { useActiveBlock } from "@/hooks/editor/useActiveBlock";
import { toggleBlockType } from "@/lib/editor/blockFormatting";

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const toolbarRef = useRef(null);
  const {
    editor,
    canUndo,
    canRedo,
    isBold,
    isItalic,
    isUnderline,
    isStrikethrough,
  } = useToolbarFormatState();
  const activeBlock = useActiveBlock();

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <Undo2 className="format-icon" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <Redo2 className="format-icon" />
      </button>
      <Divider />
      <button
        onClick={() => editor.update(() => toggleBlockType(activeBlock, "h1"))}
        data-active={activeBlock === "h1" ? "" : undefined}
        className={
          "toolbar-item spaced " + (activeBlock === "h1" ? "active" : "")
        }
      >
        <Heading1 className="format-icon" />
      </button>
      <button
        onClick={() => editor.update(() => toggleBlockType(activeBlock, "h2"))}
        data-active={activeBlock === "h2" ? "" : undefined}
        className={
          "toolbar-item spaced " + (activeBlock === "h2" ? "active" : "")
        }
      >
        <Heading2 className="format-icon" />
      </button>
      <button
        onClick={() => editor.update(() => toggleBlockType(activeBlock, "h3"))}
        data-active={activeBlock === "h3" ? "" : undefined}
        className={
          "toolbar-item spaced " + (activeBlock === "h3" ? "active" : "")
        }
      >
        <Heading3 className="format-icon" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <Bold className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <Italic className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <Underline className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <Strikethrough className="format-icon" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <AlignLeft className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <AlignCenter className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <AlignRight className="format-icon" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <AlignJustify className="format-icon" />
      </button>{" "}
    </div>
  );
}