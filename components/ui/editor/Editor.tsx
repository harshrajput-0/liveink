"use client";

import Theme from "./plugins/Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LiveblocksPlugin, useEditorStatus } from "@liveblocks/react-lexical";   // + add

import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin"

import { liveblocksConfig } from "@liveblocks/react-lexical";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({ roomId, currentUserType }: EditorProps) {
  const status = useEditorStatus();

  const initialConfig = liveblocksConfig({
    namespace: "MyEditor",
    theme: Theme,
    nodes: [HeadingNode],
    onError: (error) => {
      console.error(error);
      throw error;
    },
    editable: true,
  });


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LiveblocksPlugin>                                        {/* + wrap */}
        <div className="editor-container size-full">
          <ToolbarPlugin />
        </div>

<div className="edtior-wrapper flex flex-col items-center justify-start">
  {status === "not-loaded" || status === "loading" ? "Loging Eidtor" : (

          <div className=" h-275">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-full" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />

            {currentUserType === "editor" && <FloatingToolbarPlugin />}
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
  )}
</div>

      </LiveblocksPlugin>                                       {/* + close */}
    </LexicalComposer>
  );
}