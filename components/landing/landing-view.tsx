"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BrainCircuit, Lock, Radar, ShieldCheck, Workflow } from "lucide-react";
import { GithubMark, LinkedinMark } from "./brand-icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { HUB_URL } from "@/lib/hosts";
import { ThemeToggle } from "@/components/site/theme-toggle";

const LINKEDIN = "https://www.linkedin.com/in/iamkaushiksaha";
const GITHUB = "https://github.com/iamkaushiksaha";

const focus = [
  {
    icon: Radar,
    title: "Detection engineering",
    body: "KQL, MITRE ATT&CK mapping, use-case design and migration, and detection-as-code pipelines that validate a rule before it reaches production.",
  },
  {
    icon: Workflow,
    title: "SOAR automation",
    body: "Logic Apps, Azure Functions and Graph APIs for alert enrichment, identity containment and the ticketing work analysts should not be doing by hand.",
  },
  {
    icon: BrainCircuit,
    title: "Agentic AI for the SOC",
    body: "LangGraph workflows with specialist LLM agents, human approval gates and Langfuse tracing — so AI assists triage and design without acting unchecked.",
  },
  {
    icon: Lock,
    title: "Securing AI systems",
    body: "Prompt-injection boundaries, tool permissions and agent governance, mapped to the OWASP LLM Top 10 and the NIST AI Risk Management Framework.",
  },
];

const work = [
  {
    name: "sentinel-triage-agent",
    status: "Public",
    body: "A LangGraph agent that triages a Microsoft Sentinel incident and stops for human approval before anything is dispatched. Deterministic enrichment and ATT&CK mapping run before any token is spent; incident text is treated as untrusted input. Runs with no API key.",
    stack: ["LangGraph", "Langfuse", "Python", "MITRE ATT&CK"],
    href: "https://github.com/iamkaushiksaha/sentinel-triage-agent",
  },
  {
    name: "Cyber Orchestrator",
    status: "Private",
    body: "A governed multi-agent framework for security delivery: specialist agents for Sentinel design, KQL authoring, architecture review and documentation, run by a workflow engine with approval gates, an append-only audit journal and full LLM observability.",
    stack: ["LangGraph", "Langfuse", "MCP", "FastAPI"],
  },
  {
    name: "Architecture compiler",
    status: "Private",
    body: "A Python engine that turns a schema-validated architecture model into editable enterprise diagrams, with AI generation behind deterministic confidence gates and an independent reviewer agent that cannot approve its own work.",
    stack: ["Python", "JSON Schema", "draw.io", "ADR-governed"],
  },
  {
    name: "azure-security",
    status: "Public",
    body: "A KQL learning path from first query to threat hunt, plus a Sentinel table library with sample logs and MITRE-mapped hunts, built so practitioners can learn the reasoning rather than copy queries.",
    stack: ["KQL", "Microsoft Sentinel", "Labs"],
    href: "https://github.com/iamkaushiksaha/azure-security",
  },
];

const writing = [
  {
    title: "Governed agentic AI for cybersecurity",
    blurb: "Why approval gates, independent review and an audit trail matter more than the prompts.",
    slug: "governed-agentic-ai-cybersecurity",
  },
  {
    title: "Langfuse for cybersecurity: an SOC lens",
    blurb: "What to trace in a security workflow, and what must never be logged.",
    slug: "langfuse-for-cybersecurity",
  },
  {
    title: "Detection-as-Code: the pipeline & governance",
    blurb: "Version-controlled detections, validation gates and the review model around them.",
    slug: "detection-as-code-cicd",
  },
  {
    title: "Validating Sentinel detections in CI/CD",
    blurb: "Catching a broken analytic rule before it reaches the production workspace.",
    slug: "validating-sentinel-detections",
  },
];

const credentials = [
  { label: "Microsoft Cybersecurity Architect Expert", value: "SC-100" },
  { label: "Azure Security Engineer Associate", value: "AZ-500" },
  { label: "Years in cybersecurity", value: "12" },
];

