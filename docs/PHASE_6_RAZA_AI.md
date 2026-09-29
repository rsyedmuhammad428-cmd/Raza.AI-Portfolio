# Phase 6 — Gemini / Raza AI

## What this phase built

### Server side
- `app/api/raza-ai/route.ts` — `POST /api/raza-ai`. Validates input (JSON shape, non-empty, max 1000 chars), rate-limits per IP, trims history to the last 6 turns before forwarding, and calls Gemini. Every failure mode (timeout, API error, missing key, empty response) collapses into one `503 { error: "unavailable" }` — details are never leaked to the client.
- `lib/gemini.ts` — Gemini client (`@google/genai`), 20s timeout, 600-token output cap, rejects empty/invalid responses. The API key is read from `process.env.GEMINI_API_KEY` on the server only; it never reaches the browser bundle.
- `lib/rate-limit.ts` — in-memory sliding window: 12 requests / 5 minutes per IP.
- `data/knowledge.ts` — assembles the fixed system instruction (your spec's wording) plus the portfolio's real data into one grounding context (~7 KB). It is generated from the same `data/*.ts` files the rest of the site renders (projects, tech stack, timeline, skills, education, profile, contact) — one source of truth, nothing duplicated.
- New data files: `profile.ts`, `education.ts`, `skills.ts`, `contact.ts`, `example-questions.ts`.

### Client side
- `RazaAIProvider` + `useRazaAIPanel` — tiny context owning only panel visibility and hand-off of a question from elsewhere on the page.
- `RazaAIFloatingButton` — persistent "Ask Raza AI" button (hidden while the panel is open).
- `ChatWindow` — bottom-right panel on desktop, full-screen on mobile. Example prompts, loading state, Escape-to-close, input focus on open, 1000-char cap, and URLs in answers rendered as safe clickable links (no HTML injection).
- `RazaAISection` (`#raza-ai`) — example-question chips that open the chat and ask immediately.

## Error handling (matches your spec's wording)
- Gemini unavailable / timeout / bad response → *"Raza AI is temporarily unavailable. You can still explore Raza's projects and skills below."*
- Rate limited → a separate, honest message asking the visitor to wait a moment.

## Verified for real (against a running production server)
| Case | Result |
|---|---|
| Malformed JSON | 400 `invalid_json` |
| Missing / empty message | 400 |
| Message > 1000 chars | 413 |
| Valid request, Gemini unreachable | 503 `unavailable` |
| 13th request in the window | 429 (first 12 were 503) |

Also verified: `tsc --noEmit` clean against the real `@google/genai` types; `next build` clean; the assembled grounding context prints correctly, including all three contact links.

## NOT verified here (needs your key)
An actual successful Gemini round-trip. This sandbox has no `GEMINI_API_KEY` and no network route to Google's API, so the happy path (real answer from Gemini) is untested. To test locally:
1. `cp .env.example .env.local` and set `GEMINI_API_KEY` (free key from https://aistudio.google.com/apikey)
2. `npm run dev`, click **Ask Raza AI**, ask "What is SheetAgent?"

## SDK / model notes
- The old `@google/generative-ai` package is deprecated; this project uses `@google/genai`.
- Default model is `gemini-flash-latest` (Google's auto-updating alias). Set `GEMINI_MODEL` to pin a specific one. Older models (e.g. `gemini-2.5-flash`) have announced shutdown dates, so avoid hard-pinning those.

## Known limitation
The rate limiter is per-server-instance and in-memory. It resets on cold start and doesn't share state across serverless instances. It's a sensible baseline; for real abuse protection put a shared store (Upstash Redis / Vercel KV) behind `lib/rate-limit.ts`.

## Things to double check
- `data/profile.ts` puts your location (Pakistan), your DeveloperHub Corporation internship, and your career goal into Raza AI's knowledge — meaning Raza AI will state them to any visitor. They came from your earlier notes, not this spec. Delete any line you don't want public.
