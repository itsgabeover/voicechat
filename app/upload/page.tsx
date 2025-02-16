// ✅ SERVER COMPONENT
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadForm from "./upload-form"; // Import the client component

const UploadPage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }

  return <UploadForm userId={session.user.id} />;
};

export default UploadPage;
