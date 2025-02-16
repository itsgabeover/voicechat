import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserAnalyses } from "@/lib/actions/analysis.actions";
import { Analysis } from "@/types";

const Dashboard = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (!session) {
    redirect(callbackUrl || "/");
  } else {
  }
  // Fetch user analyses using the direct database query
  const analyses: Analysis[] = await getUserAnalyses(session.user?.id);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome, {session.user?.name}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Generate New Analysis Card */}
        <Link
          href="/upload"
          className="p-6 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <span className="text-4xl font-bold text-gray-500">+</span>
        </Link>

        {/* User's Analysis Cards */}
        {analyses.length > 0 ? (
          analyses.map((analysis: Analysis) => (
            <Link
              key={analysis.id}
              href={`/analysis/${analysis.slug}`}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{analysis.fileName}</h3>
              <p className="text-sm text-gray-500">Status: {analysis.status}</p>
              <p className="text-xs text-gray-400">
                Created: {new Date(analysis.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="col-span-2 text-gray-500">
            No analyses found. Upload a file to generate one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
