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
import Notification from "@/components/Notification";

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
          <Notification />
          <UserButton />
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="flex w-full flex-col items-center gap-10 mb-10">
          <div className="flex w-full max-w-182.5 item-end justify-between">
            <h3 className="text-28-semibold">All Documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>

          <ul className="flex w-full max-w-182.5 flex-col gap-4">
            {roomDocuments.data.map(
              ({ id, metadata, createdAt }: RoomDocument) => (
                <li
                  key={id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-dark-300 bg-dark-200 p-4 shadow-md transition-colors hover:bg-dark-300 sm:p-5"
                >
                  <Link
                    href={`/documents/${id}`}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <div className="hidden shrink-0 rounded-md bg-dark-500 p-2 sm:block">
                      <FileText size={26} />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="line-clamp-1 text-lg">{metadata.title}</p>
                      <p className="text-sm font-light text-blue-100">
                        Created At {dateConverter(createdAt)}
                      </p>
                    </div>
                  </Link>
                  <DeleteModal roomId={id} />
                </li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <div className="flex w-full max-w-182.5 flex-col items-center justify-center gap-5 rounded-lg border border-dark-300 bg-dark-200 px-10 py-12 shadow-md">
          <div className="flex size-14 items-center justify-center rounded-full bg-dark-500">
            <FileText size={26} className="max-auto" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-28-semibold text-center">No documents</h3>
            <p className="text-center text-sm font-light text-blue-100">
              Creaate document to start writing and collaborating
            </p>
          </div>

          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
