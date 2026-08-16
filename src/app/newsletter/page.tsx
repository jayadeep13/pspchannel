import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RecBadge from "@/components/RecBadge";
import { getUpdates } from "@/lib/updates-store";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the PSP Channel newsletter for new episodes, live broadcasts and updates from the field, straight to your inbox.",
  alternates: { canonical: "/newsletter" },
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatMastheadDate(): string {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsletterPage() {
  const updates = await getUpdates();
  const [lead, ...rest] = updates;

  return (
    <>
      {/* Masthead */}
      <section className="border-b-4 border-double border-ink bg-paper pt-8 pb-10 lg:pt-12 lg:pb-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/25 pb-3 font-mono text-[10px] tracking-[0.15em] text-ink-soft sm:text-[11px]">
            <span>{formatMastheadDate()}</span>
            <span>ANDHRA PRADESH &amp; TELANGANA EDITION</span>
            <span>EST. 2025</span>
          </div>

          <Reveal className="py-8 text-center sm:py-10">
            <RecBadge label="STAY IN THE LOOP" tone="light" className="justify-center" />
            <h1 className="mt-4 font-serif text-5xl font-black tracking-tight text-ink sm:text-7xl lg:text-8xl">
              THE PSP{" "}
              <span className="text-broadcast">CHRONICLE</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif-body text-base italic leading-relaxed text-ink-soft sm:text-lg">
              New episodes, live broadcasts and notes from the field —
              straight to your inbox.
            </p>
          </Reveal>

          <div className="border-t-2 border-ink" />
          <div className="mt-[3px] border-t border-ink" />
        </div>
      </section>

      {/* Front page */}
      <section className="bg-paper-dim py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <Reveal className="flex items-center gap-4">
            <span className="h-px flex-1 bg-ink/20" />
            <span className="shrink-0 font-mono text-xs font-semibold tracking-[0.3em] text-broadcast">
              LATEST DISPATCHES
            </span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          {lead ? (
            <div className="mt-10">
              <Reveal>
                <article className="grid grid-cols-1 gap-6 border-b-2 border-ink pb-10 lg:grid-cols-2 lg:gap-10">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={lead.imageUrl}
                      alt={lead.topic}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-broadcast">
                      FRONT PAGE · {formatDate(lead.createdAt)}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-ink sm:text-4xl">
                      {lead.topic}
                    </h2>
                    {lead.body && (
                      <p className="mt-4 font-serif-body text-base leading-relaxed text-ink-soft first-letter:mr-1 first-letter:float-left first-letter:font-serif first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-broadcast">
                        {lead.body}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>

              {rest.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:divide-x sm:divide-ink/20 lg:grid-cols-3">
                  {rest.map((u, i) => (
                    <Reveal key={u.id} delay={i * 0.06} className="sm:pl-8 sm:first:pl-0">
                      <article>
                        <div className="relative aspect-video w-full overflow-hidden bg-navy">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={u.imageUrl}
                            alt={u.topic}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-broadcast">
                          {formatDate(u.createdAt)}
                        </p>
                        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-ink">
                          {u.topic}
                        </h3>
                        {u.body && (
                          <p className="mt-2 line-clamp-4 font-serif-body text-sm leading-relaxed text-ink-soft">
                            {u.body}
                          </p>
                        )}
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Reveal className="mt-16 text-center">
              <p className="font-heading text-lg font-semibold text-ink">
                No updates yet.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Check back soon for news from the field.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
