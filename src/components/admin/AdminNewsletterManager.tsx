"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Subscriber } from "@/lib/newsletter-store";

type Status = { type: "idle" | "busy" | "error"; message?: string };

export default function AdminNewsletterManager({
  initialSubscribers,
}: {
  initialSubscribers: Subscriber[];
}) {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function remove(email: string) {
    setStatus({ type: "busy" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setSubscribers(data.subscribers);
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="newsletter-password" className="mb-1.5 block font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft">
          ADMIN PASSWORD
        </label>
        <input
          id="newsletter-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full max-w-xs border border-navy-line bg-navy-panel px-3 py-2.5 font-mono text-sm text-paper outline-none transition-colors focus:border-broadcast"
          placeholder="•••••••• (required to remove subscribers)"
        />
      </div>

      <div>
        <p className="mb-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft">
          SUBSCRIBERS ({subscribers.length})
        </p>
        {subscribers.length === 0 ? (
          <p className="text-sm text-ink-soft">No subscribers yet.</p>
        ) : (
          <ul className="divide-y divide-navy-line border border-navy-line">
            {subscribers.map((s) => (
              <li
                key={s.email}
                className="flex flex-wrap items-center justify-between gap-3 bg-navy-deep/40 p-3"
              >
                <span className="font-mono text-sm text-paper">{s.email}</span>
                <button
                  type="button"
                  onClick={() => remove(s.email)}
                  disabled={status.type === "busy"}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-broadcast disabled:opacity-60"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {status.type === "error" && (
        <p className="border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
          {status.message}
        </p>
      )}
    </div>
  );
}
