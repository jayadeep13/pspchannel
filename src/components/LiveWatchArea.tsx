"use client";

import { useState } from "react";
import Image from "next/image";
import { Radio } from "lucide-react";
import type { YoutubeVideo } from "@/lib/youtube";

function formatDateTime(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LiveWatchArea({
  liveVideoId,
  recentVideos,
}: {
  liveVideoId: string | null;
  recentVideos: YoutubeVideo[];
}) {
  const [manualId, setManualId] = useState<string | null>(null);

  const activeId = manualId ?? liveVideoId ?? recentVideos[0]?.id ?? null;
  const isShowingLive = activeId !== null && activeId === liveVideoId;
  const viewingArchiveWhileLive =
    liveVideoId !== null && activeId !== liveVideoId;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {activeId ? (
          <iframe
            key={activeId}
            src={`https://www.youtube.com/embed/${activeId}?rel=0`}
            title="PSP Channel video player"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
            <span className="h-2 w-2 rounded-full bg-broadcast/50" />
            <p className="font-mono text-xs tracking-[0.4em] text-ink-soft/70">
              OFF AIR
            </p>
          </div>
        )}

        {activeId && (
          <div className="pointer-events-none absolute left-3 top-3">
            {isShowingLive ? (
              <span className="flex items-center gap-1.5 bg-broadcast px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.15em] text-paper">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-paper" />
                LIVE
              </span>
            ) : (
              <span className="bg-navy-deep/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-ink-soft">
                {liveVideoId ? "WATCHING ARCHIVE" : "LAST BROADCAST"}
              </span>
            )}
          </div>
        )}

        <div className="pointer-events-none absolute right-3 top-3 sm:right-5 sm:top-5">
          <Image
            src="/images/logowb.png"
            alt="PSP Channel"
            width={132}
            height={118}
            className="h-8 w-auto opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] sm:h-11"
          />
        </div>
      </div>

      {viewingArchiveWhileLive && (
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 border border-t-0 border-broadcast bg-broadcast/10 px-4 py-3 lg:px-10">
          <span className="flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-broadcast">
            <Radio size={14} /> PSP Channel is live right now.
          </span>
          <button
            type="button"
            onClick={() => setManualId(null)}
            className="bg-broadcast px-4 py-1.5 font-heading text-xs font-bold tracking-wide text-paper"
          >
            Watch Live
          </button>
        </div>
      )}

      {recentVideos.length > 0 && (
        <div className="mx-auto mt-10 max-w-5xl px-5 lg:px-10">
          <h2 className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
            RECENT BROADCASTS
          </h2>
          <ul className="mt-5 divide-y divide-navy-line border border-navy-line">
            {recentVideos.map((video) => {
              const active = video.id === activeId && !isShowingLive;
              return (
                <li key={video.id}>
                  <button
                    type="button"
                    onClick={() => setManualId(video.id)}
                    className={`flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-navy-panel ${
                      active ? "bg-navy-panel" : ""
                    }`}
                  >
                    <div className="relative h-16 w-28 shrink-0 overflow-hidden bg-navy-deep">
                      {video.thumbnail && (
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-sm font-bold text-paper">
                        {video.title}
                      </p>
                      <p className="mt-1 font-mono text-[11px] tracking-wide text-ink-soft">
                        {formatDateTime(video.publishedAt)}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
