const GITHUB_USERNAME = "rsyedmuhammad428-cmd";
const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };
// Cached for 60 seconds via Next's fetch cache so updates to GitHub repo descriptions
// reflect on the website quickly while respecting API limits.
const REVALIDATE_SECONDS = 60;

/**
 * Fetches the live public-repo count for the portfolio owner's GitHub account.
 * Returns null on any failure (rate limit, network, unexpected shape) so the
 * UI can omit the stat rather than ever show a fabricated number.
 */
export async function getGithubPublicRepoCount(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: GITHUB_HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "public_repos" in data &&
      typeof (data as { public_repos: unknown }).public_repos === "number"
    ) {
      return (data as { public_repos: number }).public_repos;
    }

    return null;
  } catch {
    return null;
  }
}

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GithubActivityData = {
  repos: GithubRepo[];
  languages: string[];
};

type RawRepo = {
  name?: unknown;
  description?: unknown;
  html_url?: unknown;
  language?: unknown;
  stargazers_count?: unknown;
  pushed_at?: unknown;
  fork?: unknown;
};

/**
 * Fetches the most recently pushed-to repos for the portfolio owner, sourcing
 * "Selected Projects", "Languages", and "Recent Activity" from a single
 * endpoint to keep GitHub API usage minimal. Returns null on any failure so
 * the GitHub section can fall back to a fixed, honest message rather than
 * inventing repo data.
 */
export async function getGithubRepos(): Promise<GithubActivityData | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
      {
        headers: GITHUB_HEADERS,
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return null;

    const repos: GithubRepo[] = (data as RawRepo[])
      .filter((repo) => !repo.fork)
      .filter(
        (repo): repo is RawRepo & { name: string; html_url: string; pushed_at: string } =>
          typeof repo.name === "string" &&
          typeof repo.html_url === "string" &&
          typeof repo.pushed_at === "string",
      )
      .map((repo) => ({
        name: repo.name,
        description: typeof repo.description === "string" ? repo.description : null,
        url: repo.html_url,
        language: typeof repo.language === "string" ? repo.language : null,
        stars: typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
        pushedAt: repo.pushed_at,
      }));

    const languages = Array.from(
      new Set(repos.map((repo) => repo.language).filter((lang): lang is string => Boolean(lang))),
    );

    return { repos, languages };
  } catch {
    return null;
  }
}
