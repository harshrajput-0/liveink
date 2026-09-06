import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser, User } from "@clerk/nextjs/server";
import { hasWriteAccess } from "@/lib/utils";
import { redirect } from "next/navigation";

type SearchParamProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Document = async ( { params }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in')
  }
  const { id } = await params;

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.id,
  })

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const userData = users.map((user: User) => ({
    ...user,
    userType: room.metadata.creatorId === user.id ? "creator" : hasWriteAccess(room.usersAccesses[user.id]) ? "editor" : "viewer",
  }))
  const currentUserType = room.metadata.creatorId === clerkUser.id ? "creator" : hasWriteAccess(room.usersAccesses[clerkUser.id]) ? "editor" : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
      roomId={id} 
      roomMetadata={room.metadata}
      users={userData}
      currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
