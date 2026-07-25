"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Braces,
  Database,
  FileText,
  Goal,
  Hand,
  MemoryStick,
  MessageSquareText,
  MousePointerClick,
  Network,
  Search,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { Topic } from "@/lib/topics";
import { easeOutQuint, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const eras = [
  {
    year: "1950s",
    short: "RULES",
    title: "Artificial Intelligence",
    description:
      'Humans hand-write every rule: “if X, then Y.” Useful in a narrow lane, but brittle when the unexpected arrives.',
    example:
      "A chess program follows rules written by experts: if the board looks like this, choose one of these moves.",
    limitation:
      "It cannot learn a new pattern unless a human adds another rule.",
    unlocks:
      "Machine learning replaces thousands of hand-written rules with patterns learned from examples.",
  },
  {
    year: "1980s–90s",
    short: "LEARN",
    title: "Machine Learning",
    description:
      "Feed the machine data plus answers and it learns the rules itself instead of relying on a complete human-authored rulebook.",
    example:
      "A spam filter learns from messages labelled “spam” and “not spam,” then predicts the label for a new email.",
    limitation:
      "People still decide which useful features to give the model, and it needs good training data.",
    unlocks:
      "Deep learning learns useful features automatically from much larger datasets.",
  },
  {
    year: "2012+",
    short: "FEATURES",
    title: "Deep Learning",
    description:
      "Many-layered neural networks learn useful features directly from raw data and make perception tasks practical at scale.",
    example:
      "An image model learns edges, shapes, and faces directly from pixels instead of receiving a human-written checklist.",
    limitation:
      "Training needs large datasets, significant computing power, and careful evaluation.",
    unlocks:
      "Transformers make it practical to learn relationships across long sequences such as language.",
  },
  {
    year: "2017",
    short: "ATTEND",
    title: "Transformer architecture",
    description:
      "Attention lets a model weigh every token against the others, unlocking parallel training and the modern language-model era.",
    example:
      "In “the bank beside the river,” attention helps the model connect “bank” with “river” and choose the correct meaning.",
    limitation:
      "A transformer is an architecture—not automatically a chatbot, an agent, or a source of reliable facts.",
    unlocks:
      "Training transformers on enormous text collections produces general-purpose language models.",
  },
  {
    year: "2020+",
    short: "GENERATE",
    title: "LLMs & Generative AI",
    description:
      "Next-token prediction at scale becomes an engine for writing, coding, synthesis, and increasingly capable reasoning.",
    example:
      "A language model can explain a policy, draft code, or summarize a document from the prompt and context it receives.",
    limitation:
      "On its own it has no hands, no durable goal, and no guaranteed access to current or private information.",
    unlocks:
      "Tools, memory, instructions, and a reasoning loop turn the model into an agentic system.",
  },
  {
    year: "NOW",
    short: "ACT",
    title: "Agentic AI",
    description:
      "The model gains goals, tools, memory, and a loop that lets it plan, act, observe, and continue until the goal is met.",
    example:
      "A support agent can read a ticket, search the knowledge base, draft a reply, verify policy, and ask for approval.",
    limitation:
      "Autonomy adds risk: every action needs permissions, boundaries, observability, and a clear stopping condition.",
    unlocks:
      "When one task cleanly separates into specialist roles, an orchestrator can coordinate several agents.",
  },
];

const anatomy: Array<{
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    label: "Brain",
    title: "LLM",
    description: "Language, reasoning, and planning. It decides what should happen next.",
    icon: BrainCircuit,
  },
  {
    label: "Hands",
    title: "Tools",
    description: "APIs, search, code, and databases. They let the system affect the world.",
    icon: Hand,
  },
  {
    label: "Notebook",
    title: "Memory",
    description: "Conversation context plus durable state the agent can read and update.",
    icon: MemoryStick,
  },
  {
    label: "Purpose",
    title: "Goal + instructions",
    description: "The objective, constraints, and operating rules that shape every action.",
    icon: Goal,
  },
];

const ingestion = [
  ["A1", "Your documents", "PDFs, wikis, policies, and tickets"],
  ["A2", "Chunking", "Split knowledge into overlapping passages"],
  ["A3", "Embedding model", "Convert every chunk into a meaning vector"],
  ["A4", "Cosmos DB", "Store chunks + vectors for similarity search"],
];

