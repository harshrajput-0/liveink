"use client";
import { useState, useRef, useEffect } from "react";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import EditorHeader from "@/components/navigation/EditorHeader";
import { UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./ui/editor/Editor";
import { Input } from "./ui/input";
import { Pencil } from "lucide-react";
import { updateDocument } from "@/lib/actions/room.actions";
import InkSyncLoaderDraw from "./icons/InkSyncLoaderDraw";
import { CollaborativeRoomProps } from "@/types/types";
import ShareModal from "./ShareModal";
import ThemeToggle from "./navigation/ThemeToggle";
import { DownloadMenu } from "./shared";
import Notification from "./dashboard/Notification";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ===| UPDATE TITLE HANDLER |------------------------------------------------------
  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      setEditing(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        if (
          currentUserType === "creator" &&
          documentTitle !== roomMetadata.title
        ) {
          updateDocument(roomId, documentTitle);
        }
        updateDocument(roomId, documentTitle);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [documentTitle, roomId, currentUserType, roomMetadata.title]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId} initialPresence={{}} initialStorage={{}}>
      <ClientSideSuspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <InkSyncLoaderDraw />
          </div>
        }
      >
        <div className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
          <EditorHeader
            className="sticky top-0 left-0"
            backHref="/"
            subtitle={loading ? "Saving…" : "Saved"}
            titleContainerRef={containerRef}
            title={
              <>
                {editing && !loading ? (
                  <Input
                    id="inksync-doc-title"
                    type="text"
                    value={documentTitle}
                    ref={inputRef}
                    placeholder="Enter Title"
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    disabled={!editing}
                    className="min-w-19.5! flex-1! border-none! bg-transparent! px-0! text-left! text-base! font-bold! leading-6! text-ink! focus-visible:ring-0! focus-visible:ring-offset-0! disabled:text-ink! sm:text-xl! font-serif!"
                  />
                ) : (
                  <p
                    id={"inksync-data-title"}
                    className="line-clamp-1 text-base font-bold leading-6 text-ink sm:text-xl"
                  >
                    {documentTitle}
                  </p>
                )}

                {currentUserType === "creator" && !editing && (
                  <Pencil
                    size={16}
                    onClick={() => setEditing(true)}
                    className="pointer shrink-0 text-ink-muted"
                  />
                )}

                {currentUserType === "viewer" && !editing && (
                  <p className="shrink-0 rounded-md bg-border/50 px-2 py-0.5 text-xs font-normal text-ink-muted">
                    View Only
                  </p>
                )}
              </>
            }
          >
            <div className="flex items-center -space-x-2">
              <ActiveCollaborators />
              <div className="ring-1 ring-border-strong rounded-full">
                <UserButton />
              </div>
            </div>

            <ThemeToggle variant="outline" rounded={false} size="sm" />
            <DownloadMenu
              targetId="inksync-printable"
              triggerVariant="outline"
              triggerRounded={false}
              triggerSize="sm"
            />
            <Notification variant="outline" showCount size="sm" />

            <ShareModal
              roomId={roomId}
              collaborators={users}
              creatorId={roomMetadata.creatorId}
              currentUserType={currentUserType}
            />
          </EditorHeader>

          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;