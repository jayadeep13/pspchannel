import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { passwordMatches } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const password = String(formData.get("password") ?? "");
  const file = formData.get("file");

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary isn't configured on the server." },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", apiKey);
  uploadForm.append("timestamp", String(timestamp));
  uploadForm.append("signature", signature);

  const cloudinaryRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadForm }
  );
  const data = await cloudinaryRes.json();
  if (!cloudinaryRes.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Upload failed." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: data.secure_url as string });
}
