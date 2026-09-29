// In-memory sliding-window limiter. This is a reasonable baseline for a
// single small deployment, but it resets on cold start and is per-instance —
// it is NOT a substitute for a shared store (e.g. Upstash Redis, Vercel KV)
// if this ever runs across many serverless instances under real abuse load.
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 12;

const requestLog = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}
