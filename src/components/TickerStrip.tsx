import {
  Landmark,
  Stethoscope,
  Wheat,
  GraduationCap,
  Flag,
  Palette,
  Store,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Marquee from "./Marquee";
import { occupations, type Occupation } from "@/lib/site-config";
import { getTickerText } from "@/lib/ticker-store";

const ICONS: Record<Occupation, LucideIcon> = {
  Politics: Landmark,
  Medicine: Stethoscope,
  Agriculture: Wheat,
  Education: GraduationCap,
  "Freedom Fighters": Flag,
  "Arts & Craft": Palette,
  "Small Business": Store,
  "Social Work": HeartHandshake,
  Other: Sparkles,
};

export default async function TickerStrip() {
  const customText = await getTickerText();
  const customLines = customText
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const items =
    customLines && customLines.length > 0
      ? customLines.map((line, i) => <span key={i}>{line.toUpperCase()}</span>)
      : occupations.map((o) => (
          <span key={o.label} className="inline-flex items-center gap-2">
            {(() => {
              const Icon = ICONS[o.label];
              return <Icon size={13} className="text-paper" strokeWidth={2.25} />;
            })()}
            {o.label.toUpperCase()}
          </span>
        ));

  return (
    <div className="relative flex items-stretch border-y border-broadcast-dim bg-broadcast">
      <div className="hidden shrink-0 items-center gap-1.5 border-r border-broadcast-dim bg-navy-deep px-4 sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-broadcast" />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-paper">
          WE COVER
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-broadcast to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-broadcast to-transparent sm:w-20" />
        <Marquee
          items={items}
          separator="•"
          separatorClassName="text-paper/60"
          className="font-heading text-xs font-bold tracking-[0.12em] text-paper"
          itemClassName="hover:text-navy transition-colors"
        />
      </div>
    </div>
  );
}
