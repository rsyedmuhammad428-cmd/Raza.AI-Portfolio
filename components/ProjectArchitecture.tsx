"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SelectablePill } from "@/components/SelectablePill";
import type { ArchitectureStep } from "@/types/project";

type ProjectArchitectureProps = {
  steps: ArchitectureStep[];
};

export function ProjectArchitecture({ steps }: ProjectArchitectureProps) {
  const [activeId, setActiveId] = useState(steps[0]?.id);
  const active = steps.find((step) => step.id === activeId);

  return (
    <div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex shrink-0 items-center gap-1">
            <SelectablePill active={activeId === step.id} onClick={() => setActiveId(step.id)}>
              {step.label}
            </SelectablePill>
            {index < steps.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <p
        key={active?.id}
        aria-live="polite"
        className="mt-3 animate-fade-in text-sm text-ink-muted"
      >
        {active?.description}
      </p>
    </div>
  );
}
