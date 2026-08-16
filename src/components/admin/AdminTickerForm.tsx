"use client";

import { useState } from "react";
import { Loader2, Save, RotateCcw } from "lucide-react";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };

export default function AdminTickerForm({
  initialText,
}: {
  initialText: string;
}) {
  const [password, setPassword] = useState("");
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function save(nextText: string) {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/ticker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, text: nextText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setText(nextText);
      setStatus({
        type: "success",
        message: nextText.trim()
          ? "Saved. The ticker now shows your text."
          : "Reset. The ticker is back to the default topics.",
      });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(text);
      }}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-mono text-[11px] font-bold tracking-[0.2em] text-ink-soft"
        >
          ADMIN PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full border border-navy-line bg-navy-panel px-4 py-3 font-mono text-sm text-paper outline-none transition-colors focus:border-broadcast"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label
          htmlFor="ticker-text"
          className="mb-2 block font-mono text-[11px] font-bold tracking-[0.2em] text-ink-soft"
        >
          TICKER TEXT — ONE ITEM PER LINE
        </label>
        <textarea
          id="ticker-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full resize-y border border-navy-line bg-navy-panel px-4 py-3 font-mono text-sm text-paper outline-none transition-colors focus:border-broadcast"
          placeholder={"BREAKING: New episode out now\nJoin us live every Friday"}
        />
        <p className="mt-2 text-xs text-ink-soft">
          Leave this empty and save to fall back to the default topic list
          (Politics, Medicine, Agriculture…).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
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
          Save Ticker
        </button>
        <button
          type="button"
          disabled={status.type === "saving"}
          onClick={() => {
            setText("");
            save("");
          }}
          className="inline-flex items-center gap-2 border border-navy-line px-5 py-3 font-heading text-sm font-bold tracking-wide text-paper transition-colors hover:border-broadcast hover:text-broadcast disabled:opacity-60"
        >
          <RotateCcw size={16} />
          Reset to Default
        </button>
      </div>

      {status.type === "success" && (
        <p className="border border-navy-line bg-navy-panel px-4 py-3 text-sm text-paper">
          {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p className="border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
          {status.message}
        </p>
      )}
    </form>
  );
}
