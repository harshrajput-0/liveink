import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
      <SignIn />
    </main>
  );
}