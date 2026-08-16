import { Redis } from "@upstash/redis";
import type { Interview } from "./site-config";

const INTERVIEWS_KEY = "psp:interviews";

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getInterviews(): Promise<Interview[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const list = await client.get<Interview[]>(INTERVIEWS_KEY);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function saveInterview(
  input: Omit<Interview, "slug"> & { slug?: string }
): Promise<Interview[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Interview storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = await getInterviews();
  const slug = input.slug?.trim() || slugify(input.title);
  const record: Interview = { ...input, slug };

  const existingIndex = list.findIndex((i) => i.slug === slug);
  if (existingIndex >= 0) {
    // Editing an existing interview keeps its place in the order.
    list[existingIndex] = record;
  } else {
    // New interviews are the newest, so they lead the "All" view.
    list.unshift(record);
  }

  await client.set(INTERVIEWS_KEY, list);
  return list;
}

export async function deleteInterview(slug: string): Promise<Interview[]> {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Interview storage isn't configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  const list = (await getInterviews()).filter((i) => i.slug !== slug);
  await client.set(INTERVIEWS_KEY, list);
  return list;
}
