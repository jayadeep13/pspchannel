"use client";

import { useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

function FounderPhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 22,
  });
  const shineX = useTransform(x, [-0.5, 0.5], ["10%", "90%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["10%", "90%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] w-full max-w-sm"
      >
        <div
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bhanuprasad.png"
            alt={`${siteConfig.founder.name}, ${siteConfig.founder.role}`}
            fill
            className="rounded-lg object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
            sizes="(min-width: 1024px) 24rem, 90vw"
            priority
          />
          <motion.div
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.28), transparent 60%)",
              backgroundPosition: `${shineX} ${shineY}`,
              backgroundSize: "140% 140%",
            }}
            className="pointer-events-none absolute inset-0 rounded-lg mix-blend-overlay"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

          <div
            style={{ transform: "translateZ(40px)" }}
            className="absolute left-3 top-3 flex items-center gap-1.5 bg-broadcast px-2.5 py-1"
          >
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-paper" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-paper">
              FOUNDER
            </span>
          </div>
          <div
            style={{ transform: "translateZ(40px)" }}
            className="absolute bottom-3 right-3 bg-navy-deep/80 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-paper"
          >
            EP. 00
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/bhanuprasad.png"
          alt=""
          fill
          className="scale-125 object-cover opacity-[0.12] blur-3xl"
        />
        <div className="absolute inset-0 bg-navy-deep/85" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-40" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <Reveal direction="left" className="mx-auto w-full max-w-sm">
          <FounderPhoto />
        </Reveal>

        <Reveal>
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
            THE PERSON BEHIND THE CAMERA
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-paper sm:text-4xl lg:text-5xl">
            {siteConfig.founder.name}
          </h2>
          <p className="mt-1.5 font-mono text-sm tracking-wide text-signal">
            {siteConfig.founder.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            {siteConfig.founder.bio}
          </p>

          <div className="mt-8 flex gap-4 border-l-2 border-broadcast pl-5">
            <Quote size={28} className="mt-1 shrink-0 text-broadcast" />
            <p className="font-heading text-xl font-medium italic leading-snug text-paper">
              {siteConfig.founder.quote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
