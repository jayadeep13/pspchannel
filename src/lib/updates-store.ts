import { Redis } from "@upstash/redis";

const UPDATES_KEY = "psp:updates";

export type UpdatePost = {
  id: string;
  topic: string;
  body?: string;
  imageUrl: string;
  createdAt: string;
};

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getUpdates(): Promise<UpdatePost[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const list = await client.get<UpdatePost[]>(UPDATES_KEY);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function addUpdate(input: {
  topic: string;
  body?: string;
  imageUrl: string;
}): Promise<UpdatePost[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Update storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = await getUpdates();
  list.unshift({
    id: crypto.randomUUID(),
    topic: input.topic,
    body: input.body,
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
  });

  await client.set(UPDATES_KEY, list);
  return list;
}

export async function deleteUpdate(id: string): Promise<UpdatePost[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Update storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = (await getUpdates()).filter((u) => u.id !== id);
  await client.set(UPDATES_KEY, list);
  return list;
}
