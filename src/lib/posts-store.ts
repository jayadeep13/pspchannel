import { Redis } from "@upstash/redis";
import type { Post } from "./site-config";

const POSTS_KEY = "psp:posts";

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getPosts(): Promise<Post[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const list = await client.get<Post[]>(POSTS_KEY);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function addPost(input: {
  imageUrl: string;
  caption: string;
}): Promise<Post[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Post storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = await getPosts();
  const post: Post = {
    id: crypto.randomUUID(),
    imageUrl: input.imageUrl,
    caption: input.caption,
    createdAt: new Date().toISOString(),
  };
  list.unshift(post);

  await client.set(POSTS_KEY, list);
  return list;
}

export async function deletePost(id: string): Promise<Post[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Post storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = (await getPosts()).filter((p) => p.id !== id);
  await client.set(POSTS_KEY, list);
  return list;
}
