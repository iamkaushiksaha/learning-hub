import type { LearningArticle } from "@/lib/learning-articles";

const toneClass = {
  accent: "learning-node-accent",
  teal: "learning-node-teal",
  coral: "learning-node-coral",
};

export function LearningDiagram({ visual }: { visual: LearningArticle["visual"] }) {
  return (
    <figure className={`learning-visual learning-visual-${visual.kind}`} aria-labelledby={`diagram-${slugify(visual.title)}`}>
      <svg className="learning-connectors" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`line-${slugify(visual.title)}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="0.55" stopColor="var(--text-3)" />
            <stop offset="1" stopColor="var(--cat-teal)" />
          </linearGradient>
          <marker id={`arrow-${slugify(visual.title)}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0L8 4L0 8Z" fill="var(--cat-teal)" />
          </marker>
        </defs>
        {visual.kind === "loop" || visual.kind === "orbit" ? (
          <>
            <ellipse cx="500" cy="210" rx="350" ry="145" fill="none" stroke={`url(#line-${slugify(visual.title)})`} strokeWidth="2" strokeDasharray="10 10" className="diagram-dash" />
            <circle cx="500" cy="210" r="68" fill="none" stroke="var(--border-strong)" strokeWidth="1" />
          </>
        ) : visual.kind === "layers" ? (
          [78, 142, 206, 270, 334].map((y, index) => (
            <path key={y} d={`M180 ${y}H820`} stroke={`url(#line-${slugify(visual.title)})`} strokeWidth={index === 0 ? 2 : 1} opacity={1 - index * 0.12} />
          ))
        ) : visual.kind === "split" ? (
          <>
            <path d="M120 210H370M370 210C470 210 445 95 565 95M370 210C470 210 445 325 565 325M730 95C820 95 805 210 880 210M730 325C820 325 805 210 880 210" fill="none" stroke={`url(#line-${slugify(visual.title)})`} strokeWidth="2" markerEnd={`url(#arrow-${slugify(visual.title)})`} />
          </>
        ) : (
          <path d="M90 210H910" fill="none" stroke={`url(#line-${slugify(visual.title)})`} strokeWidth="2" strokeDasharray={visual.kind === "spectrum" ? "0" : "10 9"} markerEnd={`url(#arrow-${slugify(visual.title)})`} className={visual.kind === "flow" ? "diagram-dash" : undefined} />
        )}
      </svg>
      <div className="learning-node-field">
        {visual.nodes.map((node, index) => (
          <div
            key={`${node.label}-${index}`}
            className={`learning-node ${node.tone ? toneClass[node.tone] : ""}`}
            style={{ "--node-index": index } as React.CSSProperties}
          >
            <span className="learning-node-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.label}</strong>
            <small>{node.detail}</small>
          </div>
        ))}
      </div>
      <figcaption>
        <span>{visual.title}</span>
        {visual.caption}
      </figcaption>
    </figure>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
