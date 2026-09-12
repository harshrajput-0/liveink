"use client";

import LiveInkLoaderDraw from "@/components/icons/LiveInkLoaderDraw";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const LiveblocksAppProvider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.id ?? "",
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <LiveInkLoaderDraw />
          </div>
        }
      >
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default LiveblocksAppProvider;
