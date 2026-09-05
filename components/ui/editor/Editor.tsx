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
import { FloatingComposer, FloatingThreads, LiveblocksPlugin, useEditorStatus } from "@liveblocks/react-lexical";   // + add

import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin"

import { liveblocksConfig } from "@liveblocks/react-lexical";

import InkSyncLoaderDraw from "@/components/icons/InkSyncLoaderDraw";
import { DeleteModal } from "@/components/DeleteModal";
import { EditorProps } from "@/types/types";
import Comments from "@/components/Comments";
import { useThreads } from "@liveblocks/react/suspense";

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

  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: "MyEditor",
    theme: Theme,
    nodes: [HeadingNode],
    onError: (error) => {
      console.error(error);
      throw error;
    },
    editable: currentUserType === "editor",
  });


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="z-50 custom-scrollbar w-screen overflow-auto border-y border-dark-300 bg-dark-100 pl-3 pr-4 shadow-sm flex min-w-full justify-between">
          <ToolbarPlugin />
          {currentUserType === "editor" && <DeleteModal roomId={roomId} />}
        </div>

        <div className="custom-scrollbar h-[calc(100vh-140px)] gap-5 overflow-auto px-5 pt-5 lg:flex-row lg:items-start lg:justify-center  xl:gap-10 xl:pt-10 flex flex-col items-center justify-start">
          {status === "not-loaded" || status === "loading" ? (
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <InkSyncLoaderDraw />
            </div>
          ) : (

            <div className="editor-inner min-h-275 relative mb-5 h-fit w-full max-w-200 shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="editor-input h-full"
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
          <LiveblocksPlugin>


            <FloatingComposer className="w-87.5" />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}