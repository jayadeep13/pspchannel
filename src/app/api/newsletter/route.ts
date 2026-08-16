import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { addSubscriber, removeSubscriber } from "@/lib/newsletter-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public: subscribe.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await addSubscriber(email);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to subscribe.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Admin-only: remove a subscriber.
export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!email) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }

  try {
    const subscribers = await removeSubscriber(email);
    return NextResponse.json({ ok: true, subscribers });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to remove.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
