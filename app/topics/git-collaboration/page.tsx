import type { Metadata } from "next";
import Link from "next/link";
import { getTopic } from "@/lib/topics";
import { TopicJsonLd } from "@/components/content/json-ld";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";
import { Toc } from "@/components/content/toc";
import { Figure } from "@/components/content/figure";
import { SeriesBadge, SeriesNav, ExamplesCallout } from "@/components/content/series";
import { ContributionModelsDiagram, SameBranchCollisionDiagram } from "@/components/content/git-diagrams";
import { H2, P, Lead, UL, Code, Table, TH, TD } from "@/components/content/prose";

const topic = getTopic("git-collaboration")!;

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
  { id: "contributor", label: "Contributor & contribution" },
  { id: "models", label: "Two ways to contribute" },
  { id: "flow", label: "The contribution flow" },
  { id: "branch-per-task", label: "One branch per task" },
  { id: "same-branch", label: "Two people, one branch" },
  { id: "conflict", label: "Resolving a conflict" },
];

export default function Page() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Toc entries={toc} />
      <article className="min-w-0">
        <TopicJsonLd topic={topic} />
        <div className="text-[13px] text-text-3">
          <Link href="/" className="hover:text-accent">Home</Link>
          {" / Git & collaboration"}
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
          {topic.title}
        </h1>
        <SeriesBadge topic={topic} />
        <div className="mt-3.5 flex flex-wrap gap-2">
          <Chip tone="accent">Git</Chip>
          <Chip tone="teal">GitHub</Chip>
          <Chip tone="teal">pull requests</Chip>
          <Chip tone="coral">merge conflicts</Chip>
        </div>
        <Lead>
          A repository is a shared space, but git is built so many people can
          work in it at once without stepping on each other. The trick is
          branches — and understanding exactly what happens when that
          discipline slips and two people land on the same one.
        </Lead>

        <Callout variant="idea" title="TL;DR">
          A <strong>contribution</strong> is merged changes; a{" "}
          <strong>contributor</strong> is anyone with merged commits. You
          contribute either by pushing branches to a repo you can write to, or
          by <strong>forking</strong> one you can&apos;t. The norm is{" "}
          <strong>one branch per task</strong>. Put two people on one branch and
          the second to push must pull first — and resolve a conflict if they
          touched the same lines.
        </Callout>

        <H2 id="contributor">What a contributor and contribution are</H2>
        <P>
          A <strong>contribution</strong> is any change that gets merged into a
          repository — usually a set of commits delivered as a pull request.
          A <strong>contributor</strong>{" "}is anyone whose changes have been
          merged. The &quot;Contributors&quot; list on a GitHub repo is
          literally everyone who has commits in the project&apos;s history.
        </P>

        <H2 id="models">Two ways to contribute</H2>
        <P>
          Which model you use depends on whether you have write access to the
          repo. This is what the &quot;contribute&quot; on a public project
          actually means:
        </P>
        <Figure caption="Both models end the same way — a reviewed pull request merged to main. They differ only in where you push.">
          <ContributionModelsDiagram />
        </Figure>
        <Table>
          <thead>
            <tr><TH></TH><TH>Shared-repo model</TH><TH>Fork &amp; pull model</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>When</TD><TD>your own repo, or a team you&apos;re a collaborator on</TD><TD>an open-source repo you don&apos;t own</TD></tr>
            <tr><TD head>You clone</TD><TD>the repo itself</TD><TD>your fork (a copy on your account)</TD></tr>
            <tr><TD head>You push to</TD><TD>a branch on the repo</TD><TD>a branch on your fork</TD></tr>
            <tr><TD head>The PR goes</TD><TD>your branch → main, same repo</TD><TD>your fork → the original repo</TD></tr>
          </tbody>
        </Table>

        <H2 id="flow">The contribution flow</H2>
        <P>
          The loop is the same in both models — the key detail is that you push
          your <em>branch</em>, never <Code>main</Code> (which is protected):
        </P>
        <CodeBlock
          filename="the contribution loop"
          code={`git clone <repo>                    # or fork first, then clone your fork
git checkout -b feature/my-change   # your own branch
# ...edit...
git add .
git commit -m "describe the change"
git push -u origin feature/my-change   # push YOUR BRANCH, never main
# open a Pull Request in the web UI → reviewer approves → merge to main`}
        />

        <H2 id="branch-per-task">The norm: one branch per task</H2>
        <P>
          In a healthy team, people do <strong>not</strong> share a working
          branch. Each person creates their own for their own task, so two
          engineers editing the same repo never collide:
        </P>
        <UL>
          <li>Engineer A → <Code>feature/rule-brute-force</Code></li>
          <li>Engineer B → <Code>feature/rule-impossible-travel</Code></li>
        </UL>
        <P>
          Separate branches → separate PRs → reviewed and merged independently.
          This is <em>why</em> feature branches exist: the only place changes
          meet is the controlled merge into <Code>main</Code>.
        </P>

        <H2 id="same-branch">What if two people are on the same branch</H2>
        <P>
          Git allows it, but it creates a race. Here is the exact sequence:
        </P>
        <Figure caption="Git refuses to let the second pusher overwrite the first — the rejection is a safety feature, not an error.">
          <SameBranchCollisionDiagram />
        </Figure>
        <P>The two rules that fall out of this:</P>
        <UL>
          <li><strong>Whoever pushes second must pull first.</strong> Git won&apos;t let B overwrite A&apos;s commit.</li>
          <li><strong>The pull&apos;s outcome depends on what each touched</strong> — different files/lines merge automatically; the same lines produce a conflict.</li>
        </UL>

        <H2 id="conflict">Resolving a conflict</H2>
        <P>
          When the same lines changed, git marks the spot and asks you to
          choose. You edit the file, keep what&apos;s correct, delete the
          markers, then commit the resolution:
        </P>
        <CodeBlock
          filename="a conflict in the file"
          code={`<<<<<<< HEAD (the version already on the remote)
    | where FailedAttempts >= 10
=======
    | where FailedAttempts >= 5
>>>>>>> your changes`}
        />
        <Callout variant="warn" title="Same-branch isn't broken — it just doesn't scale">
          Two people can pair on one branch for an afternoon. But it forces
          constant pull-before-push and invites conflicts, which is why
          branch-per-task is the default: the collisions move to one controlled
          place — the merge into <Code>main</Code>, where a reviewer handles
          them deliberately.
        </Callout>

        <ExamplesCallout path={topic.examples!} />
        <SeriesNav topic={topic} />
        <div className="mt-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2">
            ← Back to all topics
          </Link>
        </div>
      </article>
    </div>
  );
}
