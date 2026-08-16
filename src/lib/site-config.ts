export const siteConfig = {
  name: "PSP Channel",
  tagline: "Voices from the Ground",
  description:
    "PSP Channel travels to the remote villages and forgotten towns of Andhra Pradesh and Telangana to interview veteran politicians, doctors, farmers, teachers, and everyday changemakers — carrying real stories from the ground to the world.",
  url: "https://www.pspchannel.com",
  keywords: [
    "PSP Channel",
    "Paturi Bhanu Prasad",
    "remote village interviews",
    "grassroots journalism Andhra Pradesh",
    "veteran politician interviews",
    "rural doctors Andhra Pradesh",
    "Telugu news channel",
    "Andhra Pradesh news channel",
    "Telangana news channel",
    "ground report journalism",
    "independent YouTube news channel",
    "real stories from villages",
    "unsung heroes interviews",
    "PSP Channel YouTube",
    "grassroots interview channel",
    "field journalism Telangana",
  ],
  founder: {
    name: "Paturi Bhanu Prasad",
    role: "Founder & Editor-in-Chief",
    image: "/images/founder.jpg",
    bio: "Paturi Bhanu Prasad founded PSP Channel to chase the stories no one else was chasing — tracking down veteran politicians to uncover the truths behind the decisions that shaped our villages, and sitting with doctors, teachers and everyday professionals who quietly serve their communities without ever asking for recognition. Every hidden truth uncovered is carried straight to society, unfiltered. Because when today's generation — Gen Z included — hears what really happened and who really served, it doesn't just inform them. It inspires them.",
    quote:
      "Every hidden truth we uncover becomes someone's inspiration. That's why we keep going back to the villages.",
  },
  social: {
    youtube: "https://www.youtube.com/channel/UC0p5KUlISV5qwpcQnkzdJyg",
    facebook: "https://www.facebook.com/profile.php?id=61593251882851",
    instagram: "https://www.instagram.com/psp_channel_/",
    whatsapp: "https://wa.me/918885503456",
    twitter: "https://x.com/pspchannel",
  },
  contact: {
    email: "contactpspchannel@gmail.com",
    phone: "+91 88855 03456",
    whatsappNumber: "918885503456",
    location: "Andhra Pradesh, India",
    mapLat: 16.507026605454598,
    mapLng: 80.65607324913745,
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Interviews", href: "/interviews" },
    { label: "Shorts", href: "/shorts" },
    { label: "Posts", href: "/posts" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Occupation =
  | "Politics"
  | "Medicine"
  | "Agriculture"
  | "Education"
  | "Freedom Fighters"
  | "Arts & Craft"
  | "Small Business"
  | "Social Work"
  | "Other";

export const occupations: {
  label: Occupation;
  description: string;
  image?: string;
}[] = [
  {
    label: "Politics",
    description: "Veteran leaders who shaped local governance for decades.",
    image: "/images/political.png",
  },
  {
    label: "Medicine",
    description: "Doctors who chose villages over city hospitals.",
    image: "/images/doctors.png",
  },
  {
    label: "Agriculture",
    description: "Farmers whose knowledge feeds entire districts.",
    image: "/images/agriculture.png",
  },
  {
    label: "Education",
    description: "Teachers running single-room schools against all odds.",
    image: "/images/teachers.png",
  },
  {
    label: "Freedom Fighters",
    description: "The last living witnesses to a nation's independence.",
    image: "/images/freedomfighters.png",
  },
  {
    label: "Arts & Craft",
    description: "Artisans preserving crafts that machines cannot replace.",
    image: "/images/art&craft.png",
  },
  {
    label: "Small Business",
    description: "Shopkeepers and traders who built local economies by hand.",
    image: "/images/smallbusiness.png",
  },
  {
    label: "Social Work",
    description: "Volunteers solving problems no one else shows up for.",
    image: "/images/socialwork.png",
  },
  {
    label: "Other",
    description:
      "Retired police officers, lawyers, and stories that don't fit neatly into a single category.",
    image: "/images/other.png",
  },
];

export type Interview = {
  slug: string;
  title: string;
  subject: string;
  occupation: Occupation;
  location: string;
  status: "published" | "upcoming";
  episode: string;
  duration?: string;
  date?: string;
  synopsis: string;
  youtubeId?: string;
  thumbnail?: string;
};

// Interviews are managed from /admin and stored in Redis — see
// src/lib/interviews-store.ts. This file only defines the shared type.

export type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
};

// Posts are managed from /admin and stored in Redis — see
// src/lib/posts-store.ts. This file only defines the shared type.

export const updates = [
  {
    label: "NOW FILMING",
    text: "Crew is on the ground recording Episode 002 — a rural clinic story three decades in the making.",
  },
  {
    label: "COMING SOON",
    text: "Episode 003 will feature a rare, first-hand account from a freedom movement veteran.",
  },
  {
    label: "CHANNEL UPDATE",
    text: "PSP Channel has officially launched. Subscribe to follow every expedition from day one.",
  },
  {
    label: "GOAL",
    text: "Building a permanent archive of interviews across politics, medicine, farming, education and craft.",
  },
];
