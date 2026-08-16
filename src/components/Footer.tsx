import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "./icons/SocialIcons";

const socialLinks = [
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: WhatsappIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-line bg-navy-deep text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-800.png"
                alt="PSP Channel logo"
                width={40}
                height={50}
                className="h-10 w-auto"
              />
              <span className="font-display text-lg tracking-wide">
                PSP <span className="text-broadcast">CHANNEL</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.25em] text-signal">
              NAVIGATE
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-paper/90 transition-colors hover:text-signal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.25em] text-signal">
              CONTACT
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-paper/90">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-broadcast" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-signal"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-broadcast" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-signal"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-broadcast" />
                {siteConfig.contact.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.25em] text-signal">
              FOLLOW THE SIGNAL
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-navy-line text-paper transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-navy-line pt-6 text-xs text-ink-soft md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="font-mono tracking-wide">
            Founded by {siteConfig.founder.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
