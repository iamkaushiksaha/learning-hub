import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

/** Thin alias over the shadcn-style Badge primitive, kept for topic-page ergonomics. */
export function Chip({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "teal" | "coral" | "neutral";
}) {
  return <Badge tone={tone}>{children}</Badge>;
}
