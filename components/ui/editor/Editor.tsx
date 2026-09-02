"use client";

import Theme from "./plugins/Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LiveblocksPlugin } from "@liveblocks/react-lexical";   // + add
import React from "react";

import { liveblocksConfig } from "@liveblocks/react-lexical";



// HistoryPlugin import removed — Liveblocks provides its own undo/redo
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor() {
const initialConfig = liveblocksConfig({
  namespace: "MyEditor",
  theme: {},
  nodes: [],
  onError: (err) => console.error(err),
});


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LiveblocksPlugin>                                        {/* + wrap */}
        <div className="editor-container size-full">
          <ToolbarPlugin />

          <div className="editor-inner h-275">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-full" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <AutoFocusPlugin />
          </div>
        </div>
      </LiveblocksPlugin>                                       {/* + close */}
    </LexicalComposer>
  );
}