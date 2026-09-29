import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectablePillProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "aria-pressed"> & {
  active: boolean;
  size?: "sm" | "md";
  mono?: boolean;
  /** Marks a distinct tier (e.g. the agents row) even when inactive. */
  emphasis?: boolean;
};

/**
 * Toggle-style pill used across Project Lab, Architecture Explorer, and Tech
 * Stack. Selection is shown by a filled vs hollow marker as well as color, so
 * it isn't conveyed by color alone.
 */
export function SelectablePill({
  active,
  size = "sm",
  mono = true,
  emphasis = false,
  type = "button",
  children,
  ...props
}: SelectablePillProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "touch-target gap-2 whitespace-nowrap rounded-full border transition-[color,border-color,background-color,transform] active:scale-[0.98]",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        mono && "font-mono",
        active
          ? "border-accent/60 bg-accent/10 text-accent"
          : emphasis
            ? "border-accent/25 text-ink hover:border-accent/50"
            : "border-base-border text-ink-muted hover:text-ink",
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full border transition-colors",
          active ? "border-accent bg-accent" : "border-ink-faint bg-transparent",
        )}
      />
      {children}
    </button>
  );
}
