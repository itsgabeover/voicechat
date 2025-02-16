import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const Login = async () => {
    const session = await auth();

    return (
      <div className="flex flex-col items-center gap-4">
        {!session && (
          <>
            <h2 className="text-2xl font-semibold">
              Welcome! Please sign in or sign up.
            </h2>
            <Button>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </>
        )}
      </div>
    );
}
 
export default Login;
