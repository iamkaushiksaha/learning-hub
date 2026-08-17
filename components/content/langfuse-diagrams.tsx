export function LangfuseArchitectureDiagram() {
  const services = [
    { x: 45, y: 82, w: 150, title: "Agent application", sub: "Langfuse SDK / OTel", tone: "dg-accent" },
    { x: 260, y: 82, w: 150, title: "Langfuse API", sub: "ingestion + web", tone: "dg-box" },
    { x: 475, y: 82, w: 150, title: "Object storage", sub: "durable event payloads", tone: "dg-box" },
    { x: 690, y: 82, w: 150, title: "Redis / Valkey", sub: "work queue", tone: "dg-box" },
    { x: 690, y: 278, w: 150, title: "Worker", sub: "async processing", tone: "dg-accent" },
    { x: 475, y: 278, w: 150, title: "ClickHouse", sub: "trace analytics", tone: "dg-teal" },
    { x: 260, y: 278, w: 150, title: "PostgreSQL", sub: "transactional data", tone: "dg-teal" },
  ];

  return (
    <svg viewBox="0 0 900 440" role="img" aria-labelledby="lf-arch-title lf-arch-desc" className="h-auto w-full">
      <title id="lf-arch-title">Langfuse event ingestion and storage architecture</title>
      <desc id="lf-arch-desc">The agent sends telemetry to the Langfuse API. Payloads are persisted and queued, a worker processes them, and data is stored in ClickHouse and PostgreSQL.</desc>
      <defs>
        <marker id="lf-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" className="fill-text-3" />
        </marker>
      </defs>
      <path d="M195 122H250M410 122H465M625 122H680M765 162V268M690 318H635M475 318H420" className="dg-line dg-flow" markerEnd="url(#lf-arrow)" />
      <path d="M765 162V220H550V268" className="dg-line" markerEnd="url(#lf-arrow)" />
      {services.map((service) => (
        <g key={service.title}>
          <rect x={service.x} y={service.y} width={service.w} height="80" rx="12" className={service.tone} strokeWidth="1.5" />
          <text x={service.x + service.w / 2} y={service.y + 34} textAnchor="middle" className="dg-title">{service.title}</text>
          <text x={service.x + service.w / 2} y={service.y + 56} textAnchor="middle" className="dg-sub">{service.sub}</text>
        </g>
      ))}
      <text x="45" y="405" className="dg-sub">Simplified logical view · Cloud and self-hosted deployments differ operationally</text>
    </svg>
  );
}

export function TelemetrySplitDiagram() {
  return (
    <svg viewBox="0 0 920 440" role="img" aria-labelledby="split-title split-desc" className="h-auto w-full">
      <title id="split-title">Recommended Langfuse and SIEM telemetry split</title>
      <desc id="split-desc">The agent sends sanitized detailed AI telemetry to Langfuse and minimal security events to a SIEM. The SOC correlates SIEM alerts with Langfuse investigation links.</desc>
      <defs>
        <marker id="split-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" className="fill-text-3" />
        </marker>
      </defs>
      <rect x="45" y="168" width="175" height="100" rx="14" className="dg-accent" strokeWidth="1.5" />
      <text x="132" y="207" textAnchor="middle" className="dg-title">Cybersecurity agent</text>
      <text x="132" y="232" textAnchor="middle" className="dg-sub">identity · tools · policy</text>

      <path d="M220 194C300 194 300 105 380 105" className="dg-line dg-flow" markerEnd="url(#split-arrow)" />
      <path d="M220 244C300 244 300 335 380 335" className="dg-line dg-flow" markerEnd="url(#split-arrow)" />

      <rect x="390" y="45" width="225" height="120" rx="14" className="dg-teal" strokeWidth="1.5" />
      <text x="502" y="83" textAnchor="middle" className="dg-title">Langfuse</text>
      <text x="502" y="108" textAnchor="middle" className="dg-sub">sanitized prompts · tool spans</text>
      <text x="502" y="130" textAnchor="middle" className="dg-sub">sessions · scores · evaluations</text>

      <rect x="390" y="275" width="225" height="120" rx="14" className="dg-coral" strokeWidth="1.5" />
      <text x="502" y="313" textAnchor="middle" className="dg-title">SIEM</text>
      <text x="502" y="338" textAnchor="middle" className="dg-sub">security decisions · identities</text>
      <text x="502" y="360" textAnchor="middle" className="dg-sub">cloud · endpoint · incidents</text>

      <path d="M615 105C685 105 685 194 735 194" className="dg-line" markerEnd="url(#split-arrow)" />
      <path d="M615 335C685 335 685 244 735 244" className="dg-line" markerEnd="url(#split-arrow)" />
      <rect x="745" y="168" width="135" height="100" rx="50" className="dg-box" strokeWidth="1.5" />
      <text x="812" y="207" textAnchor="middle" className="dg-title">SOC analyst</text>
      <text x="812" y="232" textAnchor="middle" className="dg-sub">correlate + respond</text>

      <text x="252" y="78" className="dg-sub">Deep AI execution evidence</text>
      <text x="252" y="390" className="dg-sub">Minimal normalized security events</text>
    </svg>
  );
}
