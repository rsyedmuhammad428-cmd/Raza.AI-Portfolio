"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * One-time fade-and-rise as a section scrolls into view. Skipped entirely for
 * reduced-motion users. (A <noscript> rule in the root layout keeps content
 * visible if JavaScript is disabled.)
 */
export function Reveal({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
