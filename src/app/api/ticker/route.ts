import { NextRequest, NextResponse } from "next/server";
import { passwordMatches } from "@/lib/admin-auth";
import { getTickerText, setTickerText } from "@/lib/ticker-store";

export async function GET() {
  const text = await getTickerText();
  return NextResponse.json({ text });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const text = typeof body?.text === "string" ? body.text : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password isn't configured on the server." },
      { status: 500 }
    );
  }
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  try {
    await setTickerText(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, text: text.trim() ? text : null });
}
