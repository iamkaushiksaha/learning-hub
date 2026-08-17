"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { LEARNING_PATHS, TOPICS } from "@/lib/topics";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const stages = ["Foundation", "Build", "Secure", "Operate"];

export function HomeView() {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const q = query.trim().toLowerCase();

  const matches = useMemo(
    () =>
      new Set(
        TOPICS.filter((topic) =>
          `${topic.title} ${topic.description} ${topic.tags.join(" ")}`
            .toLowerCase()
            .includes(q),
        ).map((topic) => topic.slug),
      ),
    [q],
  );

  const visibleCount = q ? matches.size : TOPICS.length;

  return (
    <main className="overflow-hidden pb-24">
      <section className="relative border-b border-border px-6 pb-16 pt-16 sm:pt-24">
        <div className="learning-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={reduce ? undefined : staggerContainer}
          >
            <motion.div variants={reduce ? undefined : fadeUp} className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cat-teal">
              <ShieldCheck size={15} /> Public cybersecurity learning atlas
            </motion.div>
            <motion.h1 variants={reduce ? undefined : fadeUp} className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-text sm:text-7xl">
              Learn the system.
              <span className="block text-accent-2">Defend the outcome.</span>
            </motion.h1>
            <motion.p variants={reduce ? undefined : fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2">
              A structured map from engineering foundations to governed agentic AI—built from hands-on cybersecurity research, visual explanations, and implementation evidence.
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: 28 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="signal-map"
            aria-label="Learning progression: foundation, build, secure, operate"
          >
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-3">Capability progression</p>
            <ol className="relative grid grid-cols-4 gap-2">
              {stages.map((stage, index) => (
                <li key={stage} className="relative pt-8">
                  <span className={`signal-node ${index === stages.length - 1 ? "signal-node-active" : ""}`} aria-hidden="true" />
                  <span className="font-mono text-[10px] text-text-3">0{index + 1}</span>
                  <span className="mt-1 block text-xs font-medium text-text sm:text-sm">{stage}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-border pt-5 text-sm leading-relaxed text-text-2">
              Start with shared language. Add repeatable delivery. Secure the loop. Operate with evidence.
            </p>
          </motion.div>
        </div>
      </section>

      <div id="learning-paths" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-14">
        <div className="flex flex-col gap-6 border-b border-border pb-9 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Choose a learning path</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text">One map. Three practical journeys.</h2>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search size={17} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-text-3" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, tools, outcomes…"
              aria-label="Search learning topics"
              className="w-full border-b border-border bg-transparent py-3 pl-7 pr-3 text-sm text-text outline-none transition-colors placeholder:text-text-3 focus:border-accent"
            />
          </div>
        </div>

        {visibleCount === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-text">No matching topic yet.</p>
            <p className="mt-2 text-sm text-text-3">Try a broader term such as Sentinel, Git, agent, SOC, or observability.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {LEARNING_PATHS.map((path) => {
              const topics = path.topicSlugs
                .map((slug) => TOPICS.find((topic) => topic.slug === slug))
                .filter((topic) => topic && (!q || matches.has(topic.slug)));
              if (!topics.length) return null;

              return (
                <section key={path.id} className="grid gap-8 py-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
                  <div>
                    <span className="font-mono text-xs text-accent">PATH {path.index}</span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text">{path.name}</h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-text-2">{path.promise}</p>
                    <p className="mt-5 max-w-sm border-l-2 border-cat-teal pl-4 text-sm leading-relaxed text-text-3">Outcome: {path.outcome}</p>
                  </div>

                  <motion.div
                    className="border-t border-border"
                    variants={reduce ? undefined : staggerContainer}
                    initial={reduce ? undefined : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={viewportOnce}
                  >
                    {topics.map((topic) => topic && (
                      <motion.div key={topic.slug} variants={reduce ? undefined : fadeUp}>
                        <Link
                          href={`/topics/${topic.slug}`}
                          className="topic-row group grid gap-4 border-b border-border py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[94px_1fr_auto] sm:items-start"
                        >
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-3">{topic.stage}</span>
                            <span className="mt-1 block text-xs text-text-3">{topic.level}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium tracking-tight text-text transition-colors group-hover:text-accent-2">{topic.title}</h4>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-2">{topic.description}</p>
                            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                              {topic.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="font-mono text-[10px] uppercase tracking-wide text-text-3">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-text-3 transition-colors group-hover:text-accent">
                            <span>{topic.format}</span>
                            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
