"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock3, FlaskConical, Layers3 } from "lucide-react";
import type { Topic } from "@/lib/topics";
import { fadeUp } from "@/lib/motion";

export function TopicCard({ topic }: { topic: Topic }) {
  const reduce = useReducedMotion();

  return (
    <motion.article variants={reduce ? undefined : fadeUp} className="group min-w-0">
      <Link href={`/topics/${topic.slug}`} className="block focus-visible:outline-none">
        <motion.div
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-xl border border-border bg-surface-1 transition-colors group-hover:border-border-strong group-focus-visible:ring-2 group-focus-visible:ring-accent"
        >
          <TopicPreview topic={topic} />
          <div className="p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
              <span>{topic.visualType.replace("-", " ")}</span>
              <span aria-hidden="true">/</span>
              <span>{topic.difficulty}</span>
              {topic.examples && (
                <>
                  <span aria-hidden="true">/</span>
                  <span className="inline-flex items-center gap-1 text-cat-teal">
                    <FlaskConical size={11} aria-hidden="true" />
                    lab
                  </span>
                </>
              )}
            </div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium leading-snug tracking-tight text-text">
                {topic.title}
              </h3>
              <ArrowUpRight
                size={17}
                className="mt-1 shrink-0 text-text-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-2">
              {topic.outcome}
            </p>
            <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-text-3">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={13} aria-hidden="true" />
                {topic.readingMinutes} min
              </span>
              {topic.seriesTitle && (
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <Layers3 size={13} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {topic.seriesTitle} · {topic.part}
                  </span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

function TopicPreview({ topic }: { topic: Topic }) {
  const isGit = topic.category === "git";
  const isAi = topic.category === "ai";
  const accent = isGit
    ? "var(--cat-teal)"
    : isAi
      ? "var(--atlas-cyan)"
      : "var(--accent)";
  const alert = topic.visualType === "decision-tree" ? "var(--cat-coral)" : accent;

  return (
    <div className="topic-preview relative aspect-[16/9] overflow-hidden border-b border-border bg-[var(--code-bg)]" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--code-muted)]">
        <span>Atlas / {topic.visualType}</span>
        <span>{topic.verifiedAt}</span>
      </div>
      <svg viewBox="0 0 640 340" className="h-full w-full">
        <defs>
          <radialGradient id={`preview-${topic.slug}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity=".16" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <marker
            id={`arrow-${topic.slug}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M2 1L8 5L2 9" fill="none" stroke={accent} strokeWidth="1.5" />
          </marker>
        </defs>
        <rect width="640" height="340" fill={`url(#preview-${topic.slug})`} />
        {isAi && (
          <>
            <path
              d="M84 170 H556"
              className="topic-preview-path"
              markerEnd={`url(#arrow-${topic.slug})`}
            />
            {[
              ["ML", 90, 154],
              ["NN", 194, 154],
              ["LLM", 298, 142],
              ["AGENT", 414, 142],
              ["RAG", 530, 154],
            ].map(([label, x, y], index) => (
              <g key={label}>
                <circle
                  cx={x}
                  cy={170}
                  r={index === 2 || index === 3 ? 31 : 22}
                  className={index === 3 ? "topic-preview-node topic-preview-node-hot" : "topic-preview-node"}
                />
                <text
                  x={x}
                  y={y}
                  dy={index === 2 || index === 3 ? 34 : 23}
                  textAnchor="middle"
                  className="topic-preview-label"
                >
                  {label}
                </text>
              </g>
            ))}
            <text x="320" y="250" textAnchor="middle" className="topic-preview-sub">
              LEARN → REASON → ACT → RETRIEVE
            </text>
          </>
        )}
        {!isAi && topic.visualType === "sequence" && (
          <>
            {[80, 240, 400].map((x, i) => (
              <g key={x}>
                <rect x={x} y={135} width="112" height="62" rx="8" className="topic-preview-node" />
                <text x={x + 56} y="162" textAnchor="middle" className="topic-preview-label">
                  {["PUSH", "REJECT", "RESOLVE"][i]}
                </text>
                <text x={x + 56} y="181" textAnchor="middle" className="topic-preview-sub">
                  {["C1", "non-fast-forward", "C1 + C2"][i]}
                </text>
              </g>
            ))}
            <path d="M194 166 H234" className="topic-preview-path" markerEnd={`url(#arrow-${topic.slug})`} />
            <path d="M354 166 H394" className="topic-preview-path" markerEnd={`url(#arrow-${topic.slug})`} />
          </>
        )}
        {!isAi && topic.visualType === "architecture" && (
          <>
            <rect x="235" y="72" width="170" height="58" rx="8" className="topic-preview-node" />
            <text x="320" y="98" textAnchor="middle" className="topic-preview-label">
              {isGit ? "ONE .GIT" : "RULE REPOSITORY"}
            </text>
            <text x="320" y="116" textAnchor="middle" className="topic-preview-sub">
              source of truth
            </text>
            {[70, 255, 440].map((x, i) => (
              <g key={x}>
                <rect x={x} y={220} width="130" height="56" rx="8" className="topic-preview-node" />
                <text x={x + 65} y="247" textAnchor="middle" className="topic-preview-label">
                  {isGit ? ["MAIN", "FEATURE", "HOTFIX"][i] : ["AUTHOR", "DEV", "PROD"][i]}
                </text>
                <text x={x + 65} y="264" textAnchor="middle" className="topic-preview-sub">
                  {isGit ? "worktree" : ["human", "validate", "deploy"][i]}
                </text>
                <path
                  d={`M320 132 V174 H${x + 65} V216`}
                  className="topic-preview-path"
                  markerEnd={`url(#arrow-${topic.slug})`}
                />
              </g>
            ))}
          </>
        )}
        {!isAi && topic.visualType === "decision-tree" && (
          <>
            <path d="M320 92 V142 L175 220" className="topic-preview-path" />
            <path d="M320 142 L465 220" className="topic-preview-path topic-preview-path-alert" />
            <rect x="245" y="66" width="150" height="58" rx="8" className="topic-preview-node" />
            <text x="320" y="92" textAnchor="middle" className="topic-preview-label">KQL CHANGE</text>
            <text x="320" y="110" textAnchor="middle" className="topic-preview-sub">which gate?</text>
            <rect x="100" y="220" width="150" height="58" rx="8" className="topic-preview-node" />
            <text x="175" y="247" textAnchor="middle" className="topic-preview-label">STATIC / SCHEMA</text>
            <text x="175" y="265" textAnchor="middle" className="topic-preview-sub">shift left</text>
            <rect x="390" y="220" width="150" height="58" rx="8" className="topic-preview-node" />
            <text x="465" y="247" textAnchor="middle" className="topic-preview-label" style={{ fill: alert }}>FUNCTIONAL</text>
            <text x="465" y="265" textAnchor="middle" className="topic-preview-sub">does it fire?</text>
          </>
        )}
      </svg>
    </div>
  );
}
