export type YoutubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

type YoutubeConfig = { apiKey: string; channelId: string };

function getConfig(): YoutubeConfig | null {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return null;
  return { apiKey, channelId };
}

type YoutubeSnippetItem = {
  id?: { videoId?: string };
  snippet?: {
    resourceId?: { videoId?: string };
    title?: string;
    publishedAt?: string;
    thumbnails?: {
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
};

async function youtubeGet(
  path: string,
  params: Record<string, string>,
  apiKey: string
): Promise<{ items?: unknown[]; [key: string]: unknown } | null> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  url.searchParams.set("key", apiKey);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  try {
    // Cached for 60s so client-side polling (LiveAutoRefresh) doesn't
    // burn API quota — every visitor shares this one cached fetch.
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getLiveVideoId(): Promise<string | null> {
  const config = getConfig();
  if (!config) return null;

  const data = await youtubeGet(
    "search",
    {
      part: "snippet",
      channelId: config.channelId,
      eventType: "live",
      type: "video",
      maxResults: "1",
    },
    config.apiKey
  );

  const items = (data?.items ?? []) as YoutubeSnippetItem[];
  const id = items[0]?.id?.videoId;
  return typeof id === "string" ? id : null;
}

async function getUploadsPlaylistId(config: YoutubeConfig): Promise<string | null> {
  const data = await youtubeGet(
    "channels",
    { part: "contentDetails", id: config.channelId },
    config.apiKey
  );
  const items = (data?.items ?? []) as {
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }[];
  const id = items[0]?.contentDetails?.relatedPlaylists?.uploads;
  return typeof id === "string" ? id : null;
}

function snippetItemsToVideos(items: YoutubeSnippetItem[]): YoutubeVideo[] {
  const videos: YoutubeVideo[] = [];
  for (const item of items) {
    const videoId = item.snippet?.resourceId?.videoId;
    if (!videoId) continue;
    videos.push({
      id: videoId,
      title: item.snippet?.title ?? "Untitled",
      publishedAt: item.snippet?.publishedAt ?? "",
      thumbnail:
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url ??
        "",
    });
  }
  return videos;
}

export async function getRecentVideos(maxResults = 12): Promise<YoutubeVideo[]> {
  const config = getConfig();
  if (!config) return [];

  const playlistId = await getUploadsPlaylistId(config);
  if (!playlistId) return [];

  const data = await youtubeGet(
    "playlistItems",
    { part: "snippet", playlistId, maxResults: String(maxResults) },
    config.apiKey
  );

  return snippetItemsToVideos((data?.items ?? []) as YoutubeSnippetItem[]);
}

function parseIsoDurationSeconds(iso: string): number {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!match) return Infinity;
  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  return hours * 3600 + minutes * 60 + seconds;
}

type TimedVideo = YoutubeVideo & { durationSeconds: number };

// Recent uploads with their lengths, shared by the Shorts and episode lists.
async function getRecentUploadsWithDurations(): Promise<TimedVideo[]> {
  const config = getConfig();
  if (!config) return [];

  const playlistId = await getUploadsPlaylistId(config);
  if (!playlistId) return [];

  // Pull a larger recent window since callers keep only some of these.
  const data = await youtubeGet(
    "playlistItems",
    { part: "snippet", playlistId, maxResults: "50" },
    config.apiKey
  );
  const candidates = snippetItemsToVideos((data?.items ?? []) as YoutubeSnippetItem[]);
  if (candidates.length === 0) return [];

  const detailsData = await youtubeGet(
    "videos",
    { part: "contentDetails", id: candidates.map((c) => c.id).join(",") },
    config.apiKey
  );
  const detailItems = (detailsData?.items ?? []) as {
    id?: string;
    contentDetails?: { duration?: string };
  }[];
  const durationById = new Map<string, number>();
  for (const item of detailItems) {
    if (item.id) {
      durationById.set(item.id, parseIsoDurationSeconds(item.contentDetails?.duration ?? ""));
    }
  }

  return candidates.map((c) => ({
    ...c,
    durationSeconds: durationById.get(c.id) ?? Infinity,
  }));
}

// YouTube's public API has no "is this a Short" flag, so this uses the
// documented Shorts length cap (<=3 min) against this channel's own upload
// durations as the closest available signal.
const SHORTS_MAX_SECONDS = 180;

export async function getShorts(maxResults = 12): Promise<YoutubeVideo[]> {
  const uploads = await getRecentUploadsWithDurations();
  return uploads
    .filter((v) => v.durationSeconds <= SHORTS_MAX_SECONDS)
    .slice(0, maxResults);
}

export type YoutubeEpisode = YoutubeVideo & { duration: string };

function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return "";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

// Full-length uploads (everything that isn't a Short).
export async function getEpisodes(maxResults = 24): Promise<YoutubeEpisode[]> {
  const uploads = await getRecentUploadsWithDurations();
  return uploads
    .filter((v) => v.durationSeconds > SHORTS_MAX_SECONDS)
    .slice(0, maxResults)
    .map(({ durationSeconds, ...v }) => ({ ...v, duration: formatDuration(durationSeconds) }));
}
