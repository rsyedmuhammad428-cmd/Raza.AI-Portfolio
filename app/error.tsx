"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="section-shell flex min-h-[70vh] flex-col items-start justify-center py-32">
      <p className="font-mono text-sm text-accent">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">This page hit an error.</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The rest of the site is unaffected. Try again, or head back to the start.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="touch-target rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink/90"
        >
          Try again
        </button>
        <a
          href="/"
          className="touch-target rounded-full border border-base-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
