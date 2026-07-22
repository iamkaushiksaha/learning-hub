"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      className="my-6 rounded-xl border border-border bg-surface-1 p-5"
    >
      <div className="overflow-x-auto">{children}</div>
      {caption && (
        <figcaption className="mt-3 text-center text-[13px] text-text-3">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
