type RecBadgeProps = {
  label?: string;
  tone?: "dark" | "light";
  className?: string;
};

export default function RecBadge({
  label = "ON AIR",
  tone = "dark",
  className = "",
}: RecBadgeProps) {
  const textColor = tone === "dark" ? "text-paper" : "text-navy";
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.25em] ${textColor} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-broadcast" />
      </span>
      {label}
    </span>
  );
}
