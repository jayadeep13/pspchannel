import { NextRequest, NextResponse } from "next/server";
import { passwordMatches } from "@/lib/admin-auth";
import { getInterviews, saveInterview, deleteInterview } from "@/lib/interviews-store";
import type { Interview } from "@/lib/site-config";

export async function GET() {
  const interviews = await getInterviews();
  return NextResponse.json({ interviews });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const interview = body?.interview as Partial<Interview> | undefined;

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!interview?.title || !interview?.occupation || !interview?.status || !interview?.episode) {
    return NextResponse.json(
      { error: "Title, occupation, status and episode are required." },
      { status: 400 }
    );
  }

  try {
    const list = await saveInterview({
      slug: interview.slug,
      title: interview.title,
      subject: interview.subject || "",
      occupation: interview.occupation,
      location: interview.location || "",
      status: interview.status,
      episode: interview.episode,
      duration: interview.duration,
      date: interview.date,
      synopsis: interview.synopsis || "",
      youtubeId: interview.youtubeId,
      thumbnail: interview.thumbnail,
    });
    return NextResponse.json({ ok: true, interviews: list });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const slug = typeof body?.slug === "string" ? body.slug : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!slug) {
    return NextResponse.json({ error: "Missing slug." }, { status: 400 });
  }

  try {
    const list = await deleteInterview(slug);
    return NextResponse.json({ ok: true, interviews: list });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
