import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LiveAutoRefresh from "@/components/LiveAutoRefresh";
import LiveWatchArea from "@/components/LiveWatchArea";
import { getInterviews } from "@/lib/interviews-store";
import { getLiveVideoId, getRecentVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Watch Live",
  description:
    "Watch PSP Channel's YouTube live broadcasts and see what interviews and episodes are coming up next.",
  alternates: { canonical: "/live" },
};

export default async function LivePage() {
  const [upcoming, liveVideoId, recentVideos] = await Promise.all([
    getInterviews().then((list) => list.filter((i) => i.status === "upcoming")),
    getLiveVideoId(),
    getRecentVideos(12),
  ]);

  return (
    <>
      <LiveAutoRefresh />

      <section className="bg-black">
        <LiveWatchArea liveVideoId={liveVideoId} recentVideos={recentVideos} />
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <Reveal>
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              WHAT&rsquo;S NEXT
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Upcoming episodes
            </h2>
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-10 divide-y divide-paper-dim border border-paper-dim">
              {upcoming.map((ep, i) => (
                <Reveal key={ep.slug} delay={i * 0.06}>
                  <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-broadcast">
                        {ep.episode} · {ep.occupation.toUpperCase()}
                      </span>
                      <h3 className="mt-1.5 font-heading text-lg font-bold text-ink">
                        {ep.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {ep.synopsis}
                      </p>
                    </div>
                    <span className="shrink-0 self-start border border-signal/40 bg-signal-soft/40 px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-ink">
                      IN PRODUCTION
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 border border-paper-dim p-10 text-center">
              <p className="font-heading text-base font-semibold text-ink">
                Nothing in production right now.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Check back soon for what&rsquo;s filming next.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
