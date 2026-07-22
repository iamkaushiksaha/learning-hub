"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/lib/topics";
import { fadeUp } from "@/lib/motion";

export function TopicCard({ topic }: { topic: Topic }) {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={reduce ? undefined : fadeUp}>
      <Link
        href={`/topics/${topic.slug}`}
        className="group block h-full rounded-xl border border-border bg-surface-1 p-5 transition-colors hover:border-accent"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium leading-snug text-text">
            {topic.title}
          </h3>
          <ArrowRight
            size={16}
            className="mt-1 shrink-0 text-text-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-2">
          {topic.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topic.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-surface-2 px-2 py-0.5 text-[11.5px] font-medium text-text-3"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
