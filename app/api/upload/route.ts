import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { nanoid } from "nanoid"; // To generate a unique slug

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: "Missing file or user ID" },
        { status: 400 }
      );
    }

    // Generate a unique slug (e.g., "analysis-ab12cd34")
    const slug = `${nanoid(10)}`;

    // Convert file to Buffer (for example, for AWS S3 or another storage)
    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // Upload file to storage (or send to N8n directly)
    const N8N_ENDPOINT = process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT!;
    const n8nResponse = await fetch(N8N_ENDPOINT, {
      method: "POST",
      body: formData, // Send to N8n
    });

    if (!n8nResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send file to N8n" },
        { status: 500 }
      );
    }

    const analysisResult = await n8nResponse.json();

    // Save analysis in database
    const analysis = await prisma.analysis.create({
      data: {
        userId,
        fileName: file.name,
        fileUrl: "your-storage-url", // Replace with actual file storage URL
        result: analysisResult,
        status: "COMPLETED",
        slug, // ✅ Add the generated slug
      },
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      analysis,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
