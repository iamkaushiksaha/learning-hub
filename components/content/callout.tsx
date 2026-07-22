import type { ReactNode } from "react";
import { Lightbulb, TriangleAlert, Sparkles, Info } from "lucide-react";

type Variant = "tip" | "warn" | "idea" | "note";

const config: Record<
  Variant,
  { border: string; icon: typeof Info; iconColor: string; label: string }
> = {
  tip: { border: "border-l-cat-teal", icon: Lightbulb, iconColor: "text-cat-teal", label: "Tip" },
  warn: { border: "border-l-cat-coral", icon: TriangleAlert, iconColor: "text-cat-coral", label: "Watch out" },
  idea: { border: "border-l-accent", icon: Sparkles, iconColor: "text-accent", label: "Idea" },
  note: { border: "border-l-border-strong", icon: Info, iconColor: "text-text-3", label: "Note" },
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const c = config[variant];
  const Icon = c.icon;
  return (
    <div
      className={`my-5 rounded-lg rounded-l-none border border-border border-l-4 ${c.border} bg-surface-1 px-5 py-4`}
    >
      <div className="mb-1 flex items-center gap-2">
        <Icon size={15} className={c.iconColor} />
        <span className="text-xs font-medium uppercase tracking-wide text-text-2">
          {title ?? c.label}
        </span>
      </div>
      <div className="text-[15px] leading-relaxed text-text-2 [&_strong]:text-text [&_code]:text-text">
        {children}
      </div>
    </div>
  );
}
