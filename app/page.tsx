import { Button } from "@/components/ui/button";
import Login from "./components/Login"
import Link from 'next/link';
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-between p-2">
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        Insurance Analysis Chat
      </h1>
      <Login />
      {session && (
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      )}
    </main>
  );
}
