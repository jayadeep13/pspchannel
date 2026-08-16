import Image from "next/image";
import { Lock, Play } from "lucide-react";
import type { Interview } from "@/lib/site-config";

export default function InterviewCard({ interview }: { interview: Interview }) {
  const isPublished = interview.status === "published";

  return (
    <div className="group">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-navy shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        {interview.thumbnail ? (
          <Image
            src={interview.thumbnail}
            alt={`${interview.title} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy-panel">
            <Lock size={26} className="text-ink-soft" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />

        <span className="absolute left-2 top-2 rounded-sm bg-broadcast px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-paper">
          {interview.occupation.toUpperCase()}
        </span>

        <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded bg-navy-deep/85 px-2 py-1 font-mono text-[11px] font-semibold text-paper">
          {isPublished ? (
            <Play size={11} fill="currentColor" />
          ) : (
            <Lock size={11} />
          )}
          {isPublished ? interview.duration || interview.episode : "Coming soon"}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 font-heading text-base font-bold leading-snug text-ink">
          {interview.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink-soft">
          {interview.subject}
        </p>
      </div>
    </div>
  );
}
