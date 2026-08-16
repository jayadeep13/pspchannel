"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { YoutubeVideo } from "@/lib/youtube";

export default function ShortsGrid({ shorts }: { shorts: YoutubeVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeId]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shorts.map((short) => (
          <button
            key={short.id}
            type="button"
            onClick={() => setActiveId(short.id)}
            className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-navy text-left shadow-md transition-shadow hover:shadow-xl"
          >
            {short.thumbnail && (
              <Image
                src={short.thumbnail}
                alt={short.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-broadcast/90">
                <Play size={16} className="ml-0.5 text-paper" fill="currentColor" />
              </span>
            </div>
            <p className="absolute inset-x-0 bottom-0 line-clamp-2 px-2.5 py-2.5 text-xs font-semibold text-paper">
              {short.title}
            </p>
          </button>
        ))}
      </div>

      {activeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 p-4"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-lg bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={activeId}
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
              title="PSP Channel short"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            type="button"
            onClick={() => setActiveId(null)}
            aria-label="Close"
            className="absolute right-4 top-4 text-paper hover:text-broadcast"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </>
  );
}
