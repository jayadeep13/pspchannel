import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RecBadge from "@/components/RecBadge";
import ContactForm from "@/components/ContactForm";
import ImageSlideshowBackground from "@/components/ImageSlideshowBackground";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/icons/SocialIcons";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with PSP Channel — suggest an interview subject, a village to visit, or follow us on YouTube, Facebook, Instagram and WhatsApp.",
  alternates: { canonical: "/contact" },
};

const heroImages = [
  "/images/golla.jpg",
  "/images/lokes.jpg",
  "/images/sharmila.webp",
  "/images/tulasi.jpg",
];

const socials = [
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: WhatsappIcon },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <ImageSlideshowBackground images={heroImages} />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-10">
          <Reveal>
            <RecBadge label="GET IN TOUCH" className="justify-center" />
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-wide text-paper sm:text-6xl">
              TELL US
              <br />
              <span className="text-broadcast">WHO TO INTERVIEW</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Know a veteran leader, a rural doctor, or someone whose story
              deserves an episode? Send us the details.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10">
          <Reveal direction="left">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              CONTACT DETAILS
            </span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold text-ink">
              Reach the crew directly
            </h2>

            <ul className="mt-8 space-y-6">
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-broadcast text-paper">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-heading text-base font-semibold text-ink transition-colors hover:text-broadcast"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-broadcast text-paper">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                    PHONE
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="font-heading text-base font-semibold text-ink transition-colors hover:text-broadcast"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-broadcast text-paper">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                    BASED IN
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${siteConfig.contact.mapLat},${siteConfig.contact.mapLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-base font-semibold text-ink transition-colors hover:text-broadcast"
                  >
                    {siteConfig.contact.location}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-9 border-t border-paper-dim pt-7">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                FOLLOW US
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-broadcast hover:text-paper"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-dim pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <Reveal>
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-broadcast">
              FIND US
            </span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold text-ink">
              Where we&rsquo;re based
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="aspect-[16/9] w-full overflow-hidden border border-paper-dim lg:aspect-[21/9]">
              <iframe
                src={`https://www.google.com/maps?q=${siteConfig.contact.mapLat},${siteConfig.contact.mapLng}&z=15&output=embed`}
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PSP Channel location"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
