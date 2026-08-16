"use client";

import { useState } from "react";
import { Loader2, Save, Trash2, PenSquare, X } from "lucide-react";
import { occupations, type Interview, type Occupation } from "@/lib/site-config";

const emptyForm = {
  slug: "",
  title: "",
  subject: "",
  occupation: "Politics" as Occupation,
  location: "",
  status: "upcoming" as Interview["status"],
  episode: "",
  duration: "",
  date: "",
  synopsis: "",
  youtubeId: "",
  thumbnail: "",
};

type Status = { type: "idle" | "saving" | "error"; message?: string };

export default function AdminInterviewsManager({
  initialInterviews,
}: {
  initialInterviews: Interview[];
}) {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function edit(interview: Interview) {
    setForm({
      slug: interview.slug,
      title: interview.title,
      subject: interview.subject,
      occupation: interview.occupation,
      location: interview.location,
      status: interview.status,
      episode: interview.episode,
      duration: interview.duration ?? "",
      date: interview.date ?? "",
      synopsis: interview.synopsis,
      youtubeId: interview.youtubeId ?? "",
      thumbnail: interview.thumbnail ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          interview: {
            ...form,
            slug: form.slug || undefined,
            duration: form.duration || undefined,
            date: form.date || undefined,
            youtubeId: form.youtubeId || undefined,
            thumbnail: form.thumbnail || undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setInterviews(data.interviews);
      setForm(emptyForm);
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  async function remove(slug: string) {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/interviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setInterviews(data.interviews);
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
      <form onSubmit={save} className="space-y-5">
        <div>
          <label htmlFor="interview-password" className={labelClass}>
            ADMIN PASSWORD
          </label>
          <input
            id="interview-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        {form.slug && (
          <div className="flex items-center justify-between border border-signal/40 bg-signal-soft/10 px-3 py-2 text-xs text-signal">
            <span>Editing &ldquo;{form.title}&rdquo;</span>
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="inline-flex items-center gap-1 text-paper hover:text-broadcast"
            >
              <X size={12} /> Cancel
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>TITLE</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className={labelClass}>SUBJECT / SUBTITLE</label>
            <input
              className={inputClass}
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>OCCUPATION</label>
            <select
              className={inputClass}
              value={form.occupation}
              onChange={(e) =>
                setForm((f) => ({ ...f, occupation: e.target.value as Occupation }))
              }
            >
              {occupations.map((o) => (
                <option key={o.label} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>STATUS</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as Interview["status"],
                }))
              }
            >
              <option value="published">Published</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>LOCATION</label>
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="Andhra Pradesh"
            />
          </div>
          <div>
            <label className={labelClass}>EPISODE</label>
            <input
              className={inputClass}
              value={form.episode}
              onChange={(e) => setForm((f) => ({ ...f, episode: e.target.value }))}
              placeholder="EP. 005"
              required
            />
          </div>
          <div>
            <label className={labelClass}>DURATION (OPTIONAL)</label>
            <input
              className={inputClass}
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              placeholder="18:42"
            />
          </div>
          <div>
            <label className={labelClass}>DATE (OPTIONAL)</label>
            <input
              className={inputClass}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="2026"
            />
          </div>
          <div>
            <label className={labelClass}>YOUTUBE VIDEO ID (OPTIONAL)</label>
            <input
              className={inputClass}
              value={form.youtubeId}
              onChange={(e) => setForm((f) => ({ ...f, youtubeId: e.target.value }))}
              placeholder="dQw4w9WgXcQ"
            />
          </div>
          <div>
            <label className={labelClass}>THUMBNAIL URL (OPTIONAL)</label>
            <input
              className={inputClass}
              value={form.thumbnail}
              onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))}
              placeholder="/images/..."
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>SYNOPSIS</label>
          <textarea
            className={inputClass}
            rows={3}
            value={form.synopsis}
            onChange={(e) => setForm((f) => ({ ...f, synopsis: e.target.value }))}
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
            <Save size={16} />
          )}
          {form.slug ? "Update Interview" : "Add Interview"}
        </button>

        {status.type === "error" && (
          <p className="border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
            {status.message}
          </p>
        )}
      </form>

      <div>
        <p className={labelClass}>PUBLISHED &amp; UPCOMING ({interviews.length})</p>
        {interviews.length === 0 ? (
          <p className="text-sm text-ink-soft">No interviews yet — add your first one above.</p>
        ) : (
          <ul className="divide-y divide-navy-line border border-navy-line">
            {interviews.map((interview) => (
              <li
                key={interview.slug}
                className="flex flex-wrap items-center justify-between gap-3 bg-navy-deep/40 p-4"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-broadcast">
                    {interview.episode} · {interview.occupation.toUpperCase()} ·{" "}
                    {interview.status.toUpperCase()}
                  </span>
                  <p className="mt-1 font-heading text-sm font-bold text-paper">
                    {interview.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => edit(interview)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-signal"
                  >
                    <PenSquare size={14} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(interview.slug)}
                    disabled={status.type === "saving"}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-broadcast disabled:opacity-60"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
