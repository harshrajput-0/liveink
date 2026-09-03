"use client";
import { useState, useRef, useEffect } from "react";
import {
  ClientSideSuspense,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { Header } from "@/components/navigation/Header";
import { UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./ui/editor/Editor";
import { Input } from "./ui/input";
import { Pencil } from "lucide-react";
import { updateDocument } from "@/lib/actions/room.actions";

interface CollaborativeRoomProps {
  roomId: string,
  roomMetadata: {
    createrId: string,
    email: string,
    title: string,
  }
}

const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  const currentUserType = "editor";

  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


// ===| UPDATE TITLE HANDLER |------------------------------------------------------
  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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

      setEditing(false);
    }
  }


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [documentTitle, roomId])



  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing])


  return (
    <RoomProvider
      id={roomId}
      initialPresence={{}}
      initialStorage={{}}
    >
      <ClientSideSuspense fallback={<div>Loading</div>}>
        <div className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
          <Header className="sticky top-0 left-0">
            <div className="flex w-fit items-center justify-center">
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter Title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="min-w-19.5! flex-1! border-none! bg-transparent! px-0! text-left! text-base! font-semibold! leading-6! focus-visible:ring-0! focus-visible:ring-offset-0! disabled:text-black! sm:text-xl! md:text-center!"
                />
              ) : (
                <>
                  <p className="line-clamp-1 border-dark-400 text-base font-semibold leading-6 sm:pl-0 sm:text-xl">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Pencil size={16}
                  onClick={() => setEditing(true)}
                  className="pointer ml-3"
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="rounded-md bg-dark-400/50 px-2 py-0.5 text-xs text-blue-100/50">View Only</p>
              )}

              {loading && <p className="text-sm text-gray-400">saving...</p>}
            </div>


            <div className="flex items-center gap-2 lg:gap-4">
              <ActiveCollaborators />
              <UserButton />
            </div>
          </Header>


          <Editor></Editor>


        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;