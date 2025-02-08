import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Insurance Analysis Chat</h1>
      {session ? <Dashboard /> : <Login />}
    </main>
  )
}
