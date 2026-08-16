"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { WhatsappIcon } from "./icons/SocialIcons";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Interview suggestion from ${name}\n\n${message}\n\nEmail: ${email}`
    );
    window.open(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-paper-dim bg-white p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono text-[11px] tracking-[0.15em] text-ink-soft">
            YOUR NAME
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-paper-dim bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-broadcast"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[11px] tracking-[0.15em] text-ink-soft">
            YOUR EMAIL
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-paper-dim bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-broadcast"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="font-mono text-[11px] tracking-[0.15em] text-ink-soft">
          MESSAGE
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none border border-paper-dim bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-broadcast"
          placeholder="Tell us about the person or village you'd like us to visit..."
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 bg-broadcast px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
      >
        Send via WhatsApp
        <WhatsappIcon size={15} />
      </button>
      <p className="mt-3 text-xs text-ink-soft">
        This opens WhatsApp with your message pre-filled to send to PSP
        Channel.
      </p>
    </form>
  );
}
