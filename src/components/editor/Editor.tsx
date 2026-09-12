"use client";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
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

import LiveInkLoaderDraw from "@/components/icons/LiveInkLoaderDraw";
import { DeleteModal, DownloadMenu } from "@/components/documents";
import { EditorProps } from "@/types/types";
import { canEditContent } from "@/lib/permissions";
import { createEditorConfig } from "@/lib/editor/createEditorConfig";
import Comments from "@/components/documents/Comments";
import { Placeholder } from "./Placeholder";
import { useThreads } from "@liveblocks/react/suspense";

export function Editor({ roomId, currentUserType }: EditorProps) {
  const isEditorReady = useIsEditorReady();

  const { threads } = useThreads();

  const initialConfig = createEditorConfig(currentUserType);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          <div className="flex items-center gap-1 py-1.5">
            <DownloadMenu targetId="liveink-printable" />
            {currentUserType === "creator" && <DeleteModal roomId={roomId} />}
          </div>
        </div>

        <div className="editor-wrapper flex flex-col items-center justify-start">
          {!isEditorReady ? (
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <LiveInkLoaderDraw />
            </div>
          ) : (
            <div
              id="liveink-printable"
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