const query = [
  ["B1", "User question", "A live information need arrives"],
  ["B2", "Embed the question", "Use the same embedding model"],
  ["B3", "Similarity search", "Retrieve the closest Cosmos DB chunks"],
  ["B4", "Augmented prompt", "Combine the question and retrieved context"],
  ["B5", "Agent / LLM", "Reason over grounded context; use tools if needed"],
  ["B6", "Reply with evidence", "Return the answer with source citations"],
];

const stations = [
  ["01", "Evolution", "evolution"],
  ["02", "Terms", "terminology"],
  ["03", "Agent", "agent"],
  ["04", "Multi-agent", "multi-agent"],
  ["05", "RAG", "rag"],
];

function SectionIntro({
  number,
  eyebrow,
  title,
  copy,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="relative">
      <div className="absolute -left-[51px] top-0 hidden h-9 w-9 place-items-center rounded-full border border-[var(--atlas-cyan)] bg-bg font-mono text-[10px] text-[var(--atlas-cyan)] md:grid">
        {number}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.19em] text-[var(--atlas-cyan)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-text sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 sm:text-lg">
        {copy}
      </p>
    </div>
  );
}

function FlowLane({
  label,
  detail,
  steps,
  amber = false,
}: {
  label: string;
  detail: string;
  steps: string[][];
  amber?: boolean;
}) {
  return (
    <div className="min-w-0 border-t border-border pt-5">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3
          className={`font-mono text-[11px] uppercase tracking-[0.17em] ${
            amber ? "text-[var(--atlas-amber)]" : "text-[var(--atlas-cyan)]"
          }`}
        >
          {label}
        </h3>
        <span className="text-xs text-text-3">{detail}</span>
      </div>
      <div>
        {steps.map(([code, title, description], index) => (
          <div key={code}>
            <motion.div
              whileHover={{ x: 4 }}
              className={`group grid grid-cols-[42px_1fr] gap-3 rounded-lg border px-4 py-3 transition-colors ${
                title === "Cosmos DB" || title === "Similarity search"
                  ? "border-[var(--atlas-cyan)]/60 bg-[color-mix(in_srgb,var(--atlas-cyan)_7%,transparent)]"
                  : amber
                    ? "border-[var(--atlas-amber)]/30 bg-[color-mix(in_srgb,var(--atlas-amber)_4%,transparent)] hover:border-[var(--atlas-amber)]/60"
                    : "border-border bg-surface-1/60 hover:border-[var(--atlas-cyan)]/50"
              }`}
            >
              <span
                className={`font-mono text-[11px] ${
                  amber ? "text-[var(--atlas-amber)]" : "text-[var(--atlas-cyan)]"
                }`}
              >
                {code}
              </span>
              <span>
                <strong className="block text-sm font-medium text-text">{title}</strong>
                <span className="mt-0.5 block text-xs leading-relaxed text-text-3">
                  {description}
                </span>
              </span>
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`mx-auto h-5 w-px ${
                  amber ? "agent-flow-rail agent-flow-rail-amber" : "agent-flow-rail"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentScaleDiagram({ reduce }: { reduce: boolean | null }) {
  const levels = [
    {
      label: "01 · model",
      title: "LLM",
      icon: MessageSquareText,
      summary: "Answers one prompt",
      details: ["Receives context", "Generates text", "Stops after the response"],
      example: "“Draft a reply to this ticket.”",
    },
    {
      label: "02 · system",
      title: "Single agent",
      icon: Workflow,
      summary: "Owns one goal",
      details: ["Plans next steps", "Uses tools + memory", "Observes and repeats"],
      example: "Resolve this ticket within policy.",
    },
    {
      label: "03 · team",
      title: "Multi-agent system",
      icon: Users,
      summary: "Divides a larger goal",
      details: ["Orchestrator routes work", "Specialists exchange results", "Coordination adds overhead"],
      example: "Research, implement, and review a solution.",
    },
  ];

  return (
    <figure className="mt-10">
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--atlas-cyan)]">
            Difference at a glance
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
            Same reasoning core. More system around it.
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-text-3">
          Move from left to right as the task needs more autonomy—not because
          “more agents” is automatically better.
        </p>
      </div>
      <div className="relative grid gap-4 lg:grid-cols-3">
        <div className="agent-signal-line absolute left-[12%] right-[12%] top-[57px] hidden h-px lg:block" aria-hidden="true" />
        {levels.map(({ label, title, icon: Icon, summary, details, example }, index) => (
          <motion.div
            key={title}
            whileHover={reduce ? undefined : { y: -4 }}
            className={`relative z-10 rounded-xl border bg-bg p-5 ${
              index === 1
                ? "border-[var(--atlas-cyan)]/75"
                : index === 2
                  ? "border-[var(--atlas-amber)]/65"
                  : "border-border-strong"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                index === 2 ? "text-[var(--atlas-amber)]" : "text-[var(--atlas-cyan)]"
              }`}>
                {label}
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface-1">
                <Icon size={17} className="text-text-2" aria-hidden="true" />
              </span>
            </div>
            <h4 className="mt-5 text-2xl font-semibold tracking-tight text-text">{title}</h4>
            <p className="mt-1 text-sm font-medium text-text-2">{summary}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-4">
              {details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm leading-relaxed text-text-3">
                  <span className={index === 2 ? "text-[var(--atlas-amber)]" : "text-[var(--atlas-cyan)]"}>→</span>
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg bg-surface-1 px-3.5 py-3 text-xs leading-relaxed text-text-2">
              <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.12em] text-text-3">
                Example
              </span>
              {example}
            </div>
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-text-3">
        An LLM is a component. An agent is a system built around that component.
        A multi-agent system coordinates several such systems.
      </figcaption>
    </figure>
  );
}

export function AgenticAiFieldMap({ topic }: { topic: Topic }) {
  const [activeEra, setActiveEra] = useState(0);
  const reduce = useReducedMotion();

  return (
    <main className="overflow-hidden">
      <section className="agent-map-grid relative min-h-[calc(100svh-64px)] border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,color-mix(in_srgb,var(--atlas-cyan)_13%,transparent),transparent_28%),radial-gradient(circle_at_76%_46%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_46%)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1440px] items-center gap-12 px-6 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            className="relative z-10 max-w-2xl"
          >
            <motion.div variants={reduce ? undefined : fadeUp} className="text-[13px] text-text-3">
              <Link href="/" className="transition-colors hover:text-[var(--atlas-cyan)]">
                Learning Atlas
              </Link>
              {" / AI & agentic systems"}
            </motion.div>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--atlas-cyan)]"
            >
              Field map · schematic 01–05
            </motion.p>
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-4 text-[clamp(3.2rem,6vw,6.25rem)] font-semibold leading-[0.91] tracking-[-0.06em] text-text"
            >
              From machine
              <br />
              learning to{" "}
              <span className="text-[var(--atlas-cyan)]">agentic AI.</span>
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-7 max-w-xl text-lg leading-relaxed text-text-2"
            >
              One continuous signal path: how rules became learning, learning
              became language models, and language models gained the ability to
              plan, use tools, remember, and act.
            </motion.p>
            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#evolution"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--atlas-cyan)] px-5 text-sm font-semibold text-[#071116] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atlas-cyan)]"
              >
                Follow the signal <ArrowDown size={15} aria-hidden="true" />
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
                {topic.readingMinutes} min · foundation
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: easeOutQuint }}
            className="relative mx-auto aspect-square w-full max-w-[610px]"
            aria-label="Animated path from machine learning through language models to autonomous agents"
          >
            <div className="absolute inset-[11%] rounded-full border border-dashed border-[var(--atlas-cyan)]/20" />
            <div className="absolute inset-[24%] rounded-full border border-dashed border-accent/25" />
            <motion.div
              className="absolute inset-[35%] grid place-items-center rounded-full border border-[var(--atlas-cyan)]/70 bg-bg/80 backdrop-blur-xl"
              animate={reduce ? undefined : { boxShadow: [
                "0 0 0 0 rgba(99,211,228,0)",
                "0 0 0 16px rgba(99,211,228,0.07)",
                "0 0 0 0 rgba(99,211,228,0)",
              ] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-center">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--atlas-cyan)]">
                  reasoning core
                </span>
                <strong className="mt-1 block text-xl font-semibold text-text">AGENT</strong>
              </span>
            </motion.div>
            {[
              ["LEARN", "ML", "left-[2%] top-[47%]"],
              ["REPRESENT", "NN", "left-[19%] top-[11%]"],
              ["GENERATE", "LLM", "right-[18%] top-[11%]"],
              ["ACT", "TOOLS", "right-[0%] top-[47%]"],
              ["RETRIEVE", "RAG", "left-[42%] bottom-[0%]"],
            ].map(([label, code, position], index) => (
              <motion.div
                key={label}
                className={`absolute ${position} w-[112px] -translate-x-1/2 rounded-lg border border-border-strong bg-surface-1/85 px-3 py-2.5 backdrop-blur-lg`}
                animate={reduce ? undefined : { y: [0, index % 2 ? -5 : 5, 0] }}
                transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="block font-mono text-[8px] tracking-[0.16em] text-text-3">
                  {label}
                </span>
                <strong className="mt-0.5 block text-xs font-medium text-text">{code}</strong>
              </motion.div>
            ))}
            <div className="agent-signal-line absolute left-[10%] right-[10%] top-1/2 h-px opacity-75" />
            <div className="agent-signal-spine absolute bottom-[9%] left-1/2 top-[9%] w-px opacity-45" />
          </motion.div>
        </div>
      </section>

      <nav className="sticky top-16 z-40 overflow-x-auto border-b border-border bg-bg/88 backdrop-blur-xl" aria-label="Topic stations">
        <div className="mx-auto flex w-max min-w-full max-w-6xl px-6">
          {stations.map(([number, label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="group flex min-w-[132px] items-center gap-2 border-r border-border px-4 py-3 text-xs text-text-3 transition-colors first:border-l hover:text-text"
            >
              <span className="font-mono text-[9px] text-[var(--atlas-cyan)]">{number}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="agent-signal-spine absolute bottom-24 left-[29px] top-20 hidden w-px opacity-35 md:block" aria-hidden="true" />

        <motion.section
          id="evolution"
          className="scroll-mt-32 py-24 md:pl-14"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <SectionIntro
            number="01"
            eyebrow="The evolution"
            title="Every era still lives inside the next."
            copy="Agentic AI is not a separate universe. It is the current layer in a stack that begins with rules and compounds through learned representations, attention, and generative models."
          />
          <div className="mt-12">
            <div className="mb-5 flex flex-col justify-between gap-3 border-y border-border py-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--atlas-cyan)]/60 bg-[color-mix(in_srgb,var(--atlas-cyan)_7%,transparent)]">
                  <MousePointerClick size={16} className="text-[var(--atlas-cyan)]" aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-sm font-medium text-text">
                    Choose an era to explore
                  </strong>
                  <span className="block text-xs text-text-3">
                    Click or tap any step. Swipe the row on mobile; the explanation below will update.
                  </span>
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
                Step {activeEra + 1} of {eras.length}
              </span>
            </div>
            <div className="relative grid snap-x grid-flow-col auto-cols-[82%] gap-3 overflow-x-auto pb-3 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
              {eras.map((era, index) => (
                <button
                  key={era.year}
                  type="button"
                  onClick={() => setActiveEra(index)}
                  aria-pressed={activeEra === index}
                  aria-controls="era-explanation"
                  className={`group relative z-10 min-h-[132px] snap-start rounded-xl border bg-bg p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--atlas-cyan)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atlas-cyan)] ${
                    activeEra === index
                      ? "border-[var(--atlas-cyan)] shadow-[inset_0_0_0_1px_var(--atlas-cyan)]"
                      : "border-border"
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[9px] ${
                        activeEra === index
                          ? "agent-pulse border-[var(--atlas-cyan)] bg-[var(--atlas-cyan)] text-[#071116]"
                          : "border-border-strong bg-surface-1 text-text-3"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight
                      size={15}
                      className={`mt-1 transition-transform group-hover:translate-x-1 ${
                        activeEra === index ? "text-[var(--atlas-cyan)]" : "text-text-3"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--atlas-cyan)]">
                    {era.year} · {era.short}
                  </span>
                  <span className="mt-1.5 block text-base font-medium leading-snug text-text">
                    {era.title}
                  </span>
                </button>
              ))}
            </div>
            <div
              id="era-explanation"
              className="mt-6 min-h-[350px] rounded-2xl border border-border bg-surface-1/45 p-6 sm:p-8"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra}
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="grid gap-7 lg:grid-cols-[180px_1fr]"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-cyan)]">
                      Era {String(activeEra + 1).padStart(2, "0")} · {eras[activeEra].year}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-3">
                      What changed at this step—and why the next step became necessary.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                      {eras[activeEra].title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-2 sm:text-lg">
                      {eras[activeEra].description}
                    </p>
                    <div className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                      {[
                        ["Simple example", eras[activeEra].example],
                        ["Main limitation", eras[activeEra].limitation],
                        ["What it unlocked", eras[activeEra].unlocks],
                      ].map(([label, value], index) => (
                        <div
                          key={label}
                          className={index === 2 ? "sm:col-span-2" : ""}
                        >
                          <p className={`font-mono text-[9px] uppercase tracking-[0.15em] ${
                            label === "Main limitation"
                              ? "text-[var(--atlas-amber)]"
                              : "text-[var(--atlas-cyan)]"
                          }`}>
                            {label}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-text-2">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="terminology"
          className="scroll-mt-32 border-t border-border py-24 md:pl-14"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <SectionIntro
            number="02"
            eyebrow="Terminology"
            title="What contains what—and what acts."
            copy="The terms become easier when you separate the nested technology stack from the behaviour a system exhibits."
          />
          <div className="mt-8 border-l-2 border-[var(--atlas-mint)] py-2 pl-5">
            <p className="text-sm leading-relaxed text-text-2">
              <strong className="text-[var(--atlas-mint)]">Beginner anchor:</strong>{" "}
              an LLM is a <em>model</em>. An agent is a <em>system</em> that
              surrounds a model with goals, tools, memory, and control logic.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-dashed border-[var(--atlas-cyan)]/35 p-4">
              {[
                ["Artificial intelligence", "Any machine that mimics intelligent behaviour"],
                ["Machine learning", "Learns patterns instead of relying only on hand-written rules"],
                ["Deep learning · neural networks", "Layered representation learning"],
                ["Generative AI", "Creates text, images, code, audio, and other content"],
                ["LLM / SLM", "Transformer language models at large or compact scale"],
              ].map(([label, detail], index) => (
                <div
                  key={label}
                  className={`rounded-xl border p-4 ${
                    index === 4
                      ? "border-[var(--atlas-amber)] bg-[color-mix(in_srgb,var(--atlas-amber)_5%,transparent)]"
                      : "mt-3 border-dashed border-border-strong bg-surface-1/55"
                  }`}
                >
                  <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                    index === 4 ? "text-[var(--atlas-amber)]" : "text-[var(--atlas-cyan)]"
                  }`}>
                    {label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-3">{detail}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                ["Neural network ≠ natural language", "A neural network is the architecture. NLP is the field of making machines work with human language. LLMs apply neural networks to NLP."],
                ["SLM = Small Language Model", "The transformer idea at a smaller scale: cheaper, faster, and often suitable for a laptop, phone, or tightly scoped task."],
                ["Generative creates. Agentic acts.", "Discriminative AI classifies; generative AI creates; agentic AI uses a loop and tools to pursue a goal."],
              ].map(([title, description]) => (
                <div key={title} className="border-l-2 border-[var(--atlas-amber)] py-2 pl-5">
                  <h3 className="text-base font-medium text-[var(--atlas-amber)]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-2">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="agent"
          className="scroll-mt-32 border-t border-border py-24 md:pl-14"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <SectionIntro
            number="03"
            eyebrow="LLM → agent"
            title="A model becomes an agent when it gains a loop."
            copy="An LLM can suggest what to do. An agent can continue the job: decide a next step, call an allowed tool, inspect the result, and repeat under clear controls."
          />
          <AgentScaleDiagram reduce={reduce} />
          <div className="mt-14 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--atlas-cyan)]">
              Inside one agent
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
              Four parts plus one repeating loop
            </h3>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {anatomy.map(({ label, title, description, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={reduce ? undefined : { backgroundColor: "var(--surface-2)" }}
                className="bg-bg p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--atlas-cyan)]">
                    {label}
                  </span>
                  <Icon size={18} className="text-text-3" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-text">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-2">{description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-[var(--atlas-amber)]/60 bg-[color-mix(in_srgb,var(--atlas-amber)_5%,transparent)] px-5 py-6 sm:px-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--atlas-amber)]">
              The missing piece in most definitions
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["Plan", "Act", "Observe", "Repeat until goal met"].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-[var(--atlas-amber)]/65 px-4 py-2 font-mono text-xs text-[var(--atlas-amber)]">
                    {step}
                  </span>
                  {index < 3 && <span className="text-text-3">→</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 border-l-2 border-[var(--atlas-mint)] py-2 pl-5 text-sm leading-relaxed text-text-2">
            <strong className="text-[var(--atlas-mint)]">Definition repaired:</strong>{" "}
            LLM + tools + storage describes the parts. Autonomy plus the
            plan → act → observe cycle describes the agent.
          </div>
        </motion.section>

        <motion.section
          id="multi-agent"
          className="scroll-mt-32 border-t border-border py-24 md:pl-14"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <SectionIntro
            number="04"
            eyebrow="Multi-agent systems"
            title="Specialists coordinate through an orchestrator."
            copy="A multi-agent system is not a more intelligent model. It is a coordination pattern: one agent breaks down the work, specialists handle separate parts, and their results are combined."
          />
          <div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-[44px_1fr]">
            <Users size={22} className="text-[var(--atlas-amber)]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-text-2">
              <strong className="text-text">Beginner rule:</strong> start with one
              agent. Add multiple agents only when the work genuinely separates
              into roles—for example research, implementation, and review.
              Coordination itself costs time and creates new failure points.
            </p>
          </div>
          <div className="mt-14">
            <div className="mx-auto max-w-sm rounded-xl border border-[var(--atlas-cyan)]/70 bg-surface-1 px-5 py-4 text-center">
              <Network className="mx-auto text-[var(--atlas-cyan)]" size={20} aria-hidden="true" />
              <h3 className="mt-2 text-base font-semibold text-text">Orchestrator agent</h3>
              <p className="mt-1 text-xs text-text-3">decompose · route · merge · verify</p>
            </div>
            <div className="agent-flow-rail mx-auto h-8 w-px" aria-hidden="true" />
            <div className="grid gap-3 md:grid-cols-3">
              {[
                [Search, "Researcher", "Searches, retrieves, and builds grounded context"],
                [Braces, "Coder", "Writes, runs, and revises executable work"],
                [Sparkles, "Reviewer", "Checks quality, policy, and completeness"],
              ].map(([Icon, title, description]) => {
                const WorkerIcon = Icon as LucideIcon;
                return (
                  <motion.div
                    key={title as string}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="rounded-xl border border-border bg-surface-1 p-5 text-center"
                  >
                    <WorkerIcon className="mx-auto text-text-3" size={18} aria-hidden="true" />
                    <h3 className="mt-3 text-base font-medium text-text">{title as string}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-text-3">{description as string}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg border border-dashed border-[var(--atlas-amber)]/65 px-5 py-4 text-center font-mono text-[11px] leading-relaxed text-[var(--atlas-amber)]">
              ⇄ STRUCTURED MESSAGES + SHARED STATE + SHARED MEMORY
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["MCP · agent ↔ tools & data", "A2A · agent ↔ agent", "LangGraph", "CrewAI", "AutoGen"].map((item) => (
                <span key={item} className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-text-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="rag"
          className="scroll-mt-32 border-t border-border py-24 md:pl-14"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <SectionIntro
            number="05"
            eyebrow="RAG end to end"
            title="Cosmos DB is the knowledge shelf—not the answer engine."
            copy="RAG has two lanes. Ingestion prepares your enterprise knowledge once. Query-time retrieval runs for every question before the LLM produces an answer."
          />
          <div className="mt-8 grid gap-4 rounded-xl border border-[var(--atlas-cyan)]/45 bg-[color-mix(in_srgb,var(--atlas-cyan)_5%,transparent)] p-5 sm:grid-cols-[44px_1fr]">
            <FileText size={22} className="text-[var(--atlas-cyan)]" aria-hidden="true" />
            <div>
              <h3 className="text-base font-medium text-text">
                Think of RAG as an open-book exam
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-2">
                The model is not retrained for every question. The system first
                finds the most relevant pages from your knowledge base, places
                those pages beside the question, and then asks the model to
                answer from that evidence.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <FlowLane label="Lane A · ingestion" detail="offline / done once" steps={ingestion} />
            <FlowLane label="Lane B · query" detail="live / every request" steps={query} amber />
          </div>
          <div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-[44px_1fr]">
            <Database size={24} className="text-[var(--atlas-cyan)]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-text-2">
              <strong className="text-text">The flow correction:</strong> embedding
              happens twice—once for stored chunks and once for each question.
              Retrieval happens before the LLM call. Cosmos DB supplies relevant
              evidence at B3; the agent reasons over that evidence at B5.
            </p>
          </div>
        </motion.section>

        <footer className="border-t border-border py-10 md:ml-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-cyan)]">
                Schematic end
              </p>
              <p className="mt-2 text-sm text-text-3">
                ML → neural networks → transformers → LLM → agent → multi-agent → RAG
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-2 transition-colors hover:text-[var(--atlas-cyan)]"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to all topics
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
