"use client";

import {
  ClientSideSuspense,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { Header } from "@/components/navigation/Header";
import { UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./ui/editor/Editor";

interface CollaborativeRoomProps {
  roomId: string,
  roomMetadata: {
    createrId: string,
    email: string,
    title: string,
  }
}

const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{}}
      initialStorage={{}}
    >
      <ClientSideSuspense fallback={<div>Loading</div>}>
        <div className="collaborative-room">
          <Header className="sticky top-0 left-0">
            

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