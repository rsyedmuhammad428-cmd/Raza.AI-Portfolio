"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  emphasis?: boolean;
};

const NODES: Node[] = [
  { id: "ai", label: "AI", x: 180, y: 36, emphasis: true },
  { id: "rag", label: "RAG", x: 70, y: 152 },
  { id: "agents", label: "AGENTS", x: 180, y: 152 },
  { id: "llm", label: "LLM", x: 290, y: 152 },
  { id: "raza", label: "RAZA", x: 180, y: 264, emphasis: true },
];

const EDGES: Array<[string, string]> = [
  ["ai", "rag"],
  ["ai", "agents"],
  ["ai", "llm"],
  ["rag", "raza"],
  ["agents", "raza"],
  ["llm", "raza"],
];

function nodeById(id: string) {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node id: ${id}`);
  return node;
}

export function NetworkDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 360 300"
      role="img"
      aria-label="Diagram: an AI layer routes through RAG, agent orchestration, and an LLM, converging into Raza's engineering work"
      className="w-full max-w-sm"
    >
      {EDGES.map(([fromId, toId], index) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <motion.line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y + 16}
            x2={to.x}
            y2={to.y - 16}
            stroke="#232733"
            strokeWidth={1.5}
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
          />
        );
      })}

      {NODES.map((node, index) => (
        <motion.g
          key={node.id}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.35,
            delay: prefersReducedMotion ? 0 : 0.45 + index * 0.06,
          }}
        >
          <rect
            x={node.x - 42}
            y={node.y - 16}
            width={84}
            height={32}
            rx={8}
            fill="#12151C"
            stroke={node.emphasis ? "#D9A15A" : "#232733"}
            strokeWidth={1.5}
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11}
            fill={node.emphasis ? "#D9A15A" : "#9297A6"}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
