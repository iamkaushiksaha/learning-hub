import type { Metadata } from "next";
import Link from "next/link";
import { getTopic } from "@/lib/topics";
import { Chip } from "@/components/content/chip";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";
import { Toc } from "@/components/content/toc";
import { Figure } from "@/components/content/figure";
import { SeriesBadge, SeriesNav, ExamplesCallout } from "@/components/content/series";
import { WorktreeDiagram } from "@/components/content/git-diagrams";
import { H2, P, Lead, UL, Code, Table, TH, TD } from "@/components/content/prose";

const topic = getTopic("git-worktrees")!;

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
};

const toc = [
  { id: "working-tree", label: "The working tree" },
  { id: "the-trap", label: "The one-branch limit" },
  { id: "worktree", label: "What git worktree does" },
  { id: "when", label: "When you need it" },
  { id: "commands", label: "The commands" },
  { id: "gotchas", label: "Gotchas" },
];

export default function Page() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Toc entries={toc} />
      <article className="min-w-0">
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
          <Chip tone="teal">worktree</Chip>
          <Chip tone="teal">branching</Chip>
          <Chip tone="coral">workflow</Chip>
        </div>
        <Lead>
          There&apos;s a naming trap here: the &quot;working tree&quot; and{" "}
          <Code>git worktree</Code> are two different things. One is the folder
          of files you edit; the other is a power-tool that lets you have
          several of those at once.
        </Lead>

        <Callout variant="idea" title="TL;DR">
          The <strong>working tree</strong> is your checked-out files — one
          branch at a time. <Code>git worktree</Code> breaks that limit: one
          repository, several folders, several branches live at once, all
          sharing the same <Code>.git</Code>. Reach for it when you need two
          branches simultaneously — a hotfix mid-feature, a PR review, a long
          build — without stashing your work.
        </Callout>

        <H2 id="working-tree">First: the working tree</H2>
        <P>
          The <strong>working tree</strong> (or working directory) is the folder
          of actual files you see and edit — the checked-out snapshot of one
          branch. It&apos;s one of git&apos;s &quot;three trees&quot;:
        </P>
        <Table>
          <thead>
            <tr><TH>Tree</TH><TH>What it is</TH></tr>
          </thead>
          <tbody>
            <tr><TD head>Working tree</TD><TD>the files on disk you actually edit</TD></tr>
            <tr><TD head>Staging area (index)</TD><TD>changes marked for the next commit (<Code>git add</Code>)</TD></tr>
            <tr><TD head>Commit history</TD><TD>the permanent snapshots (<Code>git commit</Code>)</TD></tr>
          </tbody>
        </Table>
        <P>
          When you <Code>git checkout</Code> a branch, git rewrites the files in
          your working tree to match it.
        </P>

        <H2 id="the-trap">The one-branch limit</H2>
        <P>
          Normally one clone = one working tree = one branch checked out at a
          time. To switch branches you commit or stash your work, then{" "}
          <Code>git checkout other-branch</Code> — the same folder&apos;s files
          get rewritten. That&apos;s disruptive when you&apos;re mid-task and
          need <em>another</em> branch right now.
        </P>

        <H2 id="worktree">What git worktree does</H2>
        <P>
          <Code>git worktree</Code> attaches <strong>additional</strong> working
          trees to the same repository — each in its own folder, each on a
          different branch, all sharing the one <Code>.git</Code>:
        </P>
        <Figure caption="Not a second clone — the worktrees share the same history and objects, so they're lightweight.">
          <WorktreeDiagram />
        </Figure>

        <H2 id="when">When you need it</H2>
        <UL>
          <li><strong>Urgent hotfix mid-feature</strong> — you&apos;re deep in <Code>feature-x</Code> with uncommitted work and a prod bug lands. <Code>git worktree add ../hotfix main</Code>, fix it there, and your feature folder is untouched.</li>
          <li><strong>Reviewing a colleague&apos;s PR</strong> while keeping your own work in place — check out their branch in a separate worktree.</li>
          <li><strong>A long build or test on one branch</strong> while you keep coding on another.</li>
          <li><strong>Comparing two branches</strong> side by side in your editor.</li>
        </UL>
        <Callout variant="tip" title="You've already seen this">
          Claude Code isolates an agent&apos;s changes using a git worktree under
          the hood (a <Code>.claude/worktrees/…</Code> folder) — the exact
          hotfix-isolation use case, keeping your main working tree undisturbed.
        </Callout>

        <H2 id="commands">The commands</H2>
        <CodeBlock
          filename="git worktree"
          code={`git worktree add ../project-hotfix hotfix   # new folder, hotfix branch checked out
git worktree list                           # see all working trees
git worktree remove ../project-hotfix       # clean up when done`}
        />

        <H2 id="gotchas">Gotchas</H2>
        <UL>
          <li>A branch can be checked out in <strong>only one</strong> worktree at a time — git blocks the same branch in two places so you can&apos;t corrupt it.</li>
          <li>All worktrees share the one <Code>.git</Code>, so it&apos;s lightweight — not a second clone, and a commit in one is instantly visible to the others.</li>
          <li>Remove worktrees you&apos;re done with (<Code>git worktree remove</Code>) so the list stays clean.</li>
        </UL>

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
