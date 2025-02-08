"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Welcome! Please sign in or sign up.</h2>
      <Button onClick={() => signIn()}>Sign In / Sign Up</Button>
    </div>
  )
}

