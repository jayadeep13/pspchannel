import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "./icons/SocialIcons";

const links = [
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.whatsapp, label: "WhatsApp Channel", icon: WhatsappIcon },
];

export default function CTASection() {
  return (
    <section className="bg-broadcast py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-10">
        <Reveal>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
            Follow the crew before the next expedition
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/90">
            New episodes, behind-the-scenes updates and live broadcasts land
            on these channels first.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-paper bg-paper px-5 py-3 font-heading text-sm font-bold tracking-wide text-broadcast transition-colors hover:bg-transparent hover:text-paper"
            >
              <Icon size={17} />
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
