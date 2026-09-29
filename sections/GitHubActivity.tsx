import { Star, ExternalLink } from "lucide-react";
import { getGithubRepos } from "@/lib/github";
import { formatRelativeTime } from "@/lib/format";
import { GlassPanel } from "@/components/GlassPanel";
import { TechBadge } from "@/components/TechBadge";

const PROFILE_URL = "https://github.com/rsyedmuhammad428-cmd";

export async function GitHubActivity() {
  const data = await getGithubRepos();

  return (
    <section id="github" aria-labelledby="github-heading" className="section-shell py-24">
      <h2 id="github-heading" className="text-2xl font-medium text-ink sm:text-3xl">GitHub</h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Live from{" "}
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          github.com/rsyedmuhammad428-cmd
        </a>
        .
      </p>

      {!data || data.repos.length === 0 ? (
        <GlassPanel className="mt-8 p-6 text-sm text-ink-muted">
          GitHub activity is temporarily unavailable.
        </GlassPanel>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((repo) => (
              <GlassPanel key={repo.name} className="p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="min-w-0 break-words text-sm font-medium text-ink">{repo.name}</h3>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${repo.name} on GitHub`}
                    className="-m-2 shrink-0 p-2 text-ink-faint transition-colors hover:text-ink"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                {repo.description && (
                  <p className="mt-1.5 text-xs text-ink-muted leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  {repo.language ? <TechBadge label={repo.language} /> : <span />}
                  <span className="flex items-center gap-1 text-xs text-ink-faint">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    {repo.stars}
                  </span>
                </div>
              </GlassPanel>
            ))}
          </div>

          {data.languages.length > 0 && (
            <div className="mt-8">
              <p className="text-xs text-ink-faint">Languages</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.languages.map((lang) => (
                  <TechBadge key={lang} label={lang} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <p className="text-xs text-ink-faint">Recent Activity</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              {data.repos.slice(0, 5).map((repo) => (
                <li key={repo.name}>
                  Pushed to <span className="text-ink">{repo.name}</span> ·{" "}
                  {formatRelativeTime(repo.pushedAt)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
