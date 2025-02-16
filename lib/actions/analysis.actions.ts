"use server";
import { convertToPlainObject } from "../utils";
import { prisma } from "@/db/prisma";

//get all analyses for a specific user
export async function getUserAnalyses(userId: string) {
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

    return data ?? []; // Return an empty array if there are no results
  } catch (error) {
    console.error("Error in getUserAnalyses:", error);
    return []; // Return an empty array on failure
  }
}


// Get a single analysis by its slug
export async function getAnalysisBySlug(slug: string) {
  const data = await prisma.analysis.findFirst({
    where: {
      slug: slug,
    },
  });

  return convertToPlainObject(data);
}
