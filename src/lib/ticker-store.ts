import { Redis } from "@upstash/redis";

const TICKER_KEY = "psp:ticker_text";

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getTickerText(): Promise<string | null> {
  const client = getClient();
  if (!client) return null;
  try {
    const value = await client.get<string>(TICKER_KEY);
    return value && value.trim() ? value : null;
  } catch {
    return null;
  }
}

export async function setTickerText(text: string): Promise<void> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Ticker storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }
  if (text.trim()) {
    await client.set(TICKER_KEY, text);
  } else {
    await client.del(TICKER_KEY);
  }
}
