/** Hand-authored, theme-aware SVG diagrams for the Detection-as-Code topic.
 *  The hero pipeline gets the `dg-flow` animated connectors (the one
 *  looping element per the motion discipline); the IaC diagram is static. */

const arrowMarker = (id: string) => (
  <defs>
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path
        d="M2 1L8 5L2 9"
        fill="none"
        stroke="var(--text-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </marker>
  </defs>
);

export function PipelineDiagram() {
  return (
    <svg viewBox="0 0 680 520" role="img" aria-label="End-to-end detection-as-code flow" className="w-full">
      {arrowMarker("arrP")}
      <g>
        <rect className="dg-accent" x="40" y="60" width="180" height="52" rx="6" />
        <text className="dg-title" x="130" y="82" textAnchor="middle">Author in dev UI</text>
        <text className="dg-sub" x="130" y="99" textAnchor="middle">create and test rule</text>
        <rect className="dg-accent" x="260" y="60" width="170" height="52" rx="6" />
        <text className="dg-title" x="345" y="82" textAnchor="middle">Export rule JSON</text>
        <text className="dg-sub" x="345" y="99" textAnchor="middle">ARM template</text>
        <rect className="dg-teal" x="470" y="60" width="170" height="52" rx="6" />
        <text className="dg-title" x="555" y="82" textAnchor="middle">Feature branch</text>
        <text className="dg-sub" x="555" y="99" textAnchor="middle">commit the JSON</text>
        <line className="dg-line dg-flow" x1="222" y1="86" x2="256" y2="86" markerEnd="url(#arrP)" />
        <line className="dg-line dg-flow" x1="432" y1="86" x2="466" y2="86" markerEnd="url(#arrP)" />
      </g>
      <path className="dg-line dg-flow" d="M555 114 V141 H130 V166" markerEnd="url(#arrP)" />
      <g>
        <rect className="dg-teal" x="40" y="170" width="180" height="52" rx="6" />
        <text className="dg-title" x="130" y="192" textAnchor="middle">Pull request</text>
        <text className="dg-sub" x="130" y="209" textAnchor="middle">peer review gate</text>
        <rect className="dg-teal" x="260" y="170" width="200" height="52" rx="6" />
        <text className="dg-title" x="360" y="192" textAnchor="middle">Automated checks</text>
        <text className="dg-sub" x="360" y="209" textAnchor="middle">KQL syntax, metadata</text>
        <rect className="dg-teal" x="480" y="170" width="160" height="52" rx="6" />
        <text className="dg-title" x="560" y="192" textAnchor="middle">Merge to develop</text>
        <text className="dg-sub" x="560" y="209" textAnchor="middle">triggers deploy</text>
        <line className="dg-line dg-flow" x1="222" y1="196" x2="256" y2="196" markerEnd="url(#arrP)" />
        <line className="dg-line dg-flow" x1="462" y1="196" x2="476" y2="196" markerEnd="url(#arrP)" />
      </g>
      <path className="dg-line dg-flow" d="M560 224 V251 H140 V276" markerEnd="url(#arrP)" />
      <g>
        <rect className="dg-teal" x="40" y="280" width="200" height="52" rx="6" />
        <text className="dg-title" x="140" y="302" textAnchor="middle">GitHub Actions deploy</text>
        <text className="dg-sub" x="140" y="319" textAnchor="middle">to dev workspace</text>
        <rect className="dg-box" x="280" y="280" width="200" height="52" rx="6" />
        <text className="dg-title" x="380" y="302" textAnchor="middle">Dev Sentinel</text>
        <text className="dg-sub" x="380" y="319" textAnchor="middle">does it fire? noisy?</text>
        <rect className="dg-accent" x="510" y="280" width="130" height="52" rx="6" />
        <text className="dg-title" x="575" y="302" textAnchor="middle">Sign-off</text>
        <text className="dg-sub" x="575" y="319" textAnchor="middle">senior approval</text>
        <line className="dg-line dg-flow" x1="242" y1="306" x2="276" y2="306" markerEnd="url(#arrP)" />
        <line className="dg-line dg-flow" x1="482" y1="306" x2="506" y2="306" markerEnd="url(#arrP)" />
      </g>
      <path className="dg-line dg-flow" d="M575 334 V361 H130 V386" markerEnd="url(#arrP)" />
      <g>
        <rect className="dg-teal" x="40" y="390" width="180" height="52" rx="6" />
        <text className="dg-title" x="130" y="412" textAnchor="middle">PR to main</text>
        <text className="dg-sub" x="130" y="429" textAnchor="middle">protected branch</text>
        <rect className="dg-teal" x="260" y="390" width="200" height="52" rx="6" />
        <text className="dg-title" x="360" y="412" textAnchor="middle">GitHub Actions deploy</text>
        <text className="dg-sub" x="360" y="429" textAnchor="middle">to prod workspace</text>
        <rect className="dg-box" x="500" y="390" width="140" height="52" rx="6" />
        <text className="dg-title" x="570" y="412" textAnchor="middle">Prod Sentinel</text>
        <text className="dg-sub" x="570" y="429" textAnchor="middle">live detections</text>
        <line className="dg-line dg-flow" x1="222" y1="416" x2="256" y2="416" markerEnd="url(#arrP)" />
        <line className="dg-line dg-flow" x1="462" y1="416" x2="496" y2="416" markerEnd="url(#arrP)" />
      </g>
      <rect className="dg-accent" x="40" y="478" width="12" height="12" rx="3" />
      <text className="dg-sub" x="60" y="488">human step</text>
      <rect className="dg-teal" x="170" y="478" width="12" height="12" rx="3" />
      <text className="dg-sub" x="190" y="488">GitHub / pipeline</text>
      <rect className="dg-box" x="330" y="478" width="12" height="12" rx="3" />
      <text className="dg-sub" x="350" y="488">Sentinel workspace</text>
    </svg>
  );
}

