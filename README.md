# PSP Channel — Website

A production-ready Next.js 16 + Tailwind CSS v4 + Framer Motion website for **PSP Channel**, built to showcase grassroots interview journalism from remote villages across India.

## What's included

- Fully responsive design (mobile / tablet / desktop) — built mobile-first
- Animated hero with your looping logo video (`public/videos/psp-logo-loop.mp4` / `.webm`, compressed for the web)
- Framer Motion scroll-reveal animations, staggered text animation, hover micro-interactions, marquee tickers
- Pages: **Home, About, Interviews (with occupation filter), Live, Contact**
- SEO: per-page metadata, Open Graph + Twitter cards, JSON-LD structured data (`NewsMediaOrganization`), `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- Custom "broadcast viewfinder" visual identity (corner-bracket frames, blinking REC/ON-AIR indicators, timecode-style labels) drawn from your logo's colors
- Self-hosted fonts (Anton, Archivo, Inter, IBM Plex Mono) via `@fontsource` — no external font requests, so it works even without internet access to Google Fonts
- Custom hand-built social icons (YouTube, Facebook, Instagram, WhatsApp, X) since brand icons aren't in the `lucide-react` icon set

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To build for production:

```bash
npm run build
npm run start
```

## Where to edit content

Almost everything text-based lives in one file:

**`src/lib/site-config.ts`**
- Site name, tagline, description, SEO keywords
- Founder name, role, bio, quote
- Social media links (YouTube, Facebook, Instagram, WhatsApp, X) — **update these with your real channel URLs**
- Contact email / phone / location
- The list of occupations you interview
- The list of interviews/episodes (add new ones here as you publish them)
- Channel updates shown in the "Live" ticker

### Adding a new interview

Open `src/lib/site-config.ts` and add an entry to the `interviews` array:

```ts
{
  slug: "unique-slug",
  title: "Episode Title",
  subject: "Person's Name",
  occupation: "Medicine", // must match one of the Occupation labels
  location: "Village, District",
  status: "published", // or "upcoming"
  episode: "EP. 005",
  date: "2026",
  synopsis: "One or two sentences describing the interview.",
  youtubeId: "your-youtube-video-id", // optional, for future embed use
  thumbnail: "/images/your-thumbnail.jpg", // add the image to public/images first
}
```

### Replacing the founder photo

A styled placeholder (`src/components/FounderAvatar.tsx`) is used until you add a real photo. To swap it in:

1. Add the photo to `public/images/founder.jpg`
2. In `src/components/FounderSection.tsx`, replace `<FounderAvatar />` with a Next.js `<Image>` pointing at `/images/founder.jpg`

### Replacing the OG / social share image

`public/images/og-image.jpg` was auto-generated from your logo. Swap it for a custom 1200×630 design any time — the file name and path can stay the same.

### YouTube Live

`src/components/LiveSection.tsx` currently shows an "off air" placeholder with a subscribe button, since there's no live stream running yet. When you're ready to embed a real live stream or past broadcast, replace the placeholder block with a standard YouTube iframe embed, e.g.:

```tsx
<iframe
  className="aspect-video w-full"
  src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
  title="PSP Channel Live"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

## Before you deploy

1. Update every social link and the founder's photo as above.
2. Update `siteConfig.url` in `src/lib/site-config.ts` to your real domain — this feeds the sitemap, canonical URLs, and structured data.
3. Update `siteConfig.contact` with your real email/phone.
4. Consider connecting a form backend (e.g. Formspree, Resend, or a serverless API route) if you want the contact form to send email directly instead of opening the visitor's mail client.

## Deploying

This is a standard Next.js app — it deploys cleanly to Vercel, Netlify, or any Node hosting:

```bash
# Vercel (recommended, zero config)
npx vercel
```

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev) for utility icons
- [@fontsource](https://fontsource.org) for self-hosted fonts
