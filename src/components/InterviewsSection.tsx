import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import InterviewCard from "./InterviewCard";
import { getArchiveInterviews } from "@/lib/interviews-store";

export default async function InterviewsSection() {
  const interviews = (await getArchiveInterviews()).slice(0, 4);

  return (
    <section className="bg-paper-dim py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              THE ARCHIVE
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Interviews & Upcoming Episodes
            </h2>
          </div>
          <Link
            href="/interviews"
            className="group inline-flex items-center gap-2 font-heading text-sm font-bold tracking-wide text-broadcast"
          >
            View all interviews
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {interviews.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {interviews.map((interview, i) => (
              <Reveal key={interview.slug} delay={i * 0.07}>
                <InterviewCard interview={interview} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-16 text-center">
            <p className="font-heading text-lg font-semibold text-ink">
              No interviews published yet.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Check back soon — the archive grows with every expedition.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
