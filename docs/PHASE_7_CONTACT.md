# Phase 7 — Contact

## What this phase built
- `sections/Contact.tsx` (`#contact`) — the closing section: headline "Let's build something intelligent." plus three link rows for GitHub, LinkedIn, and Email. No contact form, per your spec ("do not create a complicated contact form unless genuinely useful").
- `components/Footer.tsx` — name and copyright line, "Back to top", and GitHub / LinkedIn / Email links. Mounted once in `app/layout.tsx` so it sits below all page content.

## Single source of truth
Every link and address on the page, in the footer, and in Raza AI's answers comes from `data/contact.ts`. Update a URL or email there and all three places change together. Display text (e.g. `linkedin.com/in/…`) is derived from the URL, not typed separately.

## Details
- External links (GitHub, LinkedIn) open in a new tab with `rel="noreferrer noopener"`.
- Email uses a `mailto:` link and the address is shown in full so it can be copied or read aloud.
- Link rows are real anchors with visible focus rings, so keyboard and screen-reader use works without extra code.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean
- Read the built HTML to confirm: the headline, the exact `mailto:`, GitHub, and LinkedIn hrefs, the footer element, and that all 6 external links carry `noopener`.

## Notes
- The footer year is computed at build time, so it updates on your next deploy rather than live on New Year's Day.
- Your email address is now published in plain text in the page HTML, which is normal for a portfolio but means it can be scraped for spam. If that matters to you, say so and I can obfuscate it or swap the email row for a contact form.
