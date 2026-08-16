"use client";

import { useState } from "react";
import { Loader2, Send, Trash2, Upload } from "lucide-react";
import type { Post } from "@/lib/site-config";
import ImageUploadModal from "./ImageUploadModal";

type Status = { type: "idle" | "saving" | "error"; message?: string };

export default function AdminPostsManager({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [showUploadModal, setShowUploadModal] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, caption }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setPosts(data.posts);
      setImageUrl("");
      setCaption("");
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  async function remove(id: string) {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setPosts(data.posts);
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  const inputClass =
    "w-full border border-navy-line bg-navy-panel px-3 py-2.5 font-mono text-sm text-paper outline-none transition-colors focus:border-broadcast";
  const labelClass = "mb-1.5 block font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft";

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className={labelClass}>IMAGE URL</label>
          <div className="flex gap-2">
            <input
              className={inputClass}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              required
            />
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex shrink-0 items-center gap-1.5 border border-navy-line px-3 py-2.5 font-mono text-xs font-bold tracking-wide text-paper transition-colors hover:border-broadcast hover:text-broadcast"
            >
              <Upload size={14} /> Upload
            </button>
          </div>
          <p className="mt-1.5 text-xs text-ink-soft">
            Click Upload to pick an image file, or paste a direct link
            (Google Drive, Imgur, etc.) here yourself.
          </p>
        </div>

        <div>
          <label className={labelClass}>CAPTION</label>
          <textarea
            className={inputClass}
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "saving"}
          className="inline-flex items-center gap-2 bg-broadcast px-5 py-3 font-heading text-sm font-bold tracking-wide text-paper transition-colors hover:bg-broadcast-dim disabled:opacity-60"
        >
          {status.type === "saving" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          Publish Post
        </button>

        {status.type === "error" && (
          <p className="border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
            {status.message}
          </p>
        )}
      </form>

      <div>
        <p className={labelClass}>PUBLISHED POSTS ({posts.length})</p>
        {posts.length === 0 ? (
          <p className="text-sm text-ink-soft">No posts yet — publish your first one above.</p>
        ) : (
          <ul className="divide-y divide-navy-line border border-navy-line">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 bg-navy-deep/40 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                  <p className="truncate text-sm text-paper">
                    {post.caption || <span className="text-ink-soft">No caption</span>}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(post.id)}
                  disabled={status.type === "saving"}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-broadcast disabled:opacity-60"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onUploaded={(url) => {
            setImageUrl(url);
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
}
