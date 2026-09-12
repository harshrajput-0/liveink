// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import type { BaseMetadata } from "@liveblocks/client";

declare global {
  interface Liveblocks {
    Presence: Record<string, never>;

    Storage: Record<string, never>;

    UserMeta: {
      id: string;
      info: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        color: string;
      };
    };

    RoomEvent: never;

    ThreadMetadata: BaseMetadata;

    RoomInfo: object;

    ActivitiesData: {
      $documentAccess: {
        userType: string;
        title: string;
        updatedBy: string;
        avatar: string;
      };
    };
  }
}

export {};
