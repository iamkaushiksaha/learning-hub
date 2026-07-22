import type { Variants, Transition } from "motion/react";

export const easeOutQuint: Transition["ease"] = [0.22, 1, 0.36, 1];

export const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOutQuint },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: easeOutQuint } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const viewportOnce = { once: true, margin: "-72px" } as const;
