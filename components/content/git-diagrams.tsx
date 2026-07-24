/** Theme-aware SVG diagrams for the Git series. */

const marker = (id: string) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  </defs>
);

/** Shared-repo vs fork model, both converging on PR → review → merge. */
export function ContributionModelsDiagram() {
  return (
    <svg viewBox="0 0 680 240" role="img" aria-label="Shared-repo vs fork contribution models" className="w-full">
      {marker("arrCM")}
      <rect className="dg-teal" x="40" y="30" width="280" height="72" rx="6" />
      <text className="dg-title" x="180" y="56" textAnchor="middle">Shared-repo model</text>
      <text className="dg-sub" x="180" y="76" textAnchor="middle">you have write access:</text>
      <text className="dg-sub" x="180" y="92" textAnchor="middle">push branches to the repo</text>

      <rect className="dg-accent" x="360" y="30" width="280" height="72" rx="6" />
      <text className="dg-title" x="500" y="56" textAnchor="middle">Fork &amp; pull model</text>
      <text className="dg-sub" x="500" y="76" textAnchor="middle">no write access:</text>
      <text className="dg-sub" x="500" y="92" textAnchor="middle">push to your fork, PR back</text>

      <path className="dg-line" d="M180 102 V128 H340 V152" fill="none" markerEnd="url(#arrCM)" />
      <path className="dg-line" d="M500 102 V128 H340 V152" fill="none" markerEnd="url(#arrCM)" />

      <rect className="dg-box" x="170" y="154" width="340" height="56" rx="6" />
      <text className="dg-title" x="340" y="178" textAnchor="middle">Pull request → review → merge to main</text>
      <text className="dg-sub" x="340" y="196" textAnchor="middle">the common path for both models</text>
    </svg>
  );
}

/** The 6-step timeline of two people pushing to one branch. */
export function SameBranchCollisionDiagram() {
  const steps = [
    { cls: "dg-box", t: "Both pull the branch", s: "everyone starts at commit C0" },
    { cls: "dg-box", t: "A and B commit locally", s: "A makes C1, B makes C2" },
    { cls: "dg-teal", t: "A pushes first — succeeds", s: "remote branch advances to C1" },
    { cls: "dg-coral", t: "B pushes — rejected", s: "remote has C1 that B doesn't" },
    { cls: "dg-coral", t: "B runs git pull", s: "same lines changed → merge conflict" },
    { cls: "dg-teal", t: "B resolves, then pushes — succeeds", s: "remote now holds C1 + C2" },
  ];
  return (
    <svg viewBox="0 0 680 464" role="img" aria-label="What happens when two people push to the same branch" className="w-full">
      {marker("arrSB")}
      {steps.map((b, i) => {
        const y = 30 + i * 70;
        return (
          <g key={b.t}>
            <rect className={b.cls} x="60" y={y} width="560" height="52" rx="6" />
            <text className="dg-title" x="340" y={y + 21} textAnchor="middle">{b.t}</text>
            <text className="dg-sub" x="340" y={y + 39} textAnchor="middle">{b.s}</text>
            {i < steps.length - 1 && (
              <line className="dg-line" x1="340" y1={y + 52} x2="340" y2={y + 68} markerEnd="url(#arrSB)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** One .git shared by several working-tree folders on different branches. */
export function WorktreeDiagram() {
  return (
    <svg viewBox="0 0 680 288" role="img" aria-label="One .git repository shared by several working trees" className="w-full">
      {marker("arrWT")}
      <rect className="dg-box" x="240" y="30" width="200" height="56" rx="6" />
      <text className="dg-title" x="340" y="53" textAnchor="middle">one .git repository</text>
      <text className="dg-sub" x="340" y="71" textAnchor="middle">history · objects · refs</text>

      <path className="dg-line" d="M340 86 V116 H135 V150" fill="none" markerEnd="url(#arrWT)" />
      <line className="dg-line" x1="340" y1="86" x2="340" y2="150" markerEnd="url(#arrWT)" />
      <path className="dg-line" d="M340 86 V116 H545 V150" fill="none" markerEnd="url(#arrWT)" />

      <rect className="dg-teal" x="40" y="152" width="190" height="66" rx="6" />
      <text className="dg-title" x="135" y="176" textAnchor="middle">~/project</text>
      <text className="dg-sub" x="135" y="194" textAnchor="middle">branch: main</text>
      <text className="dg-sub" x="135" y="210" textAnchor="middle">the main working tree</text>

      <rect className="dg-accent" x="245" y="152" width="190" height="66" rx="6" />
      <text className="dg-title" x="340" y="176" textAnchor="middle">~/project-feature</text>
      <text className="dg-sub" x="340" y="194" textAnchor="middle">branch: feature-x</text>
      <text className="dg-sub" x="340" y="210" textAnchor="middle">added worktree</text>

      <rect className="dg-coral" x="450" y="152" width="190" height="66" rx="6" />
      <text className="dg-title" x="545" y="176" textAnchor="middle">~/project-hotfix</text>
      <text className="dg-sub" x="545" y="194" textAnchor="middle">branch: hotfix</text>
      <text className="dg-sub" x="545" y="210" textAnchor="middle">added worktree</text>

      <text className="dg-sub" x="340" y="252" textAnchor="middle">each folder holds real, editable files — all sharing the single .git,</text>
      <text className="dg-sub" x="340" y="268" textAnchor="middle">so every branch is live at once with no re-cloning</text>
    </svg>
  );
}
