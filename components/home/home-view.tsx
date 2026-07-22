"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { CATEGORIES, TOPICS } from "@/lib/topics";
import { TopicCard } from "@/components/content/topic-card";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function HomeView() {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      TOPICS.filter(
        (t) =>
          !q ||
          `${t.title} ${t.description} ${t.tags.join(" ")}`
            .toLowerCase()
            .includes(q),
      ),
    [q],
  );

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <motion.section
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={reduce ? undefined : staggerContainer}
      >
        <motion.h1
          variants={reduce ? undefined : fadeUp}
          className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl"
        >
          Learning &amp; research, organized.
        </motion.h1>
        <motion.p
          variants={reduce ? undefined : fadeUp}
          className="mt-4 max-w-xl text-lg leading-relaxed text-text-2"
        >
          Interactive write-ups from my cybersecurity research — Microsoft
          Sentinel, detection engineering, DevOps automation, threat hunting,
          and security architecture. Each topic is a self-contained deep dive
          with diagrams, decision frameworks, and hands-on labs.
        </motion.p>
        <motion.div
          variants={reduce ? undefined : fadeUp}
          className="relative mt-7 max-w-lg"
        >
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, tags, keywords…"
            className="w-full rounded-lg border border-border bg-surface-1 py-3 pl-10 pr-4 text-[15px] text-text outline-none transition-colors placeholder:text-text-3 focus:border-accent"
          />
        </motion.div>
      </motion.section>

      <div className="mt-14 space-y-12">
        {CATEGORIES.map((cat) => {
          const topics = filtered.filter((t) => t.category === cat.id);
          if (q && topics.length === 0) return null;
          return (
            <section key={cat.id}>
              <div className="mb-4 flex items-baseline gap-3">
                <h2 className="text-xl font-medium tracking-tight text-text">
                  {cat.name}
                </h2>
                <span className="text-[13px] text-text-3">
                  {topics.length} topic{topics.length === 1 ? "" : "s"} ·{" "}
                  {cat.blurb}
                </span>
              </div>
              {topics.length ? (
                <motion.div
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  variants={reduce ? undefined : staggerContainer}
                  initial={reduce ? undefined : "hidden"}
                  whileInView={reduce ? undefined : "show"}
                  viewport={viewportOnce}
                >
                  {topics.map((t) => (
                    <TopicCard key={t.slug} topic={t} />
                  ))}
                </motion.div>
              ) : (
                <p className="rounded-lg border border-dashed border-border px-4 py-3.5 text-sm text-text-3">
                  Nothing here yet — topics land in this category as research
                  sessions produce them.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
