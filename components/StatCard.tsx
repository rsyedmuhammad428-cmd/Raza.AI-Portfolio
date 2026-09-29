"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  const ref = useRef<HTMLDListElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const durationMs = 700;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <dl ref={ref}>
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="mt-1 font-mono text-2xl text-ink tabular-nums">{display}</dd>
    </dl>
  );
}
