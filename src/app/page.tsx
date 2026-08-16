import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TickerStrip from "@/components/TickerStrip";
import MissionSection from "@/components/MissionSection";
import FounderSection from "@/components/FounderSection";
import InterviewsSection from "@/components/InterviewsSection";
import LiveSection from "@/components/LiveSection";
import CTASection from "@/components/CTASection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerStrip />
      <MissionSection />
      <FounderSection />
      <InterviewsSection />
      <LiveSection />
      <CTASection />
    </>
  );
}
