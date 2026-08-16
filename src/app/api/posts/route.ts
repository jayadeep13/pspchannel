import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getPosts, addPost, deletePost } from "@/lib/posts-store";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl.trim() : "";
  const caption = typeof body?.caption === "string" ? body.caption.trim() : "";

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!imageUrl) {
    return NextResponse.json({ error: "Image URL is required." }, { status: 400 });
  }

  try {
    const posts = await addPost({ imageUrl, caption });
    return NextResponse.json({ ok: true, posts });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const posts = await deletePost(id);
    return NextResponse.json({ ok: true, posts });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
