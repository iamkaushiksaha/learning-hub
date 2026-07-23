import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTopic } from "@/lib/topics";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";
import { Tabs } from "@/components/content/tabs";
import { Accordion } from "@/components/content/accordion";
import { Toc } from "@/components/content/toc";
import { Figure } from "@/components/content/figure";
import { PipelineDiagram, IacDiagram } from "@/components/content/diagrams";
import { SeriesBadge, SeriesNav, ExamplesCallout } from "@/components/content/series";
import { H2, P, Lead, UL, Code, Table, TH, TD } from "@/components/content/prose";

const topic = getTopic("detection-as-code-cicd")!;

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
};

const toc = [
  { id: "what-is-it", label: "What this practice is called" },
  { id: "architecture", label: "Repo & environment architecture" },
  { id: "authoring", label: "UI-first authoring" },
  { id: "benefits", label: "Why DevOps? The benefits" },
  { id: "missing-layer", label: "The missing layer" },
  { id: "ci-vs-cd", label: "CI vs CD" },
  { id: "engines", label: "ARM/Bicep vs Terraform" },
  { id: "git", label: "Git lifecycle" },
  { id: "platforms", label: "GitHub vs Azure DevOps" },
  { id: "iac-vs-api", label: "IaC vs API" },
  { id: "lab", label: "Hands-on lab path" },
];

