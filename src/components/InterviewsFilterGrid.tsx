"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import InterviewCard from "@/components/InterviewCard";
import { occupations, type Interview, type Occupation } from "@/lib/site-config";

type Filter = "All" | Occupation;

export default function InterviewsFilterGrid({
  interviews,
}: {
  interviews: Interview[];
}) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? interviews
        : interviews.filter((i) => i.occupation === filter),
    [filter, interviews]
  );

  const filters: Filter[] = ["All", ...occupations.map((o) => o.label)];

  return (
    <>
      <Reveal className="flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-mono text-xs tracking-[0.15em] transition-colors ${
              filter === f
                ? "border-broadcast bg-broadcast text-paper"
                : "border-paper-dim bg-white text-ink-soft hover:border-broadcast hover:text-broadcast"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </Reveal>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((interview, i) => (
            <Reveal key={interview.slug} delay={i * 0.06}>
              <InterviewCard interview={interview} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-16 text-center">
          <p className="font-heading text-lg font-semibold text-ink">
            {filter === "All"
              ? "No interviews published yet."
              : "No episodes filed under this occupation yet."}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Check back soon — the archive grows with every expedition.
          </p>
        </Reveal>
      )}
    </>
  );
}
