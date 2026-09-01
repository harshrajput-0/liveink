import { Header } from "@/components/navigation/Header";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import AddDocumentBtn from "@/components/AddDocumentBtn";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const documents = [];

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      <Header className="sticky left-0 top-0"> 
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
            <UserButton />
        </div>
      </Header>

      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div>
          <FileText size={26} className="max-auto" />
          <AddDocumentBtn 
          userId={clerkUser.id}
          email={clerkUser.emailAddresses[0].emailAddress}          />
        </div>
      )}
    </main>
  );
};

export default Home;
