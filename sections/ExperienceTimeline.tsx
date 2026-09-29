import { TIMELINE } from "@/data/experience";
import { GlassPanel } from "@/components/GlassPanel";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-shell py-24">
      <h2 id="experience-heading" className="text-2xl font-medium text-ink sm:text-3xl">
        Experience
      </h2>
      <p className="mt-2 max-w-xl text-ink-muted">A short, factual timeline.</p>

      {/* Mobile / narrow: a single rail down the left, entries stacked beside it.
          sm+: the rail moves to the top and entries sit in a row beneath it —
          each card only as tall as its own content, never stretched to match
          the others. */}
      <ol className="relative mt-12 flex flex-col gap-10 sm:mt-16 sm:flex-row sm:gap-6">
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-base-border sm:left-0 sm:right-0 sm:top-[7px] sm:h-px sm:w-full"
        />

        {TIMELINE.map((entry) => (
          <li key={entry.id} className="relative flex-1 pl-8 sm:pl-0">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-base sm:left-0 sm:top-0"
            />
            <div className="sm:pt-8">
              <p className="font-mono text-sm text-accent">{entry.year}</p>
              <GlassPanel className="mt-3 p-4">
                {entry.title && (
                  <h3 className="font-medium text-ink text-sm">{entry.title}</h3>
                )}
                {entry.organization && (
                  <p className="text-xs text-accent/80 font-mono mb-2">{entry.organization}</p>
                )}
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  {entry.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </GlassPanel>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
