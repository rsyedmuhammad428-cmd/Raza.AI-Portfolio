# Phase 1 — Foundation

## What this phase built
- Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS project scaffold
- Design tokens in `tailwind.config.ts`: color palette, font families, panel radius, background grid
- Global styles (`app/globals.css`): base resets, glass-panel/section-shell utilities, visible focus rings, `prefers-reduced-motion` handling
- Root layout (`app/layout.tsx`): Space Grotesk / Inter / JetBrains Mono via `next/font/google`, base SEO metadata
- `Navigation` component: sticky glass-panel bar, desktop links, mobile menu, "Ask Raza AI" CTA
- Home page stubbed with anchor IDs for every planned section

## Design tokens chosen
| Token | Value | Why |
|---|---|---|
| Background | `#0B0D12` | Deep graphite-blue, not pure black |
| Panel | `#12151C` | Glass-panel fill |
| Border | `#232733` | Hairline borders |
| Accent | `#D9A15A` | Brass/instrument-panel amber — deliberately not the generic neon-green/vermilion AI-portfolio accent |
| Display font | Space Grotesk | Geometric, technical, distinct from body |
| Body font | Inter | Neutral, readable |
| Mono font | JetBrains Mono | Data/labels/code only — never decorative all-caps chrome |

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean production build and static prerender
- ESLint (`next/core-web-vitals`) — clean

## Known sandbox-only limitation
This dev container has no network access to `fonts.googleapis.com`, so `next/font/google` can't resolve during a build run *here*. This is not a bug — it will build normally on a machine with normal internet access (your machine, Vercel, GitHub Actions, etc.). Each build in this environment was verified by temporarily swapping in system fonts, confirming the build, then restoring the real font imports before packaging.

## Notes / things to double check
- None yet.
