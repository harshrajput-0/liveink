import { Header } from "@/components/navigation/Header";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";

import { DeleteModal } from "@/components/DeleteModal";

type RoomDocument = {
  id: string;
  metadata: {
    title: string;
  };
  createdAt: string;
};

const Home = async () => {


  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const roomDocuments = await getDocuments(clerkUser.id); // Same bug email -> clerkUser.id


  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <UserButton />
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All Documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress} />
          </div>

          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: RoomDocument) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="document-list-item">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">

                    <FileText size={26} />

                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created At {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}

          </ul>
        </div>

      ) : (

        <div className="document-list-empty">
          <FileText size={26} className="max-auto" />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress} />
        </div>
      )}


    </main>
  );
};

export default Home;
