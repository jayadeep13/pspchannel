import { Redis } from "@upstash/redis";

const SUBSCRIBERS_KEY = "psp:newsletter_subscribers";

export type Subscriber = {
  email: string;
  subscribedAt: string;
};

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const list = await client.get<Subscriber[]>(SUBSCRIBERS_KEY);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function addSubscriber(emailInput: string): Promise<void> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Newsletter storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const email = emailInput.trim().toLowerCase();
  const list = await getSubscribers();
  if (list.some((s) => s.email === email)) return;

  list.unshift({ email, subscribedAt: new Date().toISOString() });
  await client.set(SUBSCRIBERS_KEY, list);
}

export async function removeSubscriber(email: string): Promise<Subscriber[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Newsletter storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = (await getSubscribers()).filter((s) => s.email !== email);
  await client.set(SUBSCRIBERS_KEY, list);
  return list;
}
