type TechBadgeProps = {
  label: string;
};

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="rounded-full border border-base-border bg-black/20 px-3 py-1 font-mono text-xs text-ink-muted">
      {label}
    </span>
  );
}
