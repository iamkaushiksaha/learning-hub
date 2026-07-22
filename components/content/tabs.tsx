"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

export interface Tab {
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-5">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              i === active ? "text-accent" : "text-text-3 hover:text-text"
            }`}
          >
            {tab.label}
            {i === active && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4 text-[15px] leading-relaxed text-text-2 [&_strong]:text-text [&_code]:text-text">
        {tabs[active].content}
      </div>
    </div>
  );
}
