"use client";

import { useState } from "react";
import { TECHNOLOGIES, TECH_CATEGORIES } from "@/data/tech-stack";
import { SelectablePill } from "@/components/SelectablePill";

export function TechStack() {
  const [activeName, setActiveName] = useState<string | null>(null);
  const active = TECHNOLOGIES.find((tech) => tech.name === activeName);

  return (
    <section id="stack" aria-labelledby="stack-heading" className="section-shell py-24">
      <h2 id="stack-heading" className="text-2xl font-medium text-ink sm:text-3xl">Tech Stack</h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Click a technology to see where it&apos;s actually used.
      </p>

      <div className="mt-10 space-y-8">
        {TECH_CATEGORIES.map((category) => {
          const items = TECHNOLOGIES.filter((tech) => tech.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <p className="text-xs text-ink-faint">{category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((tech) => (
                  <SelectablePill
                    key={tech.name}
                    active={activeName === tech.name}
                    onClick={() =>
                      setActiveName((current) => (current === tech.name ? null : tech.name))
                    }
                  >
                    {tech.name}
                  </SelectablePill>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {active && (
        <p
          key={active.name}
          aria-live="polite"
          className="mt-8 animate-fade-in font-mono text-sm text-ink-muted"
        >
          <span className="text-accent">{active.name}</span> — used in:{" "}
          {active.usedIn.join(", ")}
        </p>
      )}
    </section>
  );
}
