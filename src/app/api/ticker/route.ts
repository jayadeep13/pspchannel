import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getTickerText, setTickerText } from "@/lib/ticker-store";

export async function GET() {
  const text = await getTickerText();
  return NextResponse.json({ text });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text : "";

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    await setTickerText(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, text: text.trim() ? text : null });
}
