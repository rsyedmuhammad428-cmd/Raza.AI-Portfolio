"use client";

import { Sparkles } from "lucide-react";
import { EXAMPLE_QUESTIONS } from "@/data/example-questions";
import { useRazaAIPanel } from "@/hooks/useRazaAIPanel";
import { GlassPanel } from "@/components/GlassPanel";

export function RazaAISection() {
  const { open, askQuestion } = useRazaAIPanel();

  return (
    <section id="raza-ai" aria-labelledby="raza-ai-heading" className="section-shell py-24">
      <h2 id="raza-ai-heading" className="text-2xl font-medium text-ink sm:text-3xl">Raza AI</h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        An assistant grounded only in this portfolio&apos;s real data. Ask it about
        the projects, skills, or experience above — if something isn&apos;t in the
        portfolio, it says so instead of guessing.
      </p>

      <GlassPanel className="mt-8 p-6 sm:p-8">
        <p className="font-mono text-sm text-accent">Try asking</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => askQuestion(question)}
              className="touch-target rounded-full border border-base-border px-3.5 py-1.5 text-left text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              {question}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={open}
          className="touch-target mt-6 gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink/90"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Open Raza AI
        </button>
      </GlassPanel>
    </section>
  );
}
