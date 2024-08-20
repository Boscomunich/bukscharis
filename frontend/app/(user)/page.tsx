"use client"
import { signOut } from "next-auth/react"
import { Button } from "antd";
import { auth } from "@/auth"
import { useSession } from "next-auth/react"

export default function Home() {
  const session = useSession()
  return (
    <div className=" h-screen w-screen dark:bg-darkBg bg-primary pt-20 text-3xl"
    onClick={() => signOut({
      redirect: true,
      callbackUrl: '/login',
    })}>
      {session?.data?.user?.email}
    </div>
  );
}
