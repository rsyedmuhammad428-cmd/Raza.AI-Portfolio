import { SystemBoot } from "@/components/SystemBoot";
import { Hero } from "@/sections/Hero";
import { ProjectLab } from "@/sections/ProjectLab";
import { ArchitectureExplorer } from "@/sections/ArchitectureExplorer";
import { TechStack } from "@/sections/TechStack";
import { ExperienceTimeline } from "@/sections/ExperienceTimeline";
import { GitHubActivity } from "@/sections/GitHubActivity";
import { CurrentlyBuilding } from "@/sections/CurrentlyBuilding";
import { RazaAISection } from "@/sections/RazaAISection";
import { Contact } from "@/sections/Contact";
import { Reveal } from "@/components/Reveal";

// Revalidate at most every 60 seconds so GitHub repo descriptions stay fresh.
export const revalidate = 60;

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      <SystemBoot />

      {/* Subtle background grid — established here so every section shares it */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <Hero />

      <Reveal>
        <ProjectLab />
      </Reveal>

      <Reveal>
        <ArchitectureExplorer />
      </Reveal>
      <Reveal>
        <TechStack />
      </Reveal>
      <Reveal>
        <ExperienceTimeline />
      </Reveal>

      <Reveal>
        <GitHubActivity />
      </Reveal>
      <Reveal>
        <CurrentlyBuilding />
      </Reveal>
      <Reveal>
        <RazaAISection />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
