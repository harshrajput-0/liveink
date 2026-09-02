"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({ userId: userIds }); // was emailAddress

    const users = data.map((user: (typeof data)[number]) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((id) =>
      users.find((user) => user.id === id), // was user.email === email
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string; // now expects Clerk user ID, not email
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const userIds = Object.keys(room.usersAccesses).filter(
      (id) => id !== currentUser, // was email !== currentUser
    );

    if (text.length) {
      const client = await clerkClient();
      const { data } = await client.users.getUserList({ userId: userIds });

      const lowerCaseText = text.toLowerCase();
      const filteredIds = data
        .filter((u) =>
          `${u.firstName} ${u.lastName} ${u.emailAddresses[0].emailAddress}`
            .toLowerCase()
            .includes(lowerCaseText),
        )
        .map((u) => u.id);

      return parseStringify(filteredIds);
    }

    return parseStringify(userIds);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
};