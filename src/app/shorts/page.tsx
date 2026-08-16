import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RecBadge from "@/components/RecBadge";
import ShortsGrid from "@/components/ShortsGrid";
import { getShorts } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Shorts",
  description: "PSP Channel's YouTube Shorts, straight from the field.",
  alternates: { canonical: "/shorts" },
};

export default async function ShortsPage() {
  const shorts = await getShorts(24);

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-10">
          <Reveal>
            <RecBadge label="QUICK CLIPS" className="justify-center" />
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-wide text-paper sm:text-6xl">
              PSP
              <br />
              <span className="text-broadcast">SHORTS</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Quick moments from the road — pulled straight from the PSP
              Channel YouTube channel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-dim py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          {shorts.length > 0 ? (
            <ShortsGrid shorts={shorts} />
          ) : (
            <Reveal className="py-16 text-center">
              <p className="font-heading text-lg font-semibold text-ink">
                No shorts yet.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Check back soon for quick clips from the field.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
