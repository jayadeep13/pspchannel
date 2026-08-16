import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Mic, Users, Route, Camera, Radio, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import ViewfinderFrame from "@/components/ViewfinderFrame";
import FounderSection from "@/components/FounderSection";
import RecBadge from "@/components/RecBadge";
import { occupations, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Founder",
  description:
    "Learn how PSP Channel travels into remote villages across Andhra Pradesh and Telangana to interview veteran politicians, doctors, farmers and more — and meet founder Paturi Bhanu Prasad.",
  alternates: { canonical: "/about" },
};

const steps = [
  {
    icon: Route,
    title: "We find the story",
    text: "Our team researches remote villages and small towns for people whose lifetime of work has gone unrecorded.",
  },
  {
    icon: Camera,
    title: "We travel to them",
    text: "The crew packs up and goes on location — no studio invitations, no filtered version of the story.",
  },
  {
    icon: Mic,
    title: "We record the conversation",
    text: "A patient, unhurried interview that lets the subject speak in their own words, on their own ground.",
  },
  {
    icon: Radio,
    title: "We broadcast it",
    text: "The finished interview is published on YouTube and archived permanently on this website.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex flex-col overflow-hidden bg-navy lg:min-h-[30rem] lg:flex-row lg:items-center">
        <div className="relative h-80 w-full shrink-0 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2 lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_35%)]">
          <Image
            src="/images/bhanuprasad.png"
            alt={siteConfig.founder.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-navy lg:hidden" />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:block" />
          <div className="absolute bottom-6 right-8 hidden lg:block">
            <span className="bg-broadcast px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-paper">
              FOUNDER
            </span>
            <p className="mt-2 font-heading text-base font-bold text-paper">
              {siteConfig.founder.name}
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-ink-soft">
              {siteConfig.founder.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-navy-deep px-5 py-3 lg:hidden">
          <span className="shrink-0 bg-broadcast px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-paper">
            FOUNDER
          </span>
          <div>
            <p className="font-heading text-sm font-bold text-paper">
              {siteConfig.founder.name}
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-ink-soft">
              {siteConfig.founder.role}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 lg:px-10 lg:py-12">
          <Reveal direction="left" className="max-w-xl">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <RecBadge label="ABOUT PSP CHANNEL" />
              <span className="hidden h-3 w-px bg-navy-line sm:block" />
              <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-ink-soft">
                <MapPin size={12} className="text-broadcast" />
                ANDHRA PRADESH, INDIA
              </span>
            </div>
            <h1 className="font-display text-5xl leading-[0.95] tracking-wide text-paper sm:text-6xl">
              A CHANNEL BUILT
              <br />
              <span className="text-broadcast">ON THE ROAD</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {siteConfig.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              WHY WE STARTED
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              News rarely visits the people who built the country from the
              ground up.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              PSP Channel exists because a village doctor with thirty years
              of practice, or a leader who has served a panchayat for
              decades, or a farmer who has fed a district through every kind
              of season, are rarely handed a microphone. We started this
              channel to change that — one honest, unhurried conversation at
              a time, filmed exactly where these people live and work.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <ViewfinderFrame className="h-full border border-navy-line/15 bg-navy p-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-signal">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon size={24} className="mt-4 text-broadcast" strokeWidth={2} />
                  <h3 className="mt-3 font-heading text-lg font-bold text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.text}
                  </p>
                </ViewfinderFrame>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              WHO WE COVER
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Every occupation has a story worth an episode
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              We began with veteran politicians and doctors. From here, the
              archive grows outward to cover every occupation that quietly
              keeps a village running.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {occupations.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.05}>
                <div className="h-full overflow-hidden border border-paper-dim bg-white shadow-sm">
                  {o.image ? (
                    <div className="relative h-36 w-full overflow-hidden bg-paper-dim">
                      <Image
                        src={o.image}
                        alt={o.label}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-broadcast">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-bold text-ink">
                      {o.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {o.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-5 sm:grid-cols-3 lg:px-10">
          {[
            { icon: Compass, label: "Where we go", value: "Remote villages & small towns" },
            { icon: Users, label: "Who we interview", value: "Politicians, doctors & more" },
            { icon: Radio, label: "Where we publish", value: "YouTube, live & this archive" },
          ].map((f) => (
            <Reveal key={f.label}>
              <div className="flex items-start gap-4 border border-paper-dim bg-white p-5">
                <f.icon size={22} className="mt-0.5 shrink-0 text-broadcast" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.15em] text-ink-soft">
                    {f.label.toUpperCase()}
                  </p>
                  <p className="mt-1 font-heading text-base font-bold text-ink">
                    {f.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
