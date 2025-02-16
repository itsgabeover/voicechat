import { auth } from "@/auth";
import { redirect } from "next/navigation";

const UploadPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <UploadComponent userId={session.user?.id} />;
};

const UploadComponent = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a PDF for Analysis</h1>

      <form action="/api/upload" method="POST" encType="multipart/form-data">
        <input
          type="file"
          name="file"
          accept="application/pdf"
          className="mb-4"
        />
        <input type="hidden" name="userId" value={userId} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Upload & Analyze
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
