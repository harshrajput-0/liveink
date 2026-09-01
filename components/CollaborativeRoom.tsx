"use-client"

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import { Header } from "@/components/navigation/Header";
import { SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";


interface CollaborativeRoomProps { children: React.ReactNode; }

const CollaborativeRoom = ({ children }: CollaborativeRoomProps) => {

  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <div>
      <RoomProvider id='my-room' initialPresence={{}} initialStorage={{}}>
        <ClientSideSuspense fallback={<div>Loading</div>} >
          <div className='collaborative-room'>
            <Header className="sticky top-0 left-0">
              <div className="flex items-center gap-2 lg:gap-4">

                {isSignedIn ? (
                  <>
                    <UserButton />


                    <button
                      onClick={() => signOut()}
                      className="rounded-md bg-red-600 px-4 py-2 text-md text-white">
                      Sign Out</button>
                  </>
                ) : (
                  <SignInButton>
                    <button className="rounded-md bg-black px-4 py-2 text-sm text-white"
                    >Sing in</button>
                  </SignInButton>
                )}

              </div>
            </Header>
          </div>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  )
}

export default CollaborativeRoom