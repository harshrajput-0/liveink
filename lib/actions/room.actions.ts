"use server";

import { nanoid } from "@liveblocks/core";
import { RoomAccesses } from "@liveblocks/node";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreateDocumentParams {
  userId: string;
  email: string;
}

// ==========================================| REQUIRE ROOM OWNER |==========================================
export const requireRoomOwner = async(roomId: string) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("You need to sigin first");
  }

  const room = await liveblocks.getRoom(roomId);

  if (room.metadata.creatorId !== clerkUser.id) {
    throw new Error("You need to be doucument owner")
  }

  return { clerkUser, room };
}



// ==========================================| CREATE DOCUMENTS |==========================================
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [userId]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [], // Temporarily grant all user with write permission
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened during room creation: ${error}`);
  }
};

// ==========================================| GET DOCUMENT |==========================================
export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("you don't have access to this room");
    }

    return parseStringify(room)
  } catch (error) {
    console.log( `Error fetching the room: ${error}` );
  }
};


// ==========================================| GET DOCUMENTS |==========================================
export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(error);
  }
}

// ==========================================| UPDATE DOCUMENT |==========================================
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

  return parseStringify(updatedRoom)
  
} catch (error) {
  console.log(error);
}
}

// ==========================================| UPDATE DOCUMENTS ACCESS |==========================================
export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: {
  roomId: string;
  email: string;
  userType: "creator" | "editor" | "viewer";
  updatedBy: { name: string, avatar?: string };
}) => {
  try {
    // Only owner can change persmissioins
    await requireRoomOwner(roomId);

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

    // Notification when user is invited
    if (room) {
      const documentTitle = room.metadata?.title as string;

      await liveblocks.triggerInboxNotification({
        userId: invitedUser.id,
        kind: "$documentAccess",
        subjectId: nanoid(),
        activityData: {
          userType,
          title: `${updatedBy.name} has invited you to collaborate on ${documentTitle}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar ?? "",
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error updating document access: ${error}`);
  }
};

// ==========================================| REMOVE COLLABORATOR |==========================================
export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    // User must be owner to remove collaborator
    const { room } = await requireRoomOwner(roomId);

    const client = await clerkClient();
    const { data } = await client.users.getUserList({ emailAddress: [email] });
    if (!data.length) return;
    const targetUser = data[0];

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



// ==========================================| DELETE DOCUMENT |==========================================
export const deleteDocument = async (roomId: string) => {
  try {
    // Only owner can delete document
    await requireRoomOwner(roomId);

    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/")
  } catch (error) {
    console.log(`Unable to delete room ${error}`)
  }
}
