import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Boxes,
  Play,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { getTopic } from "@/lib/topics";
import { TopicJsonLd } from "@/components/content/json-ld";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { Toc } from "@/components/content/toc";
import { H2, P, UL } from "@/components/content/prose";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const topic = getTopic("governed-agentic-ai-cybersecurity")!;
const presentationUrl =
  "https://iamkaushiksaha.github.io/governed-cybersecurity-ai-session/series/";
const repositoryUrl =
  "https://github.com/iamkaushiksaha/governed-cybersecurity-ai-session";

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
  keywords: topic.tags,
  openGraph: {
    type: "article",
    title: topic.title,
    description: topic.description,
    url: `/topics/${topic.slug}`,
    publishedTime: topic.date,
    tags: topic.tags,
    images: [`/og/${topic.slug}`],
  },
  twitter: {
    card: "summary_large_image",
    title: topic.title,
    description: topic.description,
    images: [`/og/${topic.slug}`],
  },
  alternates: { canonical: `/topics/${topic.slug}` },
};

const toc = [
  { id: "journey", label: "The four-session journey" },
  { id: "audience", label: "Who it is designed for" },
  { id: "learning-design", label: "How the experience works" },
  { id: "where-it-lives", label: "Repository and hosted URL" },
];

const sessions = [
  {
    number: "01",
    title: "From chat to agentic work",
    outcome: "Recognize when a prompt, project, skill, tool or agent is the right level of capability.",
    icon: Bot,
  },
  {
    number: "02",
    title: "Securing agentic AI",
    outcome: "Map prompt injection, tool misuse, state, identity and egress risks to concrete control layers.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Cyber orchestrator in action",
    outcome: "See specialist skills, deterministic gates, evidence and ArchStudio produce governed delivery packs.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "Build and secure your first agent",
    outcome: "Design a bounded review agent, attack it, evaluate it and decide whether it is ready to ship.",
    icon: Boxes,
  },
];

