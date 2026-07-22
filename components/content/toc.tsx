"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  label: string;
}

export function Toc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      let current = entries[0]?.id;
      for (const e of entries) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= 100) current = e.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [entries]);

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto text-sm lg:block">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-text-3">
        On this page
      </p>
      <ul>
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`block border-l-2 py-1.5 pl-3 transition-colors ${
                active === e.id
                  ? "border-accent font-medium text-accent"
                  : "border-border text-text-2 hover:text-text"
              }`}
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
