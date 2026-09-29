# Phase 8 — Polish

This phase started from real feedback after reviewing the built site, not a generic checklist — so it's organized around what was actually reported, verified with a real headless browser (Playwright) at 320/375/768/1440/1920px rather than guessed.

## Bugs fixed

**Experience section looked "weird" — short entries were mostly empty boxes.**
Cause: a CSS grid stretches all cards to match the tallest one, and the "2026" entry (5 lines) made every other card (1 line) mostly empty space. Fixed by rebuilding `ExperienceTimeline` as an actual timeline — a rail with year markers, each card sized to its own content, vertical on mobile / horizontal on larger screens. No more stretched boxes.

**Mobile required horizontal scrolling.**
Root cause, found by inspecting real element bounding boxes at 375px: none in the shipped Phase 7 code, as far as this audit could find — `document.documentElement.scrollWidth` matched `clientWidth` exactly (0px overflow) at 320/375/768/1440/1920 in a real browser, including with the mobile nav menu open and the chat panel open. This was very likely fixed already by earlier Phase 8 work (a `min-w-0` fix in a flex/grid parent, and the `text-base` naming collision below) before this review — the zip you looked at was Phase 7's, which predates it. This zip has it re-verified.

**The floating "Ask Raza AI" button covered content while scrolling.**
A fixed-position button will always sit over whatever content is beneath it on screen — that's inherent to "floating." What made it worse: it was a wide pill with text, so its footprint was much larger than it needed to be. Shrunk it to a 56px round icon button (with a small ambient glow), which dramatically reduces what it can ever cover, and is the standard pattern for this kind of persistent launcher (WhatsApp/Intercom-style).

**A silent color bug.** `text-base` was used in several places to mean "dark text on the light button," but `text-base` is also Tailwind's built-in class for `font-size: 1rem`. Depending on class order, this could silently produce black-on-black text on the primary CTA button and the chat send button. Added a dedicated `text-canvas` color token and swapped every occurrence.

## Made "more creative," per your feedback that the site looked too plain

- **Hero**: an ambient soft accent-colored glow behind the headline (`blur-[120px]`, very low opacity) instead of a flat background.
- **Stats**: numbers now count up from 0 when they scroll into view, instead of appearing instantly.
- **Cards**: Project Lab and GitHub repo cards lift slightly on hover.
- **Floating button**: a soft glowing halo instead of a flat pill.
- **Consistent selection state**: a shared `SelectablePill` component now backs every toggle (Project Lab, Architecture Explorer, Tech Stack) — selection is shown by a filled dot as well as color, not color alone, and it doubles as the fix for a few inconsistent touch-target sizes.

## Real content update — your resume

You uploaded `SyedMuhammadRaza_Resume.pdf` mid-phase. Since it's real, verified, more current information, it's used as the new source of truth over the original build spec where the two disagree:

- **Corrected a stale claim**: the site said you're a *current* intern at DeveloperHub Corporation. Your resume shows both internships already concluded (Frontend, Feb–Apr 2026; Full Stack, May–Jul 2026). `data/profile.ts` and `data/experience.ts` now reflect that your current ongoing role is freelance web development (2025–present).
- **SheetAgent AI**: replaced the generic architecture with the real one — React 19 + TanStack Start (SSR) → Nginx → FastAPI → Gemini (primary) + OpenRouter (failover) → PostgreSQL (Neon) + Redis (Upstash), Docker Compose, 4-pass Gemini Vision OCR for images, smart PDF header detection.
- **Healthcare AI Agent**: corrected OCR engine to **EasyOCR** (was incorrectly "Tesseract," carried over from the original build spec). Added the real triage/researcher/lifestyle/general multi-agent architecture. **Removed the unverified "SQLite" claim** flagged back in Phase 3 — your resume doesn't tie a specific database to this project, so rather than guess, it's left out.
- **ShopNest**: added Stripe checkout, an admin dashboard, and MongoDB aggregation pipelines (kept the previously-stated Wishlist too — resume and spec aren't contradictory, just each partial).
- **Skills** (`data/skills.ts`): rewritten with your full real inventory — added Security (JWT, bcrypt, CORS, TLS) and Tools categories, TanStack Start, Neon/Upstash, Nginx, OpenRouter, and more.
- **Contact**: added your phone number (you confirmed you want it public) and a working **Download Resume** button, linking directly to your Drive file.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean
- Playwright, real Chromium, at 320/375/768/1440/1920px: 0px horizontal overflow at every size, including with the mobile nav menu open and the Raza AI chat panel open
- Grepped the built HTML to confirm the new resume-driven facts render (TanStack Start, EasyOCR, Stripe Checkout, Neon, Upstash, the corrected freelance/internship dates, the phone number) and that the stale/incorrect ones are gone ("OCR (Tesseract)", "Remote Software Engineering Intern")
- Tab order and focus rings checked across the first 14 tabbable elements — all have a visible focus ring

## Known, deliberate non-issues
A couple of things the audit script flagged aren't real problems: the skip-to-content link measures ~1px because it's intentionally invisible until keyboard-focused (standard pattern), and a couple of inline text links (e.g. the GitHub username in a sentence, "Live demo" inside a card) are below the 24px target-size guideline but are exempted for links inside a sentence/block of text under WCAG 2.5.8.

## Still open (carried from earlier phases)
- SheetAgent AI and Healthcare AI Agent's GitHub/demo links weren't reconfirmed against the new resume (which doesn't include plain-text URLs, just icon links a PDF-text extraction can't recover) — if either has moved, send the current URL.
- AI Software Engineer still has no public repo/demo link. Send one and it'll appear immediately (the code already supports it — it just omits the button when the link is unset, which is why it currently shows "not currently available").
