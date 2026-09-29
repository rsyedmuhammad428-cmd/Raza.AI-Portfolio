export default function NotFound() {
  return (
    <main id="main" className="section-shell flex min-h-[70vh] flex-col items-start justify-center py-32">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">That page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The link may be old or mistyped. Everything on this portfolio lives on the home page.
      </p>
      <a
        href="/"
        className="touch-target mt-8 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink/90"
      >
        Back to home
      </a>
    </main>
  );
}
