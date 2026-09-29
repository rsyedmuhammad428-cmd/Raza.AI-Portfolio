"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  "INITIALIZING RAZA.AI...",
  "Loading developer profile",
  "Loading projects",
  "Loading AI systems",
  "Loading interface",
  "SYSTEM READY",
];

const LINE_INTERVAL_MS = 170;
const HOLD_BEFORE_DISMISS_MS = 350;
const SESSION_KEY = "raza-ai-boot-shown";

export function SystemBoot() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  // Decide once, on mount, whether to run the sequence at all.
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown || prefersReducedMotion) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
    setVisible(true);
  }, [prefersReducedMotion]);

  // Advance the boot lines, then hold briefly and dismiss.
  useEffect(() => {
    if (!visible) return;

    if (lineIndex >= BOOT_LINES.length) {
      const dismissTimer = setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(false);
      }, HOLD_BEFORE_DISMISS_MS);
      return () => clearTimeout(dismissTimer);
    }

    const timer = setTimeout(() => setLineIndex((i) => i + 1), LINE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [visible, lineIndex]);

  function skip() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-base px-6"
        >
          <div className="w-64 space-y-1.5 font-mono text-sm text-ink-muted">
            {BOOT_LINES.slice(0, lineIndex).map((line, index) => {
              const isLast = index === BOOT_LINES.length - 1;
              const isCheckable = index > 0 && !isLast;
              return (
                <p key={line} className={isLast ? "text-accent" : undefined}>
                  {isCheckable ? "\u2713 " : ""}
                  {line}
                </p>
              );
            })}
          </div>

          <button
            type="button"
            onClick={skip}
            className="text-xs text-ink-faint underline-offset-4 hover:text-ink hover:underline"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
