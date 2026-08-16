"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

export default function ImageUploadModal({
  password,
  onClose,
  onUploaded,
}: {
  password: string;
  onClose: () => void;
  onUploaded: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(f: File | null) {
    setError("");
    setFile(f);
    setPreviewUrl(f ? URL.createObjectURL(f) : "");
  }

  async function upload() {
    if (!file) return;
    if (!password) {
      setError("Enter the admin password in the form first.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("password", password);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      onUploaded(data.url as string);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md border border-navy-line bg-navy-deep p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold tracking-wide text-paper">
            UPLOAD IMAGE
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-soft hover:text-broadcast"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-navy-line bg-navy-panel px-4 py-8 text-center transition-colors hover:border-broadcast">
          {previewUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={previewUrl}
              alt=""
              className="max-h-40 max-w-full object-contain"
            />
          ) : (
            <>
              <Upload size={22} className="text-ink-soft" />
              <span className="font-mono text-xs text-ink-soft">
                Click to choose an image file
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {error && (
          <p className="mt-3 border border-broadcast bg-broadcast/10 px-4 py-2.5 text-sm text-paper">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 font-mono text-xs font-bold tracking-wide text-ink-soft hover:text-paper"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={upload}
            disabled={!file || uploading}
            className="inline-flex items-center gap-2 bg-broadcast px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-paper transition-colors hover:bg-broadcast-dim disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            Use This Image
          </button>
        </div>
      </div>
    </div>
  );
}
