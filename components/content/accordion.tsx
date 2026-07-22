"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

export interface AccordionItem {
  summary: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-surface-1">
      {items.map((item, i) => (
        <Row key={item.summary} item={item} last={i === items.length - 1} />
      ))}
    </div>
  );
}

function Row({ item, last }: { item: AccordionItem; last: boolean }) {
  const [open, setOpen] = useState(Boolean(item.defaultOpen));
  const reduce = useReducedMotion();

  return (
    <div className={last ? "" : "border-b border-border"}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[15px] font-medium text-text"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent"
        >
          <Plus size={16} />
        </motion.span>
        {item.summary}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pl-12 text-[14.5px] leading-relaxed text-text-2 [&_strong]:text-text [&_code]:text-text">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
