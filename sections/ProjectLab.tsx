"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { GlassPanel } from "@/components/GlassPanel";
import { TechBadge } from "@/components/TechBadge";
import { ProjectArchitecture } from "@/components/ProjectArchitecture";
import { SelectablePill } from "@/components/SelectablePill";

const PRIMARY_PROJECTS = PROJECTS.filter((p) => p.isPrimary);
const SECONDARY_PROJECTS = PROJECTS.filter((p) => !p.isPrimary);

export function ProjectLab() {
  const [selectedId, setSelectedId] = useState(PRIMARY_PROJECTS[0]?.id);
  const selected = PRIMARY_PROJECTS.find((p) => p.id === selectedId);

  return (
    <section id="project-lab" aria-labelledby="project-lab-heading" className="section-shell py-24">
      <h2 id="project-lab-heading" className="text-2xl font-medium text-ink sm:text-3xl">
        Project Lab
      </h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Four projects, selected below. Each one opens with its problem, approach,
        architecture, and links.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a project">
        {PRIMARY_PROJECTS.map((project) => (
          <SelectablePill
            key={project.id}
            size="md"
            mono={false}
            active={selectedId === project.id}
            onClick={() => setSelectedId(project.id)}
          >
            {project.name}
          </SelectablePill>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <GlassPanel className="mt-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium text-ink">{selected.name}</h3>
                  <p className="mt-1 max-w-lg text-sm text-ink-muted">
                    {selected.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {selected.links.github && (
                    <a
                      href={selected.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="touch-target gap-1.5 rounded-full border border-base-border px-3 py-1.5 text-xs text-ink-muted transition-colors hover:text-ink"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {selected.links.demo && (
                    <a
                      href={selected.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="touch-target gap-1.5 rounded-full border border-accent/40 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                  {!selected.links.github && !selected.links.demo && (
                    <p className="text-xs text-ink-faint">
                      Repository and demo: not currently available
                    </p>
                  )}
                </div>
              </div>

              {selected.problem && selected.solution ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-ink-faint">Problem</p>
                    <p className="mt-1.5 text-sm text-ink-muted">{selected.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint">Solution</p>
                    <p className="mt-1.5 text-sm text-ink-muted">{selected.solution}</p>
                  </div>
                </div>
              ) : (
                selected.description && (
                  <p className="mt-6 text-sm text-ink-muted">{selected.description}</p>
                )
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {selected.highlights.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>

              {selected.architecture && (
                <div className="mt-6">
                  <p className="text-xs text-ink-faint">Architecture</p>
                  <div className="mt-2">
                    <ProjectArchitecture steps={selected.architecture} />
                  </div>
                </div>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {SECONDARY_PROJECTS.length > 0 && (
        <div className="mt-10">
          <p className="text-xs text-ink-faint">Also built</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {SECONDARY_PROJECTS.map((project) => (
              <GlassPanel key={project.id} className="max-w-xs p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <h3 className="text-sm font-medium text-ink">{project.name}</h3>
                {project.description && (
                  <p className="mt-1.5 text-xs text-ink-muted">{project.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.highlights.slice(0, 6).map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="touch-target mt-2 gap-1.5 text-xs text-accent hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    Live demo
                  </a>
                )}
              </GlassPanel>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