export function LandingView() {
  const reduce = useReducedMotion();
  const anim = (variants = fadeUp) => (reduce ? {} : { variants });

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-15 max-w-5xl items-center gap-4 px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5 font-medium text-text">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-[13px] font-semibold text-accent-contrast">
              KS
            </span>
            <span className="tracking-tight">Kaushik Saha</span>
          </Link>
          <div className="flex-1" />
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm text-text-2 sm:flex">
            <a href="#work" className="transition-colors hover:text-text">Work</a>
            <a href="#writing" className="transition-colors hover:text-text">Writing</a>
            <a href={HUB_URL} className="transition-colors hover:text-text">Research hub ↗</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden pb-24">
        {/* ---------- hero ---------- */}
        <section className="relative border-b border-border px-6 pb-20 pt-20 sm:pt-28">
          <div className="learning-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl">
            <p className="rise flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cat-teal">
              <ShieldCheck size={15} /> Cloud security architect · Kolkata, India
            </p>

            <h1 className="rise rise-1 mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-text sm:text-7xl">
              Kaushik Saha
              <span className="mt-3 block text-accent-2">
                Security that holds when AI joins the SOC.
              </span>
            </h1>

            <p className="rise rise-2 mt-7 max-w-2xl text-lg leading-relaxed text-text-2">
              Twelve years in cybersecurity, from SOC analyst to architect. I design
              Microsoft Sentinel, Defender XDR and SOAR solutions for enterprise
              clients, and I build governed agentic AI — systems where models draft and
              people decide, with every step on the record.
            </p>

            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
              <a
                href={HUB_URL}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
              >
                Read the research hub <ArrowUpRight size={16} />
              </a>
              <a
                href={GITHUB}
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
              >
                <GithubMark size={15} /> GitHub
              </a>
              <a
                href={LINKEDIN}
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
              >
                <LinkedinMark size={15} /> LinkedIn
              </a>
            </div>

            <dl className="rise rise-4 mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-3">
              {credentials.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-2xl font-semibold tracking-tight text-text">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-text-3">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- what I work on ---------- */}
        <section className="mx-auto max-w-5xl px-6 pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">What I work on</p>
          <motion.div
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={reduce ? undefined : staggerContainer}
            className="mt-7 grid gap-4 sm:grid-cols-2"
          >
            {focus.map((item) => (
              <motion.article
                key={item.title}
                {...anim()}
                className="rounded-2xl border border-border bg-surface-1 p-6"
              >
                <item.icon size={18} className="text-accent-2" aria-hidden="true" />
                <h2 className="mt-4 text-base font-medium tracking-tight text-text">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-2">{item.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ---------- selected work ---------- */}
        <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16">
          <div className="flex flex-col gap-2 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Selected work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-text">
                Built, tested, and honest about its limits
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-3">
              Some of this runs in private repositories. Happy to walk through the design
              in a conversation.
            </p>
          </div>

          <motion.div
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={reduce ? undefined : staggerContainer}
            className="mt-8 grid gap-4 lg:grid-cols-2"
          >
            {work.map((item) => (
              <motion.article
                key={item.name}
                {...anim()}
                className="flex flex-col rounded-2xl border border-border bg-surface-1 p-6"
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-mono text-sm font-medium tracking-tight text-text">{item.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      item.status === "Public"
                        ? "bg-cat-teal-bg text-cat-teal"
                        : "bg-surface-2 text-text-3"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-2">{item.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-text-3"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-opacity hover:opacity-80"
                  >
                    View the repository <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ---------- writing ---------- */}
        <section id="writing" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16">
          <div className="flex flex-col gap-2 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Writing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-text">
                Notes from the work
              </h2>
            </div>
            <a
              href={HUB_URL}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-opacity hover:opacity-80"
            >
              All topics on the research hub <ArrowUpRight size={14} />
            </a>
          </div>

          <motion.ul
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={reduce ? undefined : staggerContainer}
            className="mt-6 divide-y divide-border border-b border-border"
          >
            {writing.map((item) => (
              <motion.li key={item.slug} {...anim()}>
                <a
                  href={`${HUB_URL}/topics/${item.slug}`}
                  className="group flex items-start justify-between gap-6 py-5 transition-colors hover:bg-surface-1/60"
                >
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-text">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-2">{item.blurb}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-text-3 transition-colors group-hover:text-accent-2"
                    aria-hidden="true"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* ---------- contact ---------- */}
        <section className="mx-auto mt-20 max-w-5xl px-6">
          <div className="rounded-2xl border border-border bg-surface-1 p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
              Open to conversations about security architecture and AI in the SOC
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-2">
              Detection engineering, Sentinel and Defender delivery, or how to put
              guardrails around agents that touch production. LinkedIn is the quickest
              way to reach me.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={LINKEDIN}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
              >
                <LinkedinMark size={15} /> Connect on LinkedIn
              </a>
              <a
                href={GITHUB}
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
              >
                <GithubMark size={15} /> See the code
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-sm text-text-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Kaushik Saha · Cloud security architecture and agentic AI</span>
          <a href={HUB_URL} className="transition-colors hover:text-text">
            Research hub ↗
          </a>
        </div>
      </footer>
    </>
  );
}
