"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const nodes = [
  {
    slug: "git-collaboration",
    label: "Git collaboration",
    code: "01",
    x: "15%",
    y: "25%",
    tone: "teal",
    note: "Branches isolate work. Pull requests control where it meets.",
  },
  {
    slug: "detection-as-code-cicd",
    label: "Detection pipeline",
    code: "02",
    x: "72%",
    y: "19%",
    tone: "accent",
    note: "A governed route from an engineer's idea to production Sentinel.",
  },
  {
    slug: "validating-sentinel-detections",
    label: "Validation gates",
    code: "03",
    x: "76%",
    y: "68%",
    tone: "coral",
    note: "Static, schema, and functional tests catch different failures.",
  },
  {
    slug: "git-worktrees",
    label: "Parallel worktrees",
    code: "04",
    x: "18%",
    y: "73%",
    tone: "accent",
    note: "Several live branches, one shared repository history.",
  },
] as const;

const paths = [
  "M158 183 C270 145 365 170 520 150",
  "M540 180 C585 265 584 355 548 482",
  "M510 514 C365 558 275 548 160 515",
  "M129 480 C84 367 91 277 132 215",
  "M168 195 C285 285 390 390 525 492",
  "M520 170 C390 265 300 370 155 500",
];

export function KnowledgeField() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof nodes)[number]>(nodes[1]);

  return (
    <div className="relative aspect-square w-full max-w-[660px]" aria-label="Explore the Learning Atlas">
      <svg
        viewBox="0 0 680 680"
        role="img"
        aria-label="Four connected learning topics arranged around the Learning Atlas"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="fieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".18" />
            <stop offset="55%" stopColor="var(--accent)" stopOpacity=".04" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <circle cx="340" cy="340" r="282" fill="url(#fieldGlow)" />
        <circle cx="340" cy="340" r="238" className="atlas-orbit" />
        <circle cx="340" cy="340" r="156" className="atlas-orbit atlas-orbit-muted" />
        {paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className={i > 3 ? "atlas-path atlas-path-muted" : "atlas-path"}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: i > 3 ? 0.32 : 0.7 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {!reduce && (
          <>
            <motion.circle
              r="4"
              fill="var(--cat-teal)"
              filter="url(#softGlow)"
              animate={{ cx: [158, 330, 520], cy: [183, 152, 150], opacity: [0, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              r="4"
              fill="var(--cat-coral)"
              filter="url(#softGlow)"
              animate={{ cx: [540, 575, 548], cy: [180, 335, 482], opacity: [0, 1, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: 1, ease: "linear" }}
            />
          </>
        )}
        <g>
          <circle cx="340" cy="340" r="72" className="atlas-core" />
          <circle cx="340" cy="340" r="8" fill="var(--accent)" />
          <text x="340" y="322" textAnchor="middle" className="atlas-core-label">
            KAUSHIK&apos;S
          </text>
          <text x="340" y="348" textAnchor="middle" className="atlas-core-title">
            LEARNING
          </text>
          <text x="340" y="369" textAnchor="middle" className="atlas-core-title">
            ATLAS
          </text>
        </g>
      </svg>

      {nodes.map((node) => (
        <Link
          key={node.slug}
          href={`/topics/${node.slug}`}
          onMouseEnter={() => setActive(node)}
          onFocus={() => setActive(node)}
          className={`atlas-node atlas-node-${node.tone}`}
          style={{ left: node.x, top: node.y }}
          aria-label={`Open ${node.label}`}
        >
          <span className="atlas-node-code">{node.code}</span>
          <span>{node.label}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      ))}

      <motion.div
        key={active.slug}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-[20%] bottom-[8%] text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-3">
          Selected signal / {active.code}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-2">{active.note}</p>
      </motion.div>
    </div>
  );
}