function JourneyDiagram() {
  return (
    <svg
      viewBox="0 0 920 260"
      role="img"
      aria-labelledby="journey-title journey-desc"
      className="h-auto w-full"
    >
      <title id="journey-title">From a repeated cybersecurity task to governed agentic delivery</title>
      <desc id="journey-desc">
        A four-stage flow through reusable skills, a bounded agent loop, security controls, and measurable delivery evidence.
      </desc>
      <defs>
        <marker id="journey-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" className="fill-text-3" />
        </marker>
      </defs>
      <path d="M150 130H770" className="dg-line dg-flow" markerEnd="url(#journey-arrow)" />
      {[
        [130, "TASK", "Repeated work"],
        [350, "SKILL", "Versioned method"],
        [570, "AGENT", "Bounded loop"],
        [790, "EVIDENCE", "Governed outcome"],
      ].map(([x, label, detail], index) => (
        <g key={String(label)}>
          <circle
            cx={Number(x)}
            cy="130"
            r={index === 3 ? 72 : 60}
            className={index === 3 ? "dg-teal" : index === 2 ? "dg-accent" : "dg-box"}
            strokeWidth="1.5"
          />
          <text x={Number(x)} y="125" textAnchor="middle" className="dg-title">
            {label}
          </text>
          <text x={Number(x)} y="148" textAnchor="middle" className="dg-sub">
            {detail}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Page() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Toc entries={toc} />

      <article className="min-w-0">
        <TopicJsonLd topic={topic} />
        <Reveal>
          <div className="text-[13px] text-text-3">
            <Link href="/" className="hover:text-accent">Home</Link>
            {" / Security architecture"}
          </div>
          <div className="mt-4 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Four visual sessions · cybersecurity-first
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-5xl">
              Governed Agentic AI
              <span className="block text-accent-2">for cybersecurity.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-text-2">
              A practical path from LLM foundations to secure agent design—built for cybersecurity practitioners and leaders, with visual explanations, interactive decisions and a working orchestrator story.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={presentationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5 hover:bg-accent-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Play size={16} fill="currentColor" /> Launch interactive series
            </a>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-text-2 transition-colors hover:border-accent hover:text-text"
            >
              View public repository <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip tone="accent">Agentic AI</Chip>
            <Chip tone="teal">Security architecture</Chip>
            <Chip tone="teal">Skills + MCP</Chip>
            <Chip tone="coral">Prompt injection</Chip>
            <Chip tone="coral">Guardrails</Chip>
          </div>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface-1 px-4 py-5 sm:px-8">
          <JourneyDiagram />
        </Reveal>

        <H2 id="journey">The four-session journey</H2>
        <P>
          The sequence deliberately starts with familiar chat use, adds reusable expertise, introduces controlled action, and only then asks the audience to secure and evaluate an agent. Each session can stand alone, but together they form one adoption story.
        </P>
        <Stagger className="mt-7 border-t border-border">
          {sessions.map(({ number, title, outcome, icon: Icon }) => (
            <StaggerItem key={number} className="grid gap-4 border-b border-border py-6 sm:grid-cols-[52px_1fr_2fr] sm:items-start">
              <div className="font-mono text-xs text-accent">{number}</div>
              <div className="flex items-center gap-2.5 text-base font-medium text-text">
                <Icon size={18} className="shrink-0 text-accent" /> {title}
              </div>
              <p className="text-[15px] leading-relaxed text-text-2">{outcome}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <H2 id="audience">Designed for a mixed cybersecurity audience</H2>
        <P>
          The material assumes security experience, not AI engineering experience. Technical detail is introduced through security decisions: which task to automate, what the agent may access, where authorization belongs, what must be measured, and when a human must remain in control.
        </P>
        <div className="grid gap-7 border-y border-border py-7 sm:grid-cols-2">
          <div>
            <p className="font-medium text-text">For practitioners</p>
            <UL>
              <li>Translate repeated expert work into a reusable skill.</li>
              <li>Choose tools, MCP, retrieval and orchestration intentionally.</li>
              <li>Apply schemas, policy, evidence and adversarial tests.</li>
            </UL>
          </div>
          <div>
            <p className="font-medium text-text">For leaders</p>
            <UL>
              <li>Connect capability to quality, effort and delivery outcomes.</li>
              <li>Separate current implementation from future-state claims.</li>
              <li>Scale agency only when measurement supports the decision.</li>
            </UL>
          </div>
        </div>

        <H2 id="learning-design">How the experience works</H2>
        <P>
          The standalone series contains 74 presentation scenes, progressive reveals, decision tabs, workflow simulations, speaker notes and source drawers. It is optimized for a live one-hour session per module and can also be explored independently in a browser.
        </P>
        <Callout variant="tip" title="Recommended delivery pattern">
          Start with the problem statement, ask the audience to make a choice before revealing the architecture, and use the simulations as discussion prompts—not as claims of production performance. Explainability remains a future clinic rather than expanding this foundation series into full XAI coverage.
        </Callout>

        <H2 id="where-it-lives">Repository and hosted URL</H2>
        <P>
          This learning-hub page is the discovery and context layer. The presentation remains in its own public repository so it has one canonical source, a clean full-screen experience and an independently shareable URL.
        </P>
        <div className="mt-5 divide-y divide-border border-y border-border">
          <div className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
            <span className="font-mono text-xs uppercase tracking-wide text-text-3">Interactive URL</span>
            <a href={presentationUrl} target="_blank" rel="noreferrer" className="break-all text-sm font-medium text-accent hover:text-accent-2">
              {presentationUrl}
            </a>
          </div>
          <div className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
            <span className="font-mono text-xs uppercase tracking-wide text-text-3">Public source</span>
            <a href={repositoryUrl} target="_blank" rel="noreferrer" className="break-all text-sm font-medium text-accent hover:text-accent-2">
              {repositoryUrl}
            </a>
          </div>
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-text">Ready to run the session?</p>
            <p className="mt-1 text-sm text-text-2">Open full screen, use Space to reveal, and press N for speaker notes.</p>
          </div>
          <a
            href={presentationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5 hover:bg-accent-2"
          >
            Launch presentation <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="mt-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2">
            <ArrowLeft size={15} /> Back to all topics
          </Link>
        </div>
      </article>
    </div>
  );
}
