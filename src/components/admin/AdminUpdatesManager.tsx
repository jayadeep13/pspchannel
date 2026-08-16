"use client";

import { useState } from "react";
import { Loader2, Send, Trash2, Upload } from "lucide-react";
import type { UpdatePost } from "@/lib/updates-store";
import ImageUploadModal from "./ImageUploadModal";

type Status = { type: "idle" | "saving" | "error"; message?: string };

export default function AdminUpdatesManager({
  initialUpdates,
}: {
  initialUpdates: UpdatePost[];
}) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [showUploadModal, setShowUploadModal] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, body, imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setUpdates(data.updates);
      setTopic("");
      setBody("");
      setImageUrl("");
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  async function remove(id: string) {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/updates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setUpdates(data.updates);
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
          <label className={labelClass}>HEADLINE</label>
          <input
            className={inputClass}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Now filming Episode 005"
            required
          />
        </div>

        <div>
          <label className={labelClass}>ARTICLE BODY</label>
          <textarea
            className={inputClass}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the story — a paragraph or two about what's happening."
            required
          />
        </div>

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
            yourself.
          </p>
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
          Post Update
        </button>

        {status.type === "error" && (
          <p className="border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
            {status.message}
          </p>
        )}
      </form>

      <div>
        <p className={labelClass}>PUBLISHED UPDATES ({updates.length})</p>
        {updates.length === 0 ? (
          <p className="text-sm text-ink-soft">No updates yet — post your first one above.</p>
        ) : (
          <ul className="divide-y divide-navy-line border border-navy-line">
            {updates.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 bg-navy-deep/40 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={u.imageUrl}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-bold text-paper">
                      {u.topic}
                    </p>
                    {u.body && (
                      <p className="truncate text-xs text-ink-soft">{u.body}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(u.id)}
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
