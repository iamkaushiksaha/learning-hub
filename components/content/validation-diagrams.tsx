/** Theme-aware SVG diagrams for the detection-validation topic. */

const marker = (id: string) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  </defs>
);

/** Three validation tiers mapped to app-sec analogs and pipeline stage. */
export function TiersDiagram() {
  const rows = [
    { cls: "dg-teal", t: "Static lint", s: "structure & metadata", analog: "≈ SAST", stage: "CI · on the PR" },
    { cls: "dg-accent", t: "KQL syntax + schema", s: "resolve vs tables", analog: "≈ compile", stage: "CI · read-only" },
    { cls: "dg-coral", t: "Functional test", s: "does it fire? noisy?", analog: "≈ DAST", stage: "CD · after merge" },
  ];
  return (
    <svg viewBox="0 0 680 300" role="img" aria-label="Three tiers of KQL validation mapped to SAST, compile, and DAST" className="w-full">
      {marker("arrT")}
      <text className="dg-sub" x="130" y="28" textAnchor="middle">the check</text>
      <text className="dg-sub" x="345" y="28" textAnchor="middle">app-sec analog</text>
      <text className="dg-sub" x="555" y="28" textAnchor="middle">pipeline stage</text>
      {rows.map((r, i) => {
        const y = 44 + i * 82;
        return (
          <g key={r.t}>
            <rect className={r.cls} x="30" y={y} width="200" height="64" rx="6" />
            <text className="dg-title" x="130" y={y + 28} textAnchor="middle">{r.t}</text>
            <text className="dg-sub" x="130" y={y + 47} textAnchor="middle">{r.s}</text>
            <line className="dg-line" x1="232" y1={y + 32} x2="266" y2={y + 32} markerEnd="url(#arrT)" />
            <rect className="dg-box" x="268" y={y} width="150" height="64" rx="6" />
            <text className="dg-title" x="343" y={y + 37} textAnchor="middle">{r.analog}</text>
            <line className="dg-line" x1="420" y1={y + 32} x2="454" y2={y + 32} markerEnd="url(#arrT)" />
            <rect className="dg-box" x="456" y={y} width="200" height="64" rx="6" />
            <text className="dg-title" x="556" y={y + 37} textAnchor="middle">{r.stage}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Where each check sits on the pipeline: static gate before merge, dynamic after. */
export function ValidationPipelineDiagram() {
  const boxes = [
    { y: 34, cls: "dg-box", t: "Open pull request", s: "feature branch → PR", tag: "" },
    { y: 114, cls: "dg-teal", t: "CI — static checks", s: "syntax · metadata · validate", tag: "≈ SAST + lint" },
    { y: 194, cls: "dg-accent", t: "Peer review", s: "logic & false positives", tag: "≈ code review" },
    { y: 280, cls: "dg-teal", t: "Merge → deploy to dev", s: "auto-deploy to dev workspace", tag: "" },
    { y: 360, cls: "dg-coral", t: "CD — dynamic test", s: "does it fire? noisy?", tag: "≈ DAST" },
    { y: 440, cls: "dg-box", t: "Promote to prod", s: "PR to main → prod deploy", tag: "" },
  ];
  return (
    <svg viewBox="0 0 680 520" role="img" aria-label="KQL checks placed on the CI/CD pipeline" className="w-full">
      {marker("arrV")}
      {boxes.map((b, i) => (
        <g key={b.t}>
          <rect className={b.cls} x="190" y={b.y} width="300" height="52" rx="6" />
          <text className="dg-title" x="340" y={b.y + 22} textAnchor="middle">{b.t}</text>
          <text className="dg-sub" x="340" y={b.y + 39} textAnchor="middle">{b.s}</text>
          {b.tag && <text className="dg-sub" x="500" y={b.y + 30}>{b.tag}</text>}
          {i < boxes.length - 1 && (
            <line className="dg-line" x1="340" y1={b.y + 52} x2="340" y2={boxes[i + 1].y - 2} markerEnd="url(#arrV)" />
          )}
        </g>
      ))}
      <text className="dg-sub" x="40" y="145">CI gate</text>
      <text className="dg-sub" x="40" y="386">CD stage</text>
    </svg>
  );
}
