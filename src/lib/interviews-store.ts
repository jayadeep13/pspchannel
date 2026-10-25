import { Redis } from "@upstash/redis";
import type { Interview } from "./site-config";
import { getEpisodes } from "./youtube";

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

// Interviews curated in /admin come first, followed by the channel's
// full-length YouTube uploads that aren't already linked to one of them.
export async function getArchiveInterviews(): Promise<Interview[]> {
  const [curated, episodes] = await Promise.all([getInterviews(), getEpisodes()]);
  const linked = new Set(curated.map((i) => i.youtubeId).filter(Boolean));

  const fromYoutube: Interview[] = episodes
    .filter((v) => !linked.has(v.id))
    .map((v) => ({
      slug: `yt-${v.id}`,
      title: v.title,
      subject: v.publishedAt
        ? new Date(v.publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      occupation: "Other",
      location: "",
      status: "published",
      episode: "",
      duration: v.duration,
      date: v.publishedAt,
      synopsis: "",
      youtubeId: v.id,
      thumbnail: v.thumbnail,
    }));

  return [...curated, ...fromYoutube];
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
