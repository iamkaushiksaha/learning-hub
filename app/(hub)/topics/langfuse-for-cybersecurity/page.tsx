import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Crosshair,
  Gauge,
  ScanSearch,
  ShieldAlert,
} from "lucide-react";
import { getTopic } from "@/lib/topics";
import { TopicJsonLd } from "@/components/content/json-ld";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { Toc } from "@/components/content/toc";
import { H2, P, Table, TD, TH, UL } from "@/components/content/prose";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LangfuseArchitectureDiagram, TelemetrySplitDiagram } from "@/components/content/langfuse-diagrams";

const topic = getTopic("langfuse-for-cybersecurity")!;

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
  twitter: { card: "summary_large_image", title: topic.title, description: topic.description, images: [`/og/${topic.slug}`] },
  alternates: { canonical: `/topics/${topic.slug}` },
};

const toc = [
  { id: "decision", label: "The decision" },
  { id: "what", label: "What Langfuse is" },
  { id: "architecture", label: "How it is built" },
  { id: "data-model", label: "The operating model" },
  { id: "soc", label: "SOC use cases" },
  { id: "comparison", label: "Langfuse vs SIEM" },
  { id: "blueprint", label: "Integration blueprint" },
  { id: "safeguards", label: "Security safeguards" },
  { id: "current", label: "Current implementation" },
  { id: "roadmap", label: "Practical roadmap" },
  { id: "sources", label: "Fact-checked sources" },
];

const socCases = [
  { icon: ScanSearch, title: "Replay an investigation", copy: "Follow a session across prompts, retrieval, tools and model calls to understand why the agent took an action." },
  { icon: ShieldAlert, title: "Expose unsafe behavior", copy: "Score prompt-injection indicators, authorization failures, sensitive-data detections and policy denials at trace or observation level." },
  { icon: Gauge, title: "Find operational anomalies", copy: "Investigate latency, cost, token spikes, error rates and tool-call patterns by user, session, release or prompt version." },
  { icon: BadgeCheck, title: "Prove release quality", copy: "Run code checks, human annotation and LLM-as-judge evaluations against datasets before and after a change." },
];

const sources = [
  ["Langfuse documentation", "https://langfuse.com/docs"],
  ["Langfuse architecture", "https://langfuse.com/handbook/product-engineering/architecture"],
  ["Sessions", "https://langfuse.com/docs/observability/features/sessions"],
  ["Users", "https://langfuse.com/docs/observability/features/users"],
  ["Scores via SDK", "https://langfuse.com/docs/evaluation/evaluation-methods/scores-via-sdk"],
  ["Evaluation concepts", "https://langfuse.com/docs/evaluation/core-concepts"],
  ["Annotation queues", "https://langfuse.com/docs/evaluation/evaluation-methods/annotation-queues"],
  ["Prompt management", "https://langfuse.com/docs/prompt-management/get-started"],
  ["Data masking", "https://langfuse.com/docs/observability/features/masking"],
  ["Public API", "https://langfuse.com/docs/api-and-data-platform/features/public-api"],
  ["Metrics API", "https://langfuse.com/docs/metrics/overview"],
  ["Microsoft Sentinel overview", "https://learn.microsoft.com/en-us/azure/sentinel/sentinel-overview"],
  ["SIEM capabilities", "https://learn.microsoft.com/en-us/azure/sentinel/isv/siem-components-to-include"],
];

