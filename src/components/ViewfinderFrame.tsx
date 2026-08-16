import { ReactNode } from "react";

export default function ViewfinderFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`viewfinder ${className}`}>
      <span className="vf-tr" aria-hidden="true" />
      <span className="vf-bl" aria-hidden="true" />
      {children}
    </div>
  );
}
