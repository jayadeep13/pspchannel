import type { Metadata } from "next";
import AdminTickerForm from "@/components/admin/AdminTickerForm";
import AdminInterviewsManager from "@/components/admin/AdminInterviewsManager";
import AdminPostsManager from "@/components/admin/AdminPostsManager";
import AdminNewsletterManager from "@/components/admin/AdminNewsletterManager";
import AdminUpdatesManager from "@/components/admin/AdminUpdatesManager";
import { getTickerText } from "@/lib/ticker-store";
import { getInterviews } from "@/lib/interviews-store";
import { getPosts } from "@/lib/posts-store";
import { getSubscribers } from "@/lib/newsletter-store";
import { getUpdates } from "@/lib/updates-store";

export const metadata: Metadata = {
  title: "Admin — PSP Channel",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [currentText, interviews, posts, subscribers, updates] = await Promise.all([
    getTickerText(),
    getInterviews(),
    getPosts(),
    getSubscribers(),
    getUpdates(),
  ]);

  return (
    <main className="min-h-screen bg-navy px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-3xl space-y-16">
        <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-broadcast">
          ADMIN
        </p>
        <h1 className="sr-only">PSP Channel Admin</h1>

        <section>
          <h2 className="font-display text-3xl tracking-wide text-paper">
            Homepage Ticker
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Whatever you type below scrolls across the red ticker bar on the
            homepage, for every visitor. Leave it blank to show the default
            list of topics instead.
          </p>

          <div className="mt-10 border border-navy-line bg-navy-deep/60 p-6">
            <AdminTickerForm initialText={currentText ?? ""} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-wide text-paper">
            Interviews &amp; Episodes
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Add, edit or remove the interviews shown on the homepage and the
            /interviews archive, for every visitor.
          </p>

          <div className="mt-10 border border-navy-line bg-navy-deep/60 p-6">
            <AdminInterviewsManager initialInterviews={interviews} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-wide text-paper">
            Posts
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Publish an image with a caption and it shows up on /posts for
            every visitor, newest first.
          </p>

          <div className="mt-10 border border-navy-line bg-navy-deep/60 p-6">
            <AdminPostsManager initialPosts={posts} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-wide text-paper">
            Newsletter Subscribers
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Everyone who signed up on /newsletter. Enter the admin password
            to remove a subscriber.
          </p>

          <div className="mt-10 border border-navy-line bg-navy-deep/60 p-6">
            <AdminNewsletterManager initialSubscribers={subscribers} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-wide text-paper">
            Updates
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Post a topic with an image and it shows up on /newsletter for
            every visitor, newest first.
          </p>

          <div className="mt-10 border border-navy-line bg-navy-deep/60 p-6">
            <AdminUpdatesManager initialUpdates={updates} />
          </div>
        </section>
      </div>
    </main>
  );
}
