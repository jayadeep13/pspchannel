"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "saving" | "error"; message?: string }>({
    type: "idle",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm border border-navy-line bg-navy-deep/60 p-8"
      >
        <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-broadcast">
          ADMIN
        </p>
        <h1 className="mt-3 font-display text-2xl tracking-wide text-paper">
          Sign in to continue
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Enter the admin password to access the panel.
        </p>

        <div className="mt-6">
          <label
            htmlFor="admin-login-password"
            className="mb-1.5 block font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft"
          >
            ADMIN PASSWORD
          </label>
          <input
            id="admin-login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            autoComplete="current-password"
            className="w-full border border-navy-line bg-navy-panel px-3 py-2.5 font-mono text-sm text-paper outline-none transition-colors focus:border-broadcast"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "saving"}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-broadcast px-5 py-3 font-heading text-sm font-bold tracking-wide text-paper transition-colors hover:bg-broadcast-dim disabled:opacity-60"
        >
          {status.type === "saving" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <LogIn size={16} />
          )}
          Sign In
        </button>

        {status.type === "error" && (
          <p className="mt-4 border border-broadcast bg-broadcast/10 px-4 py-3 text-sm text-paper">
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
