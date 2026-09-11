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
import {
  FloatingComposer,
  FloatingThreads,
  LiveblocksPlugin,
  useIsEditorReady,
} from "@liveblocks/react-lexical";

import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";

import { liveblocksConfig } from "@liveblocks/react-lexical";

import InkSyncLoaderDraw from "@/components/icons/InkSyncLoaderDraw";
import { DeleteModal, DownloadMenu } from "@/components/shared";
import { EditorProps } from "@/types/types";
import { canEditContent } from "@/lib/utils";
import Comments from "@/components/Comments";
import { useThreads } from "@liveblocks/react/suspense";

function Placeholder() {
  return (
    <div className="pointer-events-none absolute left-10 top-10 select-none overflow-hidden text-ellipsis text-[15px] text-ink-muted">
      Enter some rich text...
    </div>
  );
}

export function Editor({ roomId, currentUserType }: EditorProps) {
  const isEditorReady = useIsEditorReady();

  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: "MyEditor",
    theme: Theme,
    nodes: [HeadingNode],
    onError: (error) => {
      console.error(error);
      throw error;
    },
    editable: canEditContent(currentUserType),
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          <div className="flex items-center gap-1 py-1.5">
            <DownloadMenu targetId="inksync-printable" />
            {currentUserType === "creator" && <DeleteModal roomId={roomId} />}
          </div>
        </div>

        <div className="editor-wrapper flex flex-col items-center justify-start">
          {!isEditorReady ? (
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <InkSyncLoaderDraw />
            </div>
          ) : (
            <div
              id="inksync-printable"
              className="editor-inner min-h-275 relative mb-5 h-fit w-full max-w-200 rounded-md lg:mb-10 border font-serif bg-surface border-border"
            >
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />

              {canEditContent(currentUserType) && <FloatingToolbarPlugin />}
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
