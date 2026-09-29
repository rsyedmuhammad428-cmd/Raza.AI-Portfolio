import { ArrowRight, Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";

export function RazaAIHeroCard() {
  return (
    <GlassPanel className="w-full max-w-sm p-0">
      <a
        href="#raza-ai"
        className="group block p-6 transition-colors hover:border-accent/50"
      >
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="font-mono text-sm">Raza AI</span>
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          I&apos;m Raza&apos;s AI portfolio assistant. Ask me about projects,
          skills, experience, or how the AI systems are built.
        </p>

        <p className="mt-4 rounded-md border border-base-border bg-black/20 px-3 py-2 font-mono text-xs text-ink-faint">
          &quot;Which projects use LangGraph?&quot;
        </p>

        <div className="mt-4 flex items-center justify-between rounded-full border border-base-border px-4 py-2 text-sm text-ink-faint transition-colors group-hover:border-accent/40 group-hover:text-ink">
          Ask something
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </a>
    </GlassPanel>
  );
}