export default function Page() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Toc entries={toc} />

      <article className="min-w-0">
        <div className="text-[13px] text-text-3">
          <Link href="/" className="hover:text-accent">Home</Link>
          {" / DevOps & automation"}
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
          {topic.title}
        </h1>
        <SeriesBadge topic={topic} />
        <div className="mt-3.5 flex flex-wrap gap-2">
          <Chip tone="accent">Sentinel</Chip>
          <Chip tone="teal">GitHub Actions</Chip>
          <Chip tone="teal">Azure DevOps</Chip>
          <Chip tone="coral">Terraform</Chip>
          <Chip tone="coral">ARM / Bicep</Chip>
        </div>
        <Lead>
          How analytic rules move from an engineer&apos;s idea to a production
          Sentinel workspace through git, pull requests, and pipelines, with
          every change visible, reviewed, reversible, and attributable.
        </Lead>

        <H2 id="what-is-it">What this practice is called</H2>
        <P>
          Managing SOC content (analytic rules, hunting queries, playbooks)
          through git and pipelines is called <strong>Detection-as-Code</strong>.
          It applies DevOps practices to security content. Getting the
          neighboring terms straight:
        </P>
        <Table>
          <thead>
            <tr><TH>Term</TH><TH>What it actually means</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>DevOps</TD><TD>The practice family: git, branches, PRs, automated pipelines. Detection-as-Code is DevOps applied to detections.</TD></tr>
            <tr><TD head>DevSecOps</TD><TD>The reverse direction: embedding security checks (SAST, secret scanning) into a software development pipeline.</TD></tr>
            <tr><TD head>SecOps</TD><TD>Security Operations generally, the SOC function. Not the name of this pipeline pattern.</TD></tr>
            <tr><TD head>Detection-as-Code</TD><TD>The correct CV/proposal phrase for this whole practice.</TD></tr>
          </tbody>
        </Table>

        <H2 id="architecture">Repo &amp; environment architecture</H2>
        <P>
          The instinct to keep a &quot;dev repo&quot; and a &quot;prod
          repo&quot; is a common anti-pattern: syncing two repos creates drift
          and splits history. Best practice is{" "}
          <strong>one repo, two branches, two Sentinel workspaces</strong>: the
          branch determines the environment, not the repo.
        </P>
        <Figure caption="The end-to-end flow: same JSON file all the way; only the branch decides which workspace it lands in.">
          <PipelineDiagram />
        </Figure>
        <P><strong>Do you even need a dev workspace?</strong></P>
        <UL>
          <li><strong>Mid/large client or MSSP:</strong> yes. It catches broken KQL, over-firing rules, and deployment errors before the SOC queue. It doesn&apos;t need full data ingestion; a subset of connectors or replayed sample logs is enough.</li>
          <li><strong>Small client:</strong> a single prod workspace is acceptable <em>if</em> the pipeline compensates: mandatory PR review, automated validation, and deploying new rules disabled or in audit mode first.</li>
        </UL>

        <H2 id="authoring">The UI-first authoring workflow</H2>
        <P>
          Detection engineers should not hand-write ARM JSON. The recommended
          pattern is <strong>UI-first (export-driven) authoring</strong>: create
          and test the rule in the dev Sentinel UI, export it as JSON, and
          commit that JSON to a feature branch. The UI is the authoring tool;
          git is the system of record.
        </P>
        <Accordion
          items={[
            { summary: "Parameterize environment-specific values", content: <>Exported JSON embeds subscription ID, resource group, and workspace name in the resource <Code>id</Code>. Parameterize these (or let the pipeline strip/replace them), otherwise the dev JSON deploys pointing at the dev workspace. Sentinel&apos;s Repositories feature handles most of this mapping automatically.</> },
            { summary: "One rule per file, consistent naming", content: <>e.g. <Code>AR-Ident-BruteForce-SigninLogs.json</Code>. One file per rule is what makes PR diffs reviewable.</> },
            { summary: "The repo is the source of truth after merge", content: <>Nobody edits rules directly in the prod UI. If they do, the next pipeline run overwrites the change. That is <strong>drift correction</strong>, a feature, not a bug.</> },
            { summary: "Authoring only ever happens in dev", content: <>Prod becomes a deploy-only target that humans don&apos;t touch.</> },
          ]}
        />

        <H2 id="benefits">Why DevOps? PR review is maybe 20% of the value</H2>
        <P>The peer-review gate is the visible benefit. Here is what the client is really buying:</P>
        <Accordion
          items={[
            { summary: "Audit trail & compliance evidence", defaultOpen: true, content: <>Git history answers who changed this detection, when, why, and who approved it, forever. When a post-incident review asks why a rule stopped firing in March, <Code>git log</Code> is the answer.</> },
            { summary: "Instant rollback", content: <>A new rule floods the SOC with 400 incidents overnight? <Code>git revert</Code>, merge, and the pipeline restores the previous version in minutes.</> },
            { summary: "Disaster recovery & migration", content: <>The repo can rebuild the entire analytics estate from scratch: new workspace, new tenant, new region. Accidental deletion in prod is fixed by one pipeline run.</> },
            { summary: "Consistency at scale", content: <>The big one for MSSPs: the same rule deploys identically to 2 or 20 workspaces. No copy-paste between portals.</> },
            { summary: "Automated quality gates", content: <>On every PR the pipeline enforces valid KQL syntax, MITRE ATT&amp;CK tags, severity, entity mappings, naming convention. Humans review logic; machines check standards, without fatigue.</> },
            { summary: "Separation of duties & change management", content: <>Branch protection means a junior analyst can propose but only a senior engineer can approve into <Code>main</Code>. The merged PR is your change-management record.</> },
            { summary: "MITRE coverage reporting for free", content: <>Every detection is a structured file in one place, so an ATT&amp;CK coverage matrix becomes a script, not a quarterly manual exercise.</> },
          ]}
        />

        <H2 id="missing-layer">The missing layer: the pipeline is not the deployer</H2>
        <P>
          A GitHub Action or Azure DevOps pipeline is{" "}
          <strong>just an orchestrator</strong>: a runner that executes steps
          when something happens. By itself it doesn&apos;t know what an analytic
          rule is. The pipeline <em>calls</em> a deployment engine (ARM/Bicep or
          Terraform), and both funnel into one door: the{" "}
          <strong>Azure Resource Manager API</strong>, through which every Azure
          change flows.
        </P>
        <Callout variant="tip" title="Authentication — the piece people forget">
          The pipeline logs into Azure as a <strong>service principal</strong>:
          an app identity with rights to write to the Sentinel resource group.
          Azure DevOps wraps it in a Service Connection; GitHub stores it as a
          secret or uses OIDC federation so no password is stored. Without it,
          the runner has no rights to deploy anything.
        </Callout>

        <H2 id="ci-vs-cd">CI vs CD — two halves of one pipeline</H2>
        <Table>
          <thead>
            <tr><TH></TH><TH>CI — integration</TH><TH>CD — deployment</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>When</TD><TD>On the pull request, before merge</TD><TD>After the merge</TD></tr>
            <tr><TD head>Job</TD><TD>Validate, never deploy</TD><TD>Actually push the change</TD></tr>
            <tr><TD head>For Sentinel</TD><TD>KQL valid? JSON well-formed? MITRE tags, severity, entities present?</TD><TD>Deploy command lands the rule in the workspace</TD></tr>
            <tr><TD head>Terraform</TD><TD><Code>terraform plan</Code> posts the diff onto the PR</TD><TD><Code>terraform apply</Code> executes it</TD></tr>
          </tbody>
        </Table>

        <H2 id="engines">ARM/Bicep vs Terraform — pick one deployment engine</H2>
        <Tabs
          tabs={[
            { label: "ARM / Bicep", content: <>Azure&apos;s <strong>native</strong> format, literally what comes out when you click Export on a rule in the Sentinel UI. Bicep is a cleaner language that compiles to ARM JSON. Zero translation, and it is what Sentinel&apos;s Repositories feature uses under the hood. Path of least resistance for a pure-Sentinel engagement.</> },
            { label: "Terraform", content: <>HashiCorp&apos;s multi-cloud tool. A Sentinel scheduled rule becomes <Code>azurerm_sentinel_alert_rule_scheduled</Code>. The concept that trips people up is <strong>state</strong>: <Code>terraform.tfstate</Code> is Terraform&apos;s memory of what it has created. In a team it must live in a shared remote backend (an Azure Storage account with locking), never on a laptop. <Code>plan</Code> shows the diff; <Code>apply</Code> executes it.</> },
            { label: "How to choose", content: <>Pure-Sentinel engagement → ARM/Bicep. Terraform shop or multi-cloud client → Terraform. Knowing <strong>both</strong> is the CV-worthy skill: same job, different language, same ARM API underneath.</> },
          ]}
        />

        <H2 id="git">The git lifecycle, properly named</H2>
        <CodeBlock
          filename="git — feature branch to PR"
          code={`git clone <repo-url>              # copy the repo locally (once)
git checkout -b feature/new-rule  # create AND switch to a new branch
# ...edit or paste your exported rule JSON into a file...
git status                        # see what changed
git add .                         # stage changes (to the staging area)
git commit -m "Add brute-force rule"   # snapshot staged changes
git push -u origin feature/new-rule    # publish your branch to the remote
# ...then in the web UI: open a Pull Request...`}
        />
        <P>
          The mental map: <em>working directory</em> (your edits) →{" "}
          <Code>git add</Code> → <em>staging area</em> → <Code>git commit</Code>{" "}
          → <em>local history</em> → <Code>git push</Code> → <em>remote</em>.
          The PR/approval/merge happens in the web UI, and that is what kicks
          off the pipeline.
        </P>

        <H2 id="platforms">GitHub vs Azure DevOps — same concepts, different names</H2>
        <Table>
          <thead>
            <tr><TH>Concept</TH><TH>GitHub</TH><TH>Azure DevOps</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>Where code lives</TD><TD>GitHub repo</TD><TD>Azure Repos</TD></tr>
            <tr><TD head>The pipeline</TD><TD>GitHub Actions</TD><TD>Azure Pipelines</TD></tr>
            <tr><TD head>Azure login</TD><TD>Secret / OIDC</TD><TD>Service Connection</TD></tr>
            <tr><TD head>Merge protection</TD><TD>Branch protection</TD><TD>Branch policies</TD></tr>
            <tr><TD head>Deploy approval</TD><TD>Environments + reviewers</TD><TD>Environments + checks</TD></tr>
          </tbody>
        </Table>
        <Callout variant="idea" title="Two approval points — don't conflate them">
          <strong>1. PR approval</strong>: a human reviews the code before
          merge (branch protection). <strong>2. Deployment approval</strong>:
          even after merge, the pipeline pauses before touching prod and waits
          for a named approver (Environment gate). A mature setup gates twice:
          once on the merge, once on the prod deploy.
        </Callout>

        <H2 id="iac-vs-api">IaC vs API — the solution architect&apos;s call</H2>
        <P>
          The question is never which service likes the API more. The real axis
          is <strong>state vs action</strong>:
        </P>
        <UL>
          <li><strong>Desired-state configuration</strong>: things that should exist and stay a certain way (analytic rules, workbooks, connectors) → declarative IaC. You get idempotency, drift detection, and rollback for free.</li>
          <li><strong>Imperative actions</strong>: things you do with no lasting state (bulk-close incidents, upload a watchlist, trigger a hunt) → API scripts. There is nothing to keep in a desired state.</li>
        </UL>
        <Figure caption="Declarative for state, imperative for actions, a bridge when the provider lags — all under one governance model.">
          <IacDiagram />
        </Figure>
        <Callout variant="warn" title="The tradeoff when you go imperative">
          A raw API script is <strong>not idempotent</strong> by default: run it
          twice and it may create duplicates or error. You must write
          check-then-act logic yourself, and you lose drift detection. Never let
          anyone run an API call from a laptop against prod; the script lives in
          the repo and the pipeline runs it.
        </Callout>

        <H2 id="lab">Hands-on lab path — five stages</H2>
        <P>Each stage adds one real concept, so you are never lost:</P>
        <Accordion
          items={[
            { summary: "Stage 1 — Native, no pipeline authoring", content: <>Two Log Analytics workspaces with Sentinel enabled. Connect Sentinel&apos;s built-in Repositories feature: dev workspace → <Code>develop</Code>, prod → <Code>main</Code>. Export a rule, commit it, watch the auto-generated GitHub Action deploy it. Goal: see a merge become a deployed rule.</> },
            { summary: "Stage 2 — Read the generated workflow", content: <>Open the <Code>.yml</Code> the feature created. See the orchestrator steps and the deploy call. Goal: demystify what was hidden.</> },
            { summary: "Stage 3 — Write your own GitHub Actions workflow", content: <>Replace the native one. Add a CI job that validates the JSON and a CD job that deploys with <Code>az deployment group create</Code>. Set up the service principal yourself. Goal: you now own the pipeline.</> },
            { summary: "Stage 4 — Swap the engine to Terraform", content: <>Rewrite one rule as <Code>azurerm_sentinel_alert_rule_scheduled</Code>, set up a remote state backend in Azure Storage, make CI run <Code>terraform plan</Code> and CD run <Code>terraform apply</Code>. Goal: the CV-grade skill.</> },
            { summary: "Stage 5 — Do it all again in Azure DevOps", content: <>Same repo logic: Azure Pipelines YAML, a Service Connection, an Environment with a manual approval gate. Goal: speak to both platforms from real experience.</> },
          ]}
        />
        <Callout variant="tip" title="Break it on purpose">
          Once running, edit a rule directly in the prod workspace UI, then push
          a commit and watch the pipeline overwrite your manual change. Seeing
          drift correction happen is the fastest way to internalize why the repo
          is the source of truth.
        </Callout>

        <ExamplesCallout path={topic.examples!} />

        <SeriesNav topic={topic} />

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2"
          >
            <ArrowLeft size={15} /> Back to all topics
          </Link>
        </div>
      </article>
    </div>
  );
}
