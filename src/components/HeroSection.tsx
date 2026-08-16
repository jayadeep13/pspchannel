"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import RecBadge from "./RecBadge";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const headlineWords = ["Real", "stories.", "Real", "villages.", "Real", "voices."];
const rotatingWords = ["stories.", "villages.", "voices."];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden bg-navy lg:min-h-[92vh] lg:flex-row lg:items-center">
      <div className="relative h-64 w-full shrink-0 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-3/5 lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_42%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_42%)]">
        <video
          className="h-full w-full object-cover [filter:brightness(1.18)_contrast(1.08)_saturate(1.2)]"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/logo-poster.jpg"
          aria-label="PSP Channel animated logo, looping"
        >
          <source src="/videos/psp-logo-loop.webm" type="video/webm" />
          <source src="/videos/psp-logo-loop.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-navy lg:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-navy/45 via-transparent to-transparent lg:block" />

        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 bg-navy-deep/70 px-2 py-1 lg:right-10 lg:top-8">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-broadcast" />
          <span className="font-mono text-[10px] tracking-[0.15em] text-paper">REC</span>
        </div>
        <div className="absolute bottom-3 right-3 z-10 bg-navy-deep/70 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-paper lg:bottom-8 lg:right-10">
          PSP-CH01
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-4">
            <RecBadge label="NOW BROADCASTING" />
            <span className="hidden h-3 w-px bg-navy-line sm:block" />
            <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-ink-soft">
              <MapPin size={12} className="text-broadcast" />
              ANDHRA PRADESH, INDIA
            </span>
          </motion.div>

          <h1 className="hidden font-display leading-[0.92] tracking-wide text-paper lg:block lg:text-[5.2rem]">
            {headlineWords.map((word, i) => (
              <motion.span key={i} variants={item} className="mr-4 inline-block">
                <span className={word === "Real" ? "text-broadcast" : ""}>
                  {word}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.h1
            variants={item}
            className="flex items-baseline gap-2.5 whitespace-nowrap font-display text-[11vw] leading-none tracking-wide text-paper sm:text-5xl lg:hidden"
          >
            <span className="text-broadcast">Real</span>
            <span className="relative inline-block overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: "70%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-70%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="inline-block"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 hidden max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg lg:block"
          >
            PSP Channel is a new independent channel that travels into the
            remote villages of Andhra Pradesh and Telangana to interview
            veteran politicians, rural doctors, farmers, teachers and
            forgotten changemakers — carrying their stories to the world,
            one expedition at a time.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-nowrap items-stretch gap-2 sm:gap-4">
            <Link
              href="/interviews"
              className="group inline-flex flex-1 items-center justify-center gap-1.5 bg-broadcast px-3 py-3 text-center font-heading text-xs font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5 sm:flex-initial sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Watch Our Interviews
              <ArrowRight
                size={16}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex flex-1 items-center justify-center gap-2 border border-navy-line px-3 py-3 text-center font-heading text-xs font-bold tracking-wide text-paper transition-colors hover:border-signal hover:text-signal sm:flex-initial sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
