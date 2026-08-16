import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  speed?: "normal" | "fast";
  className?: string;
  itemClassName?: string;
  separator?: string;
  separatorClassName?: string;
};

export default function Marquee({
  items,
  speed = "normal",
  className = "",
  itemClassName = "",
  separator = "//",
  separatorClassName = "text-signal",
}: MarqueeProps) {
  const animClass = speed === "fast" ? "animate-marquee-fast" : "animate-marquee";

  const track = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={keyPrefix === "b"}>
      {items.map((item, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className={`flex items-center whitespace-nowrap px-4 ${itemClassName}`}
        >
          {item}
          <span className={`ml-4 ${separatorClassName}`}>{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${animClass}`}>
        {track("a")}
        {track("b")}
      </div>
    </div>
  );
}