export function IacDiagram() {
  return (
    <svg viewBox="0 0 680 300" role="img" aria-label="Declarative IaC vs bridge vs imperative API, under one governance" className="w-full">
      {arrowMarker("arrI")}
      <rect className="dg-accent" x="40" y="30" width="190" height="140" rx="6" />
      <text className="dg-title" x="135" y="56" textAnchor="middle">Declarative IaC</text>
      <text className="dg-sub" x="135" y="78" textAnchor="middle">ARM, Bicep, Terraform</text>
      <text className="dg-sub" x="135" y="104" textAnchor="middle">use: stable config</text>
      <text className="dg-sub" x="135" y="126" textAnchor="middle">e.g. rules, workbooks</text>
      <text className="dg-sub" x="135" y="148" textAnchor="middle">win: drift + rollback</text>
      <rect className="dg-teal" x="245" y="30" width="190" height="140" rx="6" />
      <text className="dg-title" x="340" y="56" textAnchor="middle">Bridge layer</text>
      <text className="dg-sub" x="340" y="78" textAnchor="middle">AzAPI, deployScripts</text>
      <text className="dg-sub" x="340" y="104" textAnchor="middle">use: no native resource</text>
      <text className="dg-sub" x="340" y="126" textAnchor="middle">e.g. lagging features</text>
      <text className="dg-sub" x="340" y="148" textAnchor="middle">win: state + governance</text>
      <rect className="dg-coral" x="450" y="30" width="190" height="140" rx="6" />
      <text className="dg-title" x="545" y="56" textAnchor="middle">Imperative API</text>
      <text className="dg-sub" x="545" y="78" textAnchor="middle">PowerShell, REST</text>
      <text className="dg-sub" x="545" y="104" textAnchor="middle">use: actions, not state</text>
      <text className="dg-sub" x="545" y="126" textAnchor="middle">e.g. bulk operations</text>
      <text className="dg-sub" x="545" y="148" textAnchor="middle">win: full API reach</text>
      <line className="dg-line" x1="135" y1="170" x2="135" y2="206" markerEnd="url(#arrI)" />
      <line className="dg-line" x1="340" y1="170" x2="340" y2="206" markerEnd="url(#arrI)" />
      <line className="dg-line" x1="545" y1="170" x2="545" y2="206" markerEnd="url(#arrI)" />
      <rect className="dg-box" x="40" y="208" width="600" height="58" rx="6" />
      <text className="dg-title" x="340" y="233" textAnchor="middle">Same git, PR, and pipeline governance</text>
      <text className="dg-sub" x="340" y="252" textAnchor="middle">the repo stays the source of truth</text>
    </svg>
  );
}
