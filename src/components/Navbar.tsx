"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import RecBadge from "./RecBadge";
import { YoutubeIcon, FacebookIcon, InstagramIcon } from "./icons/SocialIcons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-paper-dim bg-paper/95 backdrop-blur"
          : "border-transparent bg-paper"
      }`}
    >
      {/* Broadcast top strip */}
      <div className="hidden items-center justify-between bg-navy-deep px-6 py-1.5 font-mono text-[11px] tracking-[0.2em] text-ink-soft md:flex lg:px-10">
        <span className="flex items-center gap-2">
          <RecBadge label="LIVE FROM THE FIELD" />
        </span>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PSP Channel on YouTube"
            className="transition-colors hover:text-broadcast"
          >
            <YoutubeIcon size={14} />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PSP Channel on Facebook"
            className="transition-colors hover:text-broadcast"
          >
            <FacebookIcon size={14} />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PSP Channel on Instagram"
            className="transition-colors hover:text-broadcast"
          >
            <InstagramIcon size={14} />
          </a>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="PSP Channel home">
          <Image
            src="/images/logowb.png"
            alt="PSP Channel logo"
            width={132}
            height={118}
            className="h-11 w-auto"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-ink">
              PSP <span className="text-broadcast">CHANNEL</span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-ink-soft">
              VOICES FROM THE GROUND
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-heading text-sm font-semibold tracking-wide transition-colors ${
                  active ? "text-broadcast" : "text-ink hover:text-broadcast"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-broadcast"
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/live"
            className="group inline-flex items-center gap-2 border-2 border-broadcast bg-broadcast px-4 py-2 font-heading text-sm font-bold tracking-wide text-paper transition-colors hover:bg-transparent hover:text-broadcast"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-blink rounded-full bg-paper group-hover:bg-broadcast" />
            </span>
            Watch Live
          </Link>
        </div>

        <button
          className="text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-paper-dim bg-paper lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-3 py-3 font-heading text-base font-semibold ${
                    pathname === item.href
                      ? "bg-paper-dim text-broadcast"
                      : "text-ink hover:bg-paper-dim"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/live"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-broadcast px-4 py-3 font-heading text-sm font-bold tracking-wide text-paper"
              >
                <span className="h-2 w-2 animate-blink rounded-full bg-paper" />
                Watch Live
              </Link>
              <div className="mt-4 flex items-center gap-5 px-3 pt-2">
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-ink-soft hover:text-broadcast">
                  <YoutubeIcon size={20} />
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ink-soft hover:text-broadcast">
                  <FacebookIcon size={20} />
                </a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-soft hover:text-broadcast">
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
