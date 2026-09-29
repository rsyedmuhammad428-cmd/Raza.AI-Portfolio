# Phase 3 — Project Lab

## What this phase built
- `types/project.ts`: `ProjectDetail` type (tagline, category, problem/solution *or* plain description, highlights, optional architecture steps, optional GitHub/demo links)
- `data/projects.ts`: full real data for all 5 projects — AI Software Engineer, Healthcare AI Agent, SheetAgent, DHC Full Stack E-Commerce Web (all 4 primary), plus ShopNest (secondary reference)
- `sections/ProjectLab.tsx`: pill selector for the 4 primary projects; selecting one expands its detail panel in place (Framer Motion fade/slide, no page navigation)
- `components/ProjectArchitecture.tsx`: clickable per-project architecture step-flow, horizontally scrollable on narrow screens
- `components/TechBadge.tsx`: reusable technology pill, used here and by later sections

## No-fake-data guarantee
- Link buttons (GitHub / Live demo) render **only when `links.github` / `links.demo` is actually set**. Verified in the build: AI Software Engineer (no public repo/demo link given in the spec) renders zero link buttons for itself.
- DHC Full Stack E-Commerce Web and ShopNest use a plain `description` field instead of forced Problem/Solution framing, since the spec didn't give backend/architecture detail for either — avoids inventing technical claims.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean production build and static prerender
- Grepped the built HTML to confirm all 5 project names render, and that the correct links are present for each

## Notes / things to double check
1. **Healthcare AI Agent** highlights list "SQLite" per the master spec text. Cross-referencing this project's own memory file suggests it may have since migrated to MongoDB Atlas. This build uses the spec's stated value (SQLite) — flag if that's stale.
2. **SheetAgent** links use the GitHub repo named in the spec (`DataEntery-Agent`) plus a live demo URL (`sheet-agent-agentic-ai-tbjd.vercel.app`) pulled from other project notes, since the spec didn't list a demo. Confirm the repo name is current.
