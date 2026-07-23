import type { Metadata } from "next";
import Link from "next/link";
import { getTopic } from "@/lib/topics";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";
import { Toc } from "@/components/content/toc";
import { Figure } from "@/components/content/figure";
import { SeriesBadge, SeriesNav, ExamplesCallout } from "@/components/content/series";
import { TiersDiagram, ValidationPipelineDiagram } from "@/components/content/validation-diagrams";
import { H2, P, Lead, UL, Code, Table, TH, TD } from "@/components/content/prose";

const topic = getTopic("validating-sentinel-detections")!;

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
};

const toc = [
  { id: "why", label: "Why validate at all" },
  { id: "tiers", label: "The three tiers" },
  { id: "placement", label: "Where each check sits" },
  { id: "how", label: "How to run each check" },
  { id: "shift-left", label: "Why this order (shift-left)" },
  { id: "lab", label: "Try it" },
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
          <Chip tone="teal">KQL</Chip>
          <Chip tone="teal">CI/CD</Chip>
          <Chip tone="coral">SAST / DAST</Chip>
        </div>
        <Lead>
          A rule that deploys cleanly can still be wrong — bad KQL, missing
          MITRE tags, or a query that never fires. Validation is how the
          pipeline catches that before the SOC does. The trick: borrow the
          tiers you already know from application security.
        </Lead>

        <Callout variant="idea" title="TL;DR">
          KQL validation is three tiers, not one. <strong>Static lint</strong>{" "}
          (like SAST) and <strong>syntax/schema check</strong> (like compile)
          run in CI on the pull request — the gate that blocks a bad merge.{" "}
          <strong>Functional testing</strong> (like DAST) runs after merge,
          against a dev workspace with sample data. Cheap checks gate early;
          the expensive one runs once, later.
        </Callout>

        <H2 id="why">Why validate at all</H2>
        <P>
          In the portal-only world, a broken rule is found by a human noticing
          the SOC queue went quiet — or flooded. Detection-as-Code moves that
          discovery left: the pipeline rejects a bad rule on the pull request,
          before it can reach a workspace. But &quot;bad&quot; has three
          different meanings, and each needs a different kind of check.
        </P>

        <H2 id="tiers">The three tiers, mapped to app-sec</H2>
        <P>
          If you&apos;ve seen SAST, DAST, and a compiler, you already have the
          mental model. Each maps cleanly onto a tier of detection validation:
        </P>
        <Figure caption="Static lint and a syntax/schema check are cheap and run on the PR; the functional test needs a live workspace and runs after merge.">
          <TiersDiagram />
        </Figure>
        <Table>
          <thead>
            <tr><TH>Tier</TH><TH>Catches</TH><TH>Needs a workspace?</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>Static lint (≈ SAST)</TD><TD>missing severity/MITRE/entities, bad naming, empty query, hardcoded workspace IDs</TD><TD>no</TD></tr>
            <tr><TD head>Syntax + schema (≈ compile)</TD><TD>KQL that doesn&apos;t parse, or references a table/column that doesn&apos;t exist</TD><TD>read-only</TD></tr>
            <tr><TD head>Functional test (≈ DAST)</TD><TD>a rule that deploys fine but never fires, or fires on everything</TD><TD>yes (dev)</TD></tr>
          </tbody>
        </Table>

        <H2 id="placement">Where each check sits in the pipeline</H2>
        <P>
          The static tiers are the <strong>CI gate</strong>: they run on the
          pull request and must pass before the merge button unlocks. The
          functional test is a <strong>CD stage</strong>: it runs after merge,
          against the dev workspace, because it needs a live Sentinel to
          execute against.
        </P>
        <Figure caption="Static checks gate the merge; a human judges the logic; the does-it-fire test runs after merge against dev.">
          <ValidationPipelineDiagram />
        </Figure>
        <Callout variant="tip" title="One-line answer to 'where in CI?'">
          A <Code>validate</Code> job triggered on <Code>pull_request</Code>,
          with steps that run <em>before</em> any deploy job — and branch
          protection requires that job to pass before merge. The deploy-and-fire
          test is a separate job on <Code>push</Code> to <Code>develop</Code>.
        </Callout>

        <H2 id="how">How to run each check</H2>
        <P>
          <strong>Tier 1 — static lint (no Azure).</strong> A script parses the
          exported ARM/YAML and asserts the metadata is complete. This is the
          fast gate on every PR:
        </P>
        <CodeBlock
          filename="metadata lint — runs on the PR, no workspace"
          code={`python3 scripts/lint_rule.py rules/*.json
# asserts: displayName, valid severity, non-empty query, MITRE
# tactics + techniques, entityMappings, naming convention, and
# no hardcoded workspace GUIDs. Non-zero exit fails the PR.`}
        />
        <P>
          <strong>Tier 2 — KQL syntax + schema.</strong> Run the query against a
          workspace over a tiny window with <Code>| take 0</Code> appended: no
          rows return, but the service still parses the KQL and resolves every
          table and column against the real schema.
        </P>
        <CodeBlock
          filename="kql check — read-only, validates against real schema"
          code={`az monitor log-analytics query \\
  --workspace <dev-workspace-guid> \\
  --analytics-query "SigninLogs | where ResultType == 50126 | take 0"
# fails if the KQL is malformed or a column doesn't exist.
# Fully offline alternative: parse with the Kusto.Language library.`}
        />
        <P>
          <strong>Tier 3 — functional test (needs dev).</strong> Seed the
          workspace with sample logs containing a known-malicious pattern, run
          the detection, and assert it returns the planted true positive and
          nothing benign:
        </P>
        <CodeBlock
          filename="functional assertion — runs in CD, after merge"
          code={`Detection
| summarize hits = count(),
    true_positive  = countif(UserPrincipalName == "attacker.target@contoso.com"),
    false_positive = countif(UserPrincipalName != "attacker.target@contoso.com")
// pass when true_positive == 1 and false_positive == 0`}
        />

        <ExamplesCallout path={topic.examples!} />

        <H2 id="shift-left">Why this order — shift-left</H2>
        <P>
          The ordering isn&apos;t arbitrary; it&apos;s the same economics as unit
          tests vs integration tests. Cheap, fast checks that need nothing run
          on every commit and block the merge. The expensive check — deploying
          to a live workspace and querying it — runs once, after merge, on the
          agreed-upon result.
        </P>
        <UL>
          <li><strong>Static lint</strong>: milliseconds, no dependencies → every PR.</li>
          <li><strong>Syntax/schema</strong>: seconds, read-only auth → every PR.</li>
          <li><strong>Functional test</strong>: minutes, write access, live data → once, post-merge.</li>
        </UL>
        <P>
          Push the cheap checks as far left as you can (even a pre-commit hook),
          and reserve the workspace-dependent test for the stage that already
          has a workspace. A human still owns the one thing no check can
          judge: whether the detection logic is actually <em>good</em>.
        </P>

        <H2 id="lab">Try it</H2>
        <P>
          The companion example above is a complete, runnable version of
          everything here — one brute-force rule in ARM and Terraform, the lint
          and KQL-check scripts, the functional-test recipe, and the GitHub
          Actions workflow that wires the tiers together. Break a field in the
          rule JSON and watch the linter reject it: that&apos;s the CI gate doing
          its job.
        </P>

        <SeriesNav topic={topic} />

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2"
          >
            ← Back to all topics
          </Link>
        </div>
      </article>
    </div>
  );
}
