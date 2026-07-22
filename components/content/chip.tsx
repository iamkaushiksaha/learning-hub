import type { ReactNode } from "react";

const styles: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  teal: "bg-cat-teal-bg text-cat-teal",
  coral: "bg-cat-coral-bg text-cat-coral",
  neutral: "bg-surface-2 text-text-2",
};

export function Chip({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "teal" | "coral" | "neutral";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
