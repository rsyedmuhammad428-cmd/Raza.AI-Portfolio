# Phase 2 — Hero

## What this phase built
- `SystemBoot` (`components/SystemBoot.tsx`): ~1.3s terminal-style boot sequence, shown once per session (`sessionStorage`-gated), skippable, and skipped entirely for `prefers-reduced-motion` users
- `Hero` (`sections/Hero.tsx`): asymmetric layout — name/role/statement + two CTAs on the left, AI network diagram + Raza AI preview card on the right
- `NetworkDiagram` (`components/NetworkDiagram.tsx`): lightweight hand-built SVG (`AI → RAG/AGENTS/LLM → RAZA`), single orchestrated draw-in animation via Framer Motion, respects reduced motion
- `RazaAIHeroCard` (`components/RazaAIHeroCard.tsx`): static preview linking to `#raza-ai` (the real Gemini-backed chat is built in Phase 6)
- `StatCard` (`components/StatCard.tsx`) + live stats: "AI Projects" and "Full Stack Projects" computed from `data/projects.ts`, "Technologies" computed from `data/tech-stack.ts`, "GitHub Repositories" fetched live from the GitHub API (`lib/github.ts`)

## No-fake-data guarantee
`getGithubPublicRepoCount()` returns `null` on any failure (rate limit, network error, unexpected response shape). The Hero section filters out any `null` stat before rendering, so the stats grid **never shows a fabricated number** — it just drops to fewer columns. This was verified for real in this sandbox: the GitHub API is rate-limited here, and the built HTML confirms the "GitHub Repositories" stat is correctly omitted while the other three (which are all locally-computed, not fetched) still render.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean production build and static prerender
- Confirmed via built HTML inspection that the GitHub-stat fallback actually fires

## Notes / things to double check
- GitHub username hardcoded in `lib/github.ts`: `rsyedmuhammad428-cmd`. Confirm this is the account you want live-counted.
