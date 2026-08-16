import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RecBadge from "@/components/RecBadge";
import InterviewsFilterGrid from "@/components/InterviewsFilterGrid";
import { getInterviews } from "@/lib/interviews-store";

export const metadata: Metadata = {
  title: "Interviews & Episodes",
  description:
    "Browse every interview PSP Channel has filmed with veteran politicians, doctors, farmers, teachers and more from remote villages across Andhra Pradesh and Telangana.",
  alternates: { canonical: "/interviews" },
};

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover [filter:brightness(1.1)_contrast(1.05)_saturate(1.15)]"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/logo-poster.jpg"
            aria-hidden="true"
          >
            <source src="/videos/psp-logo-loop.webm" type="video/webm" />
            <source src="/videos/psp-logo-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-60" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-10">
          <Reveal>
            <RecBadge label="THE ARCHIVE" className="justify-center" />
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-wide text-paper sm:text-6xl">
              INTERVIEWS &amp;
              <br />
              <span className="text-broadcast">EPISODES</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Every conversation PSP Channel has filmed, and every one
              currently in the works. New episodes are added here the moment
              they go live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-dim py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <InterviewsFilterGrid interviews={interviews} />
        </div>
      </section>
    </>
  );
}
