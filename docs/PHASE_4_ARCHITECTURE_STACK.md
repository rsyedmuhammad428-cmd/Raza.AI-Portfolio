# Phase 4 — Architecture + Stack

Your master plan groups "Architecture Explorer", "Technology map", "Interactive nodes", and "Timeline" into one phase. That maps to three separate page sections, each with its own nav anchor, all built in this phase.

## What this phase built

### Architecture Explorer (`#architecture`)
- `data/architecture.ts`: the AI Software Engineer pipeline — `User → Application → FastAPI → LangGraph → [Planner / Coder / Tester / Debugger] → Tools → GitHub`
- `components/ArchitectureNode.tsx`: reusable clickable node button
- `sections/ArchitectureExplorer.tsx`: trunk nodes + a branching row for the four agents; clicking any node shows its description below — the four agents get a fuller bullet-point responsibility list, matching your spec's example

### Tech Stack (`#stack`)
- `types/tech.ts` + `data/tech-stack.ts`: technologies grouped into Languages / Frontend / Backend / AI / Database / DevOps, each with a **verified** `usedIn` list
- `sections/TechStack.tsx`: click a technology to see exactly which projects use it (e.g. "LangGraph — used in: AI Software Engineer, Healthcare AI Agent, SheetAgent")
- This portfolio's own stack (Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion, Gemini) is included and attributed to "This portfolio (raza.ai)" — it's real, since you're looking at it

### Experience Timeline (`#experience`)
- `data/experience.ts` + `sections/ExperienceTimeline.tsx`: the exact factual timeline from your spec — 2024 (BS Software Engineering), 2025 (MERN / Full Stack), 2026 (Generative AI, LangChain, LangGraph, Agentic AI, AI Engineering), Now (Building intelligent software systems). Nothing embellished beyond what was given.

## No-fake-data guarantee
Every `usedIn` entry in `data/tech-stack.ts` was cross-checked against each project's actual stated stack (in `data/projects.ts` and prior conversation notes) before being added — nothing was included just because it's typical for the category.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean production build and static prerender
- Grepped the built HTML to confirm the architecture nodes, all 5 tech categories, and all 4 timeline entries render

## Notes / things to double check
- None new this phase — same two open items from Phase 3 (Healthcare AI Agent's database, SheetAgent's repo name) still apply here since Tech Stack reflects the same project data.
