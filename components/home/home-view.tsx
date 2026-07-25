"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Search, Sparkles } from "lucide-react";
import { CATEGORIES, TOPICS } from "@/lib/topics";
import { TopicCard } from "@/components/content/topic-card";
import { KnowledgeField } from "@/components/home/knowledge-field";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type FilterId = "all" | "featured" | "labs" | "foundation";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All topics" },
  { id: "featured", label: "Featured" },
  { id: "labs", label: "Has lab" },
  { id: "foundation", label: "Foundational" },
];

export function HomeView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const reduce = useReducedMotion();

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      TOPICS.filter((topic) => {
        const matchesQuery =
          !q ||
          `${topic.title} ${topic.description} ${topic.outcome} ${topic.tags.join(" ")} ${topic.concepts.join(" ")}`
            .toLowerCase()
            .includes(q);
        const matchesFilter =
          filter === "all" ||
          (filter === "featured" && topic.featured) ||
          (filter === "labs" && topic.examples) ||
          (filter === "foundation" && topic.difficulty === "foundation");
        return matchesQuery && matchesFilter;
      }),
    [filter, q],
  );

  const featuredSeries = TOPICS.filter((topic) => topic.seriesId === "detection-as-code");

  return (
    <main className="overflow-hidden">
      <section className="atlas-hero atlas-grid relative min-h-[calc(100svh-64px)] border-b border-border">
        <div className="pointer-events-none absolute inset-0 atlas-hero-glow" />
        <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1440px] items-center gap-8 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={reduce ? undefined : staggerContainer}
            className="relative z-10 max-w-2xl"
          >
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent"
            >
              Kaushik Saha / visual research system
            </motion.p>
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="text-[clamp(4rem,6.2vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-text"
            >
              Learning
              <br />
              Atlas.
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-6 max-w-xl text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl"
            >
              See the system.{" "}
              <span className="text-text-2">Understand the decision.</span> Run
              the example.
            </motion.p>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-4 max-w-lg text-base leading-relaxed text-text-2"
            >
              Understand the decision behind security, delivery, Git, and architecture—each topic connected to evidence, code, and a runnable path.
            </motion.p>
            <motion.div variants={reduce ? undefined : fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#explore"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-text px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Explore the atlas <ArrowDown size={15} aria-hidden="true" />
              </Link>
              <Link
                href="#series"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong bg-bg/45 px-5 text-sm font-medium text-text backdrop-blur-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Open a learning path <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <KnowledgeField />
          </motion.div>
        </div>
      </section>

      <section id="series" className="border-b border-border bg-surface-1/35">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Featured path / 01
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Detection-as-Code for Sentinel
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-2">
              Follow an analytic rule from idea to production, then place the right validation gate before it can cause harm.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
              <Sparkles size={13} className="text-accent" aria-hidden="true" />
              Architecture + validation + runnable lab
            </div>
          </div>
          <div className="border-t border-border">
            {featuredSeries.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group grid gap-3 border-b border-border py-5 transition-colors hover:border-border-strong sm:grid-cols-[56px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-xs text-accent">0{topic.part}</span>
                <span>
                  <span className="block text-base font-medium text-text group-hover:text-accent">
                    {topic.title}
                  </span>
                  <span className="mt-1 block text-sm text-text-3">{topic.outcome}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-text-3">
                  {topic.readingMinutes} min <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Explore / connected research
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Start with a system,
            <br />
            not a category.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-2">
            Search by tool, failure, concept, or outcome. Every topic exposes its architecture before asking you to read the details.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search topics, tags, concepts, and outcomes</span>
            <Search
              size={17}
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-text-3"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a tool, failure, concept, or outcome…"
              className="w-full border-0 bg-transparent py-3 pl-7 pr-4 text-[15px] text-text outline-none placeholder:text-text-3 focus:ring-0"
            />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filter topics">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  filter === item.id
                    ? "bg-text text-bg"
                    : "bg-surface-2 text-text-2 hover:text-text"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-3" aria-live="polite">
          {filtered.length} result{filtered.length === 1 ? "" : "s"} / {filter}
        </p>

        <div className="mt-10 space-y-16">
          {CATEGORIES.map((category) => {
            const topics = filtered.filter((topic) => topic.category === category.id);
            if (topics.length === 0) return null;
            return (
              <section key={category.id}>
                <div className="mb-6 flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-end">
                  <h3 className="text-xl font-medium tracking-tight text-text">{category.name}</h3>
                  <p className="text-sm text-text-3">{category.blurb}</p>
                </div>
                <motion.div
                  className="grid gap-6 md:grid-cols-2"
                  variants={reduce ? undefined : staggerContainer}
                  initial={reduce ? undefined : "hidden"}
                  whileInView={reduce ? undefined : "show"}
                  viewport={viewportOnce}
                >
                  {topics.map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
                </motion.div>
              </section>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-14 border-y border-dashed border-border py-16 text-center">
            <p className="text-base text-text">No connected topic yet.</p>
            <p className="mt-1 text-sm text-text-3">Try a broader concept or reset the active filter.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-5 text-sm font-medium text-accent hover:text-accent-2"
            >
              Reset discovery
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
