import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Alias of base.DEFAULT for use as a *text* colour. "text-base" also means
        // font-size:1rem in Tailwind, so it must not be used for colour.
        canvas: "#0B0D12",
        base: {
          DEFAULT: "#0B0D12", // page background
          panel: "#12151C", // glass panel fill
          border: "#232733", // hairline borders
        },
        ink: {
          DEFAULT: "#E7E9EE", // primary text
          muted: "#9297A6", // secondary text
          faint: "#7B8090", // tertiary — 4.9:1 on base, 4.6:1 on panel (AA for small text)
        },
        accent: {
          DEFAULT: "#D9A15A", // brass / instrument-panel amber
          dim: "#8C6B3C",
          glow: "rgba(217, 161, 90, 0.18)",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      borderRadius: {
        panel: "0.75rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};

export default config;
