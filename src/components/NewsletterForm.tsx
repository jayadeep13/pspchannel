"use client";

import { useState, FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setEmail("");
      setStatus({ type: "success", message: "You're subscribed — welcome aboard." });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-paper-dim bg-white py-3.5 pl-10 pr-3.5 text-sm text-ink outline-none transition-colors focus:border-broadcast"
          />
        </div>
        <button
          type="submit"
          disabled={status.type === "sending"}
          className="inline-flex items-center justify-center gap-2 bg-broadcast px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status.type === "sending" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {status.type === "success" && (
        <p className="mt-3 text-sm text-signal">{status.message}</p>
      )}
      {status.type === "error" && (
        <p className="mt-3 text-sm text-broadcast">{status.message}</p>
      )}
    </div>
  );
}
