"use server";

import { nanoid } from "@liveblocks/core";
import { RoomAccesses } from "@liveblocks/node";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { clerkClient } from "@clerk/nextjs/server";

interface CreateDocumentParams {
  userId: string;
  email: string;
}

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      createId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [userId]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"], // Temporarily grant all user with write permission
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened during room creation: ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("you don't have access to this room");
    // }

    return parseStringify(room)
  } catch (error) {
    console.log( `Error fetching the room: ${error}` );
  }
};

export const updateDocument = async(
  roomid: string,
  title: string
) => {

  try {
      const updatedRoom = await liveblocks.updateRoom(roomid, {
    metadata: {
      title
    }
  })

  revalidatePath(`/documents/${roomid}`);

  return parseStringify(updatedRoom);
  } catch (error) {
    console.log(error);
  }
}

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: {
  roomId: string;
  email: string;
  userType: "creator" | "editor" | "viewer";
  updatedBy: { name: string };
}) => {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({ emailAddress: [email] });

    if (!data.length) throw new Error("No user found with that email");
    const invitedUser = data[0];

    const usersAccesses: RoomAccesses = {
      [invitedUser.id]: userType === "viewer" ? ["room:read", "room:presence:write"] : ["room:write"],
    };

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error updating document access: ${error}`);
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({ emailAddress: [email] });
    if (!data.length) return;
    const targetUser = data[0];

    const room = await liveblocks.getRoom(roomId);

    // don't let the creator remove themselves
    if (room.metadata.creatorId === targetUser.id) return;

    const room2 = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [targetUser.id]: null, // setting to null removes that user's access
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room2);
  } catch (error) {
    console.log(`Error removing collaborator: ${error}`);
  }
};