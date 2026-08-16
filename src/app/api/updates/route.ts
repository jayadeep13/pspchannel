import { NextRequest, NextResponse } from "next/server";
import { passwordMatches } from "@/lib/admin-auth";
import { getUpdates, addUpdate, deleteUpdate } from "@/lib/updates-store";

export async function GET() {
  const updates = await getUpdates();
  return NextResponse.json({ updates });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const topic = typeof body?.topic === "string" ? body.topic.trim() : "";
  const articleBody = typeof body?.body === "string" ? body.body.trim() : "";
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl.trim() : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!topic || !imageUrl) {
    return NextResponse.json(
      { error: "Headline and image URL are required." },
      { status: 400 }
    );
  }

  try {
    const updates = await addUpdate({ topic, body: articleBody, imageUrl });
    return NextResponse.json({ ok: true, updates });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const id = typeof body?.id === "string" ? body.id : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const updates = await deleteUpdate(id);
    return NextResponse.json({ ok: true, updates });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
