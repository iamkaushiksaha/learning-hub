import Link from "next/link";
import { ArrowLeft, ArrowRight, FolderGit2, Layers } from "lucide-react";
import type { Topic } from "@/lib/topics";
import { seriesNeighbors, seriesTopics } from "@/lib/topics";

/** Small "Part N of M" banner shown under the title. */
export function SeriesBadge({ topic }: { topic: Topic }) {
  if (!topic.seriesId || !topic.part) return null;
  const total = seriesTopics(topic.seriesId).length;
  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3 py-1.5 text-[13px] text-text-2">
      <Layers size={14} className="text-accent" />
      <span className="text-text">{topic.seriesTitle}</span>
      <span className="text-text-3">· part {topic.part} of {total}</span>
    </div>
  );
}

/** Callout linking to the runnable companion example set. */
export function ExamplesCallout({ path }: { path: string }) {
  return (
    <div className="my-6 rounded-lg rounded-l-none border border-border border-l-4 border-l-accent bg-surface-1 px-5 py-4">
      <div className="mb-1.5 flex items-center gap-2">
        <FolderGit2 size={15} className="text-accent" />
        <span className="text-xs font-medium uppercase tracking-wide text-text-2">
          Runnable companion example
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-text-2">
        Clone the repo and open{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-text">
          {path}
        </code>{" "}
        — the analytic rule (ARM + Terraform), the validation scripts, and the
        GitHub Actions pipeline from this article, ready to run in your own lab.
        Try it now:{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-text">
          python3 scripts/lint_rule.py rules/*.json
        </code>
      </p>
    </div>
  );
}

/** Prev/next chapter cards at the foot of a series page. */
export function SeriesNav({ topic }: { topic: Topic }) {
  const { prev, next } = seriesNeighbors(topic);
  if (!prev && !next) return null;
  return (
    <nav className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/topics/${prev.slug}`}
          className="group rounded-xl border border-border bg-surface-1 p-4 transition-colors hover:border-accent"
        >
          <span className="flex items-center gap-1.5 text-xs text-text-3">
            <ArrowLeft size={13} /> Part {prev.part}
          </span>
          <span className="mt-1 block text-sm font-medium text-text group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/topics/${next.slug}`}
          className="group rounded-xl border border-border bg-surface-1 p-4 text-right transition-colors hover:border-accent"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-text-3">
            Part {next.part} <ArrowRight size={13} />
          </span>
          <span className="mt-1 block text-sm font-medium text-text group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
