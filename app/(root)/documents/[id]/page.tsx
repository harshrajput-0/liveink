
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
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
    userId: clerkUser.emailAddresses[0].emailAddress,
  })
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
      roomId={id} roomMetadata={room.roomMetadata}
      />
    </main>
  );
};

export default Document;
