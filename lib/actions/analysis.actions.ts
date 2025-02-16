"use server";
import { convertToPlainObject } from "../utils";
import { prisma } from "@/db/prisma";
import { Analysis, AnalysisStatus } from "@/types"; // Import Analysis type

// Get all analyses for a specific user
export async function getUserAnalyses(userId: string): Promise<Analysis[]> {
  try {
    if (!prisma || !prisma.analysis) {
      console.error(
        "Prisma is not initialized or Analysis model does not exist"
      );
      return [];
    }

    const data = await prisma.analysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by most recent first
    });

    return data.map((analysis) => ({
      ...analysis,
      status: analysis.status as AnalysisStatus, // ✅ Explicitly cast status
    }));
  } catch (error) {
    console.error("Error in getUserAnalyses:", error);
    return [];
  }
}

// Get a single analysis by its slug
export async function getAnalysisBySlug(
  slug: string
): Promise<Analysis | null> {
  try {
    const data = await prisma.analysis.findFirst({
      where: { slug },
    });

    if (!data) return null;

    return {
      ...convertToPlainObject(data),
      status: data.status as AnalysisStatus, // ✅ Ensure correct type for status
    };
  } catch (error) {
    console.error("Error fetching analysis by slug:", error);
    return null;
  }
}
