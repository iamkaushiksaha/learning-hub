"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  filename,
}: {
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-[var(--code-border)]">
      <div className="flex items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-header)] px-4 py-2">
        <span className="font-mono text-xs text-[var(--code-muted)]">
          {filename ?? "shell"}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[var(--code-muted)] transition-colors hover:text-[var(--code-text)]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[var(--code-bg)] px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono text-[var(--code-text)]">{code}</code>
      </pre>
    </div>
  );
}
