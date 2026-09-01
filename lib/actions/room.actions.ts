"use server";

import { nanoid } from "@liveblocks/core";
import { RoomAccesses } from "@liveblocks/node"
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

interface CreateDocumentParams { userId: string; email: string; }

export const createDocument = async ({ userId, email }: CreateDocumentParams ) => {
    const roomId = nanoid();

  try {
    const metadata = {
      createId: userId,
      email,
      title: "Untitled"
    }

const usersAccesses: RoomAccesses = {
    [email]: ['room:write']
}

const room = await liveblocks.createRoom(roomId, {
    metadata,
     usersAccesses,
     defaultAccesses: [],
});

revalidatePath('/');

return parseStringify(room);
  } catch (error) {
    console.log(`Error happened during room creation: ${error}`);
  }
}