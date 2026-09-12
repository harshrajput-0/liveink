import { Header } from "@/components/layout/Header";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";

import Notification from "@/components/dashboard/Notification";
import NewDocumentCard from "@/components/dashboard/NewDocumentCard";
import DocumentsGrid from "@/components/dashboard/DocumentsGrid";
import SearchDocuments from "@/components/dashboard/SearchDocuments";
import { RoomDocument } from "@/types/types";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }
  const { q } = await searchParams;
  const roomDocuments = await getDocuments(clerkUser.id);

  const allDocuments: RoomDocument[] = roomDocuments.data;
  const query = q?.trim().toLocaleLowerCase() ?? "";
  const filteredDocuments = query
    ? allDocuments.filter((doc) =>
        doc.metadata.title.toLocaleLowerCase().includes(query),
      )
    : allDocuments;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-8 sm:gap-10">
      <Header className="sticky left-0 top-0 z-10" search={<SearchDocuments />}>
        <div className="flex items-center gap-2 lg:gap-4">
          <Notification />
          <UserButton />
        </div>
      </Header>

      <div className="flex w-full max-w-280 flex-1 flex-col gap-8 px-4">
        <div className="w-full md:hidden">
          <SearchDocuments />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-10 tracking-wide text-ink-muted ">
            Create a document
          </p>
          <NewDocumentCard
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>

        {allDocuments.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-5 rounded-md border border-border bg-surface p-10 shadow-card">
            <div className="flex size-15 items-center justify-center rounded-full bg-primary-tint text-primary">
              <FileText size={26} className="mx-auto" />
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <h3 className="text-28 font-semibold text-center">No Document</h3>
              <p className="text-center text-sm font-light text-ink-muted">
                Create your first document and start collaborating
              </p>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <p className="py-12 text-center text-sm font-light text-ink-muted">
            No result found
          </p>
        ) : (
          <DocumentsGrid documents={filteredDocuments} />
        )}
      </div>
    </main>
  );
};

export default Home;
