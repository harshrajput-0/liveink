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

import InkSyncLoaderDraw from "@/components/icons/InkSyncLoaderDraw";

function Placeholder() {
  return (
    <div
      className="pointer-events-none absolute left-10 top-10 select-none overflow-hidden text-ellipsis text-[15px] text-blue-100"
    >
      Enter some rich text...
    </div>
  );
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
        <div className="w-full">
          <ToolbarPlugin />
        </div>

        <div className="flex h-[calc(100vh-140px)] w-full flex-col items-center justify-start overflow-auto px-5 pt-5 xl:pt-10">
          {status === "not-loaded" || status === "loading" ? (
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <InkSyncLoaderDraw />
            </div>
          ) : (

            <div className="relative h-full w-full max-w-200 rounded-sm bg-dark-200">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="relative h-full w-full resize-none p-10 text-[15px] text-blue-100 outline-none caret-[#444] tab-1"
                  />
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