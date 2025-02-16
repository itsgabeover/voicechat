import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAnalysisBySlug } from "@/lib/actions/analysis.actions";
import { Analysis } from "@/types";

interface PageProps {
  params: { slug: string };
}

const AnalysisDetail = async ({ params }: PageProps) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  // Fetch the analysis by slug
  const analysis: Analysis | null = await getAnalysisBySlug(params.slug);

  // Check if the analysis exists and belongs to the current user
  if (!analysis || analysis.userId !== session.user.id) {
    redirect("/dashboard"); // Redirect if unauthorized
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{analysis.fileName}</h1>
      <p className="text-gray-500 mb-2">Status: {analysis.status}</p>
      <p className="text-gray-400 text-sm mb-4">
        Created: {new Date(analysis.createdAt).toLocaleDateString()}
      </p>

      <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
      <pre className="text-sm bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(analysis.result, null, 2)}
      </pre>
    </div>
  );
};

export default AnalysisDetail;
