"use client";

import {
  ClientSideSuspense,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { Header } from "@/components/navigation/Header";
import { UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";

interface CollaborativeRoomProps {
  children: React.ReactNode;
}

const CollaborativeRoom = ({ children }: CollaborativeRoomProps) => {
  return (
    <RoomProvider
      id="my-room"
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

          {children}
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;