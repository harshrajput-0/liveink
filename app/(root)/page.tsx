"use client"

import { Header } from "@/components/navigation/Header";
import { SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";

const Home = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      <Header className="sticky top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">

          { isSignedIn ? (
            <>
            <UserButton />


            <button 
            onClick={() => signOut()}
            className="rounded-md bg-red-600 px-4 py-2 text-md text-white">
              Sign Out</button>
            </>
          ): (
            <SignInButton>
              <button className="rounded-md bg-black px-4 py-2 text-sm text-white"
              >Sing in</button>
            </SignInButton>
          )}

        </div>
      </Header>
    </main>
  )
}

export default Home


