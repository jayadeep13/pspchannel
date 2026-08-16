import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/posts-store";
import { getRecentVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Photos and updates from PSP Channel's expeditions into the remote villages of Andhra Pradesh and Telangana.",
  alternates: { canonical: "/posts" },
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type FeedItem = {
  key: string;
  image: string;
  caption: string;
  date: string;
  isVideo: boolean;
};

export default async function PostsPage() {
  const [posts, videos] = await Promise.all([getPosts(), getRecentVideos(20)]);

  const feed: FeedItem[] = [
    ...posts.map((p) => ({
      key: `post-${p.id}`,
      image: p.imageUrl,
      caption: p.caption,
      date: p.createdAt,
      isVideo: false,
    })),
    ...videos.map((v) => ({
      key: `video-${v.id}`,
      image: v.thumbnail,
      caption: v.title,
      date: v.publishedAt,
      isVideo: true,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="bg-paper-dim py-10 lg:py-14">
      <div className="mx-auto max-w-xl px-4">
        {feed.length > 0 ? (
          <div>
            {feed.map((item, i) => (
              <Reveal key={item.key} delay={Math.min(i, 6) * 0.05}>
                <article className="mb-8 overflow-hidden border border-paper-dim bg-white">
                  <div className="flex items-center gap-2.5 px-3 py-2.5">
                    <Image
                      src="/images/logowb.png"
                      alt=""
                      width={64}
                      height={57}
                      className="h-7 w-auto"
                    />
                    <div className="leading-tight">
                      <p className="font-heading text-sm font-bold text-ink">
                        PSP Channel
                      </p>
                      <p className="font-mono text-[10px] tracking-wide text-ink-soft">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>

                  {item.isVideo ? (
                    <Link
                      href="/live"
                      className="group relative block aspect-square w-full overflow-hidden bg-navy"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.caption}
                          fill
                          sizes="(max-width: 640px) 100vw, 576px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-broadcast/90">
                          <Play size={20} className="ml-0.5 text-paper" fill="currentColor" />
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative aspect-square w-full bg-navy">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {item.caption && (
                    <p className="whitespace-pre-line px-3 py-3 text-sm leading-relaxed text-ink">
                      {item.caption}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="py-20 text-center">
            <p className="font-heading text-lg font-semibold text-ink">
              No posts yet.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Check back soon for photos and updates from the field.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
