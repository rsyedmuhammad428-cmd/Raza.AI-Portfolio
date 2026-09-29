import { ArrowRight } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";

export function CurrentlyBuilding() {
  return (
    <section id="currently-building" aria-labelledby="currently-building-heading" className="section-shell py-16">
      <GlassPanel className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-mono text-xs text-accent">Currently building</p>
          <h2 id="currently-building-heading" className="mt-2 text-lg font-medium text-ink">
            AI Software Engineer
          </h2>
          <p className="mt-1 max-w-md text-sm text-ink-muted">
            Agentic software development workflow with repository-aware automation.
          </p>
          <span className="mt-3 inline-block rounded-full border border-base-border px-3 py-1 font-mono text-[11px] text-ink-faint">
            EXPERIMENTAL
          </span>
        </div>

        <a
          href="#project-lab"
          className="touch-target shrink-0 gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10"
        >
          Explore project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </GlassPanel>
    </section>
  );
}
