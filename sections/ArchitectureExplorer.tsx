"use client";

import { useState } from "react";
import { TRUNK_TOP, AGENTS, TRUNK_BOTTOM } from "@/data/architecture";
import { ArchitectureNode } from "@/components/ArchitectureNode";

const ALL_NODES = [...TRUNK_TOP, ...AGENTS, ...TRUNK_BOTTOM];

function Connector() {
  return <div aria-hidden="true" className="h-4 w-px bg-base-border" />;
}

export function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState<string>(TRUNK_TOP[0]?.id ?? "");
  const active = ALL_NODES.find((node) => node.id === activeId);

  return (
    <section id="architecture" aria-labelledby="architecture-heading" className="section-shell py-24">
      <h2 id="architecture-heading" className="text-2xl font-medium text-ink sm:text-3xl">
        Architecture Explorer
      </h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        How AI Software Engineer turns a task into a reviewed pull request.
        Click any stage.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        {TRUNK_TOP.map((node) => (
          <div key={node.id} className="flex flex-col items-center gap-3">
            <ArchitectureNode
              label={node.label}
              active={activeId === node.id}
              onClick={() => setActiveId(node.id)}
            />
            <Connector />
          </div>
        ))}

        <p className="font-mono text-xs text-ink-faint">Agents</p>

        <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto">
          {AGENTS.map((node) => (
            <ArchitectureNode
              key={node.id}
              label={node.label}
              active={activeId === node.id}
              emphasis
              onClick={() => setActiveId(node.id)}
            />
          ))}
        </div>

        <Connector />

        {TRUNK_BOTTOM.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center gap-3">
            <ArchitectureNode
              label={node.label}
              active={activeId === node.id}
              onClick={() => setActiveId(node.id)}
            />
            {index < TRUNK_BOTTOM.length - 1 && <Connector />}
          </div>
        ))}
      </div>

      {active && (
        <div className="mx-auto mt-8 max-w-md text-center">
          <p className="font-mono text-sm text-accent">{active.label}</p>
          {active.responsibilities ? (
            <ul className="mt-2 space-y-1 text-sm text-ink-muted">
              {active.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">{active.description}</p>
          )}
        </div>
      )}
    </section>
  );
}