export default function Page() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Toc entries={toc} />
      <article className="min-w-0">
        <TopicJsonLd topic={topic} />
        <Reveal>
          <div className="text-[13px] text-text-3">
            <Link href="/" className="hover:text-accent">Home</Link>
            {" / Agentic AI & security / Operate"}
          </div>
          <div className="mt-5 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cat-teal">LLM observability · evaluation · SOC operations</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-text sm:text-7xl">
              See the agent.
              <span className="block text-accent-2">Defend the system.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-2">
              Langfuse gives engineers and security teams execution-level evidence for LLM applications. A SIEM turns security signals into enterprise correlation, incidents and response. Production SOC operations need both roles to be explicit.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip tone="accent">Langfuse</Chip>
            <Chip tone="teal">LLM observability</Chip>
            <Chip tone="teal">Evaluation</Chip>
            <Chip tone="coral">SOC + SIEM</Chip>
          </div>
        </Reveal>

        <H2 id="decision">The decision in one sentence</H2>
        <Callout variant="warn" title="Langfuse is not a SIEM">
          Use <strong>Langfuse to explain and evaluate agent behavior</strong>. Use a <strong>SIEM to correlate that behavior with identity, endpoint, network and cloud telemetry</strong>, create incidents, support hunting, and trigger response workflows.
        </Callout>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-surface-1 p-6">
            <Activity className="text-cat-teal" size={22} />
            <p className="mt-4 font-medium text-text">Langfuse answers</p>
            <p className="mt-2 text-sm leading-relaxed text-text-2">What did the agent see, call, generate, score and cost—and how did that change across a session or release?</p>
          </div>
          <div className="bg-surface-1 p-6">
            <Crosshair className="text-cat-coral" size={22} />
            <p className="mt-4 font-medium text-text">The SIEM answers</p>
            <p className="mt-2 text-sm leading-relaxed text-text-2">Is this behavior part of a wider attack, which assets and identities are affected, and what incident or response should follow?</p>
          </div>
        </div>

        <H2 id="what">What Langfuse is</H2>
        <P>
          Langfuse is an open-source LLM engineering platform. Its observability model captures traces containing model generations and non-LLM observations such as retrievals, tool calls and application steps. Sessions group related traces; users support aggregate analysis; scores attach quality or security judgments; evaluations compare behavior across datasets and releases; prompt management versions runtime prompts.
        </P>
        <Callout variant="note" title="Security interpretation">
          This is application telemetry for probabilistic systems. It becomes security-relevant when you attach trusted identity context, policy decisions, tool authorization outcomes, guardrail results and release metadata.
        </Callout>

        <H2 id="architecture">How it is built</H2>
        <P>
          In the documented architecture, SDK or OpenTelemetry events reach the Langfuse API, payloads are persisted to object storage and queued, workers process them asynchronously, ClickHouse serves high-volume trace analytics, and PostgreSQL stores transactional platform data. Cloud and self-hosted editions share the core product model but have different operational responsibilities.
        </P>
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-1 p-3 sm:p-6">
          <LangfuseArchitectureDiagram />
        </Reveal>

        <H2 id="data-model">The operating model</H2>
        <Table>
          <thead><tr><TH>Langfuse object</TH><TH>What it records</TH><TH>SOC interpretation</TH></tr></thead>
          <tbody>
            <tr><TD head>Trace</TD><TD>One end-to-end request or workflow</TD><TD>Investigation timeline and correlation anchor</TD></tr>
            <tr><TD head>Observation / span</TD><TD>Retrieval, tool, guardrail or application step</TD><TD>Which control ran, which tool acted, and what failed</TD></tr>
            <tr><TD head>Generation</TD><TD>Model input/output, model, usage, latency and cost</TD><TD>Model behavior, sensitive-data exposure and anomaly context</TD></tr>
            <tr><TD head>Session</TD><TD>Related traces across a conversation or workflow</TD><TD>Multi-turn attack path, persistence and escalation story</TD></tr>
            <tr><TD head>User</TD><TD>Pseudonymous user-level aggregation</TD><TD>Usage patterns and abuse investigation—when identity mapping is governed</TD></tr>
            <tr><TD head>Score</TD><TD>Numeric, categorical, boolean or text judgment</TD><TD>Prompt-injection risk, policy result, quality or human verdict</TD></tr>
          </tbody>
        </Table>

        <H2 id="soc">How this helps a SOC team</H2>
        <Stagger className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {socCases.map(({ icon: Icon, title, copy }) => (
            <StaggerItem key={title} className="bg-surface-1 p-6">
              <Icon size={20} className="text-accent" />
              <p className="mt-4 font-medium text-text">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-2">{copy}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <P>
          Langfuse is especially useful during AI-specific triage: reconstructing a multi-turn prompt-injection attempt, checking which retrieved content influenced the model, confirming whether a privileged tool actually ran, comparing guardrail results, or finding the prompt/model version behind a regression. Those are details a general SIEM usually does not model natively.
        </P>

        <H2 id="comparison">Langfuse vs SIEM</H2>
        <Table>
          <thead><tr><TH>Capability</TH><TH>Langfuse</TH><TH>SIEM</TH></tr></thead>
          <tbody>
            <tr><TD head>LLM prompts, generations and tool spans</TD><TD>Primary strength</TD><TD>Usually custom, flattened telemetry</TD></tr>
            <tr><TD head>Evaluation, annotation and prompt versions</TD><TD>Built for this workflow</TD><TD>Not the primary job</TD></tr>
            <tr><TD head>Identity, endpoint, network and cloud correlation</TD><TD>Limited to supplied context</TD><TD>Primary strength</TD></tr>
            <tr><TD head>Detection rules, incidents and case management</TD><TD>Scores and analysis, not full SOC case handling</TD><TD>Primary strength</TD></tr>
            <tr><TD head>Hunting and automated response</TD><TD>AI execution investigation</TD><TD>Enterprise hunting, automation and response</TD></tr>
            <tr><TD head>Recommended role</TD><TD>System of insight for agent behavior</TD><TD>System of record for security operations</TD></tr>
          </tbody>
        </Table>

        <H2 id="blueprint">Recommended integration blueprint</H2>
        <P>
          Keep the rich, sanitized LLM execution record in Langfuse. Send a smaller, normalized security event to the SIEM when a decision matters: policy denial, suspicious prompt score, unauthorized tool request, sensitive-data detector result, unusual cost threshold, or production evaluation regression. Include correlation IDs and a controlled investigation link—not the full prompt or output by default.
        </P>
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-1 p-3 sm:p-6">
          <TelemetrySplitDiagram />
        </Reveal>
        <Callout variant="idea" title="Implementation note">
          Do not assume a native Langfuse-to-SIEM connector. A practical design can dual-emit security decisions from the application, or use Langfuse&apos;s public and metrics APIs through a governed custom integration. Validate the connector, schema and retention model for your environment.
        </Callout>

        <H2 id="safeguards">Security safeguards before production</H2>
        <UL>
          <li><strong>Mask at source:</strong> redact secrets, personal data and sensitive security evidence before telemetry leaves the application.</li>
          <li><strong>Pseudonymize identity:</strong> use stable internal identifiers and keep the identity-resolution boundary governed.</li>
          <li><strong>Separate environments:</strong> isolate development, test and production projects, keys, access and retention.</li>
          <li><strong>Limit access:</strong> apply role-based access, avoid unsafe public trace sharing, rotate keys and audit administrative activity.</li>
          <li><strong>Control data movement:</strong> decide cloud versus self-hosting from classification, residency, isolation and operating-capability requirements.</li>
          <li><strong>Treat scores as evidence, not truth:</strong> calibrate thresholds, retain evaluator versions, and use human review for consequential decisions.</li>
        </UL>

        <H2 id="current">Current Cybersecurity Orchestrator implementation</H2>
        <Callout variant="tip" title="Version-aware snapshot">
          The current project is pinned to <strong>Langfuse Python 3.15.0</strong>. The platform documentation evolves quickly, so examples should be checked against the installed SDK before implementation.
        </Callout>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {[
            ["In use", "Tracing, users, sessions and deterministic code scores for workflow and policy evidence."],
            ["Deliberate choice", "Runtime prompts remain in version-controlled skills rather than Langfuse Prompt Management."],
            ["Next", "Human annotation, LLM-as-judge evaluation and datasets/experiments for repeatable regression testing."],
            ["Audit boundary", "Langfuse is observability and evaluation evidence; the project journal remains the authoritative action/audit record."],
          ].map(([label, copy]) => (
            <div key={label} className="grid gap-2 py-5 sm:grid-cols-[145px_1fr]">
              <span className="font-mono text-xs uppercase tracking-wide text-text-3">{label}</span>
              <span className="text-[15px] leading-relaxed text-text-2">{copy}</span>
            </div>
          ))}
        </div>

        <H2 id="roadmap">A practical adoption roadmap</H2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["01 · Observe", "Instrument traces, sessions and tool spans. Establish masking and environment boundaries."],
            ["02 · Evaluate", "Add code scores, human annotation and release datasets. Baseline quality and risk."],
            ["03 · Operationalize", "Emit high-signal security decisions to the SIEM, correlate incidents, and test response playbooks."],
          ].map(([title, copy]) => (
            <div key={title} className="border-t-2 border-accent bg-surface-1 p-5">
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-accent">{title}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-2">{copy}</p>
            </div>
          ))}
        </div>

        <H2 id="sources">Fact-checked sources</H2>
        <P>
          Product capabilities and architecture were checked against current Langfuse documentation; SIEM responsibilities were checked against Microsoft Sentinel documentation. The telemetry split is a recommended architecture inferred from those documented capabilities, not a claim of a built-in integration.
        </P>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {sources.map(([label, url]) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 bg-surface-1 px-4 py-3 text-sm text-text-2 transition-colors hover:text-accent">
              <span>{label}</span><ArrowUpRight size={14} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-text">Next in the path</p>
            <p className="mt-1 text-sm text-text-2">Turn observability into a governed security operating model.</p>
          </div>
          <a href="https://langfuse.com/docs" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5 hover:bg-accent-2">
            Explore Langfuse docs <ArrowUpRight size={16} />
          </a>
        </Reveal>
        <div className="mt-10">
          <Link href="/#learning-paths" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2">
            <ArrowLeft size={15} /> Back to the learning map
          </Link>
        </div>
      </article>
    </div>
  );
}
