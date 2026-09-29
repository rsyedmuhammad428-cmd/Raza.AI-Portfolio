# Phase 5 — GitHub

## What this phase built

### GitHub Activity (`#github`)
- `lib/github.ts` — added `getGithubRepos()`: a single request to `GET /users/{username}/repos?sort=pushed&per_page=6` sources **Selected Projects**, **Languages** (deduped from each repo's primary language), and **Recent Activity** (derived from each repo's `pushed_at`) all from one API call. Forks are filtered out.
- `lib/format.ts` — `formatRelativeTime()`, a small hand-rolled relative-time formatter (no new dependency needed for "3 days ago" style strings)
- `sections/GitHubActivity.tsx` — repo cards (name, description, primary language, stars, link), a languages badge row, and a recent-activity list

### Currently Building (`#currently-building`)
- `sections/CurrentlyBuilding.tsx` — small callout for AI Software Engineer, using the **EXPERIMENTAL** status label (not a fake progress percentage), linking back to `#project-lab`

## Caching / rate-limit behavior
- Both `getGithubPublicRepoCount()` (Phase 2) and `getGithubRepos()` (this phase) use Next's `fetch` cache with `revalidate: 3600` — GitHub is hit at most once per hour regardless of visitor traffic, satisfying "avoid excessive API requests" / "cache data where appropriate."
- Two GitHub API calls total across the whole site (profile + repos), both cacheable, both read-only, no auth token required.

## Error fallback — verified for real
Per your spec, on any GitHub failure the section must show the literal text **"GitHub activity is temporarily unavailable."** and the portfolio must keep functioning. This sandbox's network genuinely rate-limits the GitHub API, so this path was exercised for real rather than simulated: the built HTML was grepped and confirms that exact string renders, with the rest of the page (all other sections) still building and prerendering normally.

## What was intentionally left out
- **Contribution Activity** (the commit-graph heatmap) requires GitHub's GraphQL API, which needs an authenticated personal access token server-side. Your spec lists it as one of several "possible" data points, not a requirement, so it was skipped rather than adding a new secret/setup step for a nice-to-have. Happy to add it in Phase 8 (Polish) if you want it — you'd add a `GITHUB_TOKEN` to `.env.local`.

## Verified
- `npx tsc --noEmit` — clean
- `next build` — clean production build and static prerender
- Confirmed via built HTML that the fallback message, "Currently Building" section, and status label all render correctly

## Notes / things to double check
- Same GitHub username as before: `rsyedmuhammad428-cmd`. If repos are private or the account has few/no public repos, the "Selected Projects" grid will be empty and correctly show the fallback message instead of an empty grid.
