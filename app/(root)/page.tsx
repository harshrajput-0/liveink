"use client"

import { Header } from "@/components/navigation/Header";
import { SignIn, UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
        <Header className="sticky top-0 left-0">
            
        </Header>
    </main>
  )
}

export default page


