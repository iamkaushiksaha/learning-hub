import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** shadcn-style Badge, themed to the house tokens. Categorical variants pair
 *  color with a label (never color alone) per the design principles. */
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        accent: "bg-accent-soft text-accent",
        teal: "bg-cat-teal-bg text-cat-teal",
        coral: "bg-cat-coral-bg text-cat-coral",
        neutral: "bg-surface-2 text-text-2",
      },
    },
    defaultVariants: { tone: "accent" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
