import { CalendarClock } from "lucide-react";
import Reveal from "./Reveal";
import ViewfinderFrame from "./ViewfinderFrame";
import RecBadge from "./RecBadge";
import { YoutubeIcon } from "./icons/SocialIcons";
import { siteConfig, updates } from "@/lib/site-config";

export default function LiveSection() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
            YOUTUBE LIVE
          </span>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
            Catch every broadcast as it happens
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            When PSP Channel is live from the field, it streams here first.
            No live broadcast is running right now — subscribe on YouTube so
            you never miss the next one.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <ViewfinderFrame className="border border-navy-line bg-navy-panel p-3">
              <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden bg-navy-deep text-center">
                <div className="absolute left-3 top-3">
                  <RecBadge label="OFF AIR" />
                </div>
                <YoutubeIcon size={48} className="text-broadcast" />
                <div>
                  <p className="font-heading text-lg font-semibold text-paper">
                    No live stream right now
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Follow our channel to get notified the moment we go live.
                  </p>
                </div>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-broadcast px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                >
                  <YoutubeIcon size={16} />
                  Subscribe on YouTube
                </a>
              </div>
            </ViewfinderFrame>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full border border-navy-line bg-navy-panel p-6">
              <div className="flex items-center gap-2">
                <CalendarClock size={18} className="text-signal" />
                <h3 className="font-mono text-xs tracking-[0.2em] text-signal">
                  CHANNEL UPDATES
                </h3>
              </div>
              <ul className="mt-5 space-y-5">
                {updates.map((u, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-navy-line pl-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-broadcast">
                      {u.label}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-paper/90">
                      {u.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
