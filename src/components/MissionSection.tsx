import { Compass, Mic, Users } from "lucide-react";
import Reveal from "./Reveal";
import ViewfinderFrame from "./ViewfinderFrame";
import { occupations } from "@/lib/site-config";

const pillars = [
  {
    icon: Compass,
    title: "We go to them",
    text: "No studio, no invitations. Our crew travels into the villages, fields and small towns where these stories actually live.",
  },
  {
    icon: Mic,
    title: "We let them speak",
    text: "Unscripted, unhurried conversations — the kind daily news rarely has time for.",
  },
  {
    icon: Users,
    title: "We cover every occupation",
    text: "Politicians and doctors first — farmers, teachers, artisans and freedom fighters follow.",
  },
];

export default function MissionSection() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="left">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              OUR MISSION
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              The stories worth telling aren&rsquo;t in the studio.
              <span className="text-broadcast"> They&rsquo;re on the road.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
              PSP Channel was started with one simple idea: the people who
              have quietly shaped our villages — the veteran politicians, the
              doctors who never left, the farmers who feed us, the teachers
              who never gave up — deserve to be interviewed with the same
              seriousness as anyone in a city studio. So we go where they
              are.
            </p>

            <ViewfinderFrame className="mt-9 border border-navy-line/20 bg-navy p-6">
              <p className="font-heading text-lg font-semibold italic leading-snug text-paper">
                &ldquo;Every village has a story worth more airtime than a
                headline. We just have to go there and listen.&rdquo;
              </p>
              <p className="mt-3 font-mono text-xs tracking-[0.2em] text-signal">
                — PATURI BHANU PRASAD, FOUNDER
              </p>
            </ViewfinderFrame>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className={i === 2 ? "sm:col-span-2" : ""}
              >
                <div className="h-full border border-paper-dim bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <p.icon size={22} className="text-broadcast" strokeWidth={2} />
                  <h3 className="mt-4 font-heading text-lg font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24} className="sm:col-span-2">
              <div className="border border-paper-dim bg-navy p-6">
                <h3 className="font-mono text-xs tracking-[0.2em] text-signal">
                  OCCUPATIONS ON OUR LIST
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {occupations.map((o) => (
                    <span
                      key={o.label}
                      className="border border-navy-line px-3 py-1.5 font-mono text-[11px] tracking-wide text-paper/90"
                    >
                      {o.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
