import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { nanoid } from "nanoid";

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

    // ✅ Check if user exists before proceeding
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a unique slug
    const slug = `analysis-${nanoid(8)}`;

    // Save an empty analysis record with PENDING status
    const analysis = await prisma.analysis.create({
      data: {
        userId,
        fileName: file.name,
        fileUrl: "pending", // Update when N8n completes
        result: {},
        status: "PENDING",
        slug,
      },
    });

    // ✅ Add the slug to the formData before sending to N8n
    formData.append("slug", slug);

    // ✅ Send the file & slug to N8n (but don't wait for the response)
    fetch(process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT!, {
      method: "POST",
      body: formData,
    }).catch((err) => console.error("Error sending to N8n:", err));

    // Return immediately
    return NextResponse.json({ message: "Upload started", analysis });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
