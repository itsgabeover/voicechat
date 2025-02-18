import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAnalysisBySlug } from "@/lib/actions/analysis.actions";
import { Analysis } from "@/types";
import PolicyDashboard from "./policy-dashboard"; // Import the new Policy Dashboard component
import FloatingChatButton from "./floating-chat-button";


const AnalysisDetail = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params; // ✅ Await params like in your working example

  const session = await auth();

  //  If session or user is missing, redirect
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }

  // Fetch the analysis by slug
  const analysis: Analysis | null = await getAnalysisBySlug(slug);

  // Check if the analysis exists and belongs to the current user
  if (!analysis || analysis.userId !== session.user.id) {
    redirect("/dashboard"); // Redirect if unauthorized
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{analysis.fileName}</h1>
      <p className="text-gray-500 mb-2">Status: {analysis.status}</p>
      <p className="text-gray-400 text-sm mb-4">
        Created: {new Date(analysis.createdAt).toLocaleDateString()}
      </p>

      {/* Render the Policy Dashboard with the analysis result */}
      {analysis.result && Object.keys(analysis.result).length > 0 ? (
        <>
          <PolicyDashboard analysis={analysis.result} />
          <FloatingChatButton />
        </>
      ) : (
        <p className="text-red-500">No analysis result available.</p>
      )}
    </div>
  );
};

export default AnalysisDetail;
