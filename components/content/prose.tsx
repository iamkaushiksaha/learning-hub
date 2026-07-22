import type { ReactNode } from "react";

/** Shared text/heading/table primitives so topic pages stay consistent. */

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-11 mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight text-text"
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="my-3.5 text-[17px] leading-[1.75] text-text-2 [&_strong]:text-text [&_em]:text-text-2">
      {children}
    </p>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-xl leading-relaxed text-text-2">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="my-3.5 ml-5 list-disc space-y-1.5 text-[17px] leading-relaxed text-text-2 marker:text-text-3 [&_strong]:text-text [&_code]:text-text">
      {children}
    </ul>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-text">
      {children}
    </code>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-[14.5px]">
        {children}
      </table>
    </div>
  );
}

export function TH({ children }: { children?: ReactNode }) {
  return (
    <th className="border-b border-border bg-surface-2 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wide text-text-2">
      {children}
    </th>
  );
}

export function TD({
  children,
  head,
}: {
  children: ReactNode;
  head?: boolean;
}) {
  return (
    <td
      className={`border-b border-border px-3.5 py-2.5 align-top ${
        head ? "font-medium text-text" : "text-text-2"
      } [&_code]:text-text`}
    >
      {children}
    </td>
  );
}
