import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(req: Request) {
  try {
    const { slug, result } = await req.json();

    // Update the analysis with the result from N8n
    const analysis = await prisma.analysis.update({
      where: { slug },
      data: {
        result,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({ message: "Analysis updated", analysis });
  } catch (error) {
    console.error("Error updating analysis:", error);
    return NextResponse.json(
      { error: "Failed to update analysis" },
      { status: 500 }
    );
  }
}
