import { Sparkles, Download } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { TECHNOLOGIES } from "@/data/tech-stack";
import { getGithubPublicRepoCount } from "@/lib/github";
import { StatCard } from "@/components/StatCard";
import { NetworkDiagram } from "@/components/NetworkDiagram";
import { RazaAIHeroCard } from "@/components/RazaAIHeroCard";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/data/contact";

export async function Hero() {
  const githubRepoCount = await getGithubPublicRepoCount();

  const aiProjectCount = PROJECTS.filter((p) => p.category === "ai").length;
  const fullStackProjectCount = PROJECTS.filter(
    (p) => p.category === "fullstack",
  ).length;

  // Only real, verifiable numbers ever reach this array — if the GitHub
  // fetch fails, that stat is omitted rather than shown as a fake value.
  const stats = [
    { label: "AI Projects", value: aiProjectCount },
    { label: "Full Stack Projects", value: fullStackProjectCount },
    { label: "Technologies", value: TECHNOLOGIES.length },
    githubRepoCount !== null
      ? { label: "GitHub Repositories", value: githubRepoCount }
      : null,
  ].filter((stat): stat is { label: string; value: number } => stat !== null);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="section-shell relative overflow-hidden pt-32 pb-28 sm:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="font-mono text-sm text-accent">
            Full Stack Developer · AI / LLM Engineer · Agentic AI Systems
          </p>

          <h1 id="hero-heading" className="mt-5 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Syed Muhammad Raza Zaidi
          </h1>

          <p className="mt-6 max-w-md text-lg text-ink-muted">
            Building intelligent software that thinks, acts, and evolves.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#project-lab"
              className="touch-target rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink/90"
            >
              Explore my work
            </a>
            <a
              href="#raza-ai"
              className="touch-target gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Ask Raza AI
            </a>
            <a
              href={CONTACT.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="touch-target gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>
          </div>

          <div
            className={cn(
              "mt-14 grid grid-cols-2 gap-x-6 gap-y-8",
              stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3",
            )}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 lg:items-end">
          <NetworkDiagram />
          <RazaAIHeroCard />
        </div>
      </div>
    </section>
  );
}
