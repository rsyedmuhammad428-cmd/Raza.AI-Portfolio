import type { Technology, TechCategory } from "@/types/tech";

// Every "usedIn" entry here is a verified association — stated directly in a
// project's own spec/resume entry. Nothing is added just because it's common
// for the category. For Raza's full personal skill inventory (including
// skills not tied to a specific showcased project), see data/skills.ts.
export const TECHNOLOGIES: Technology[] = [
  // Languages
  {
    name: "Python",
    category: "Languages",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  {
    name: "TypeScript",
    category: "Languages",
    usedIn: ["SheetAgent AI", "This portfolio (raza.ai)"],
  },
  { name: "JavaScript", category: "Languages", usedIn: ["ShopNest"] },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    usedIn: ["AI Software Engineer", "SheetAgent AI", "ShopNest", "This portfolio (raza.ai)"],
  },
  { name: "TanStack Start (SSR)", category: "Frontend", usedIn: ["SheetAgent AI"] },
  { name: "Next.js", category: "Frontend", usedIn: ["This portfolio (raza.ai)"] },
  { name: "Tailwind CSS", category: "Frontend", usedIn: ["This portfolio (raza.ai)"] },
  { name: "shadcn/ui", category: "Frontend", usedIn: ["This portfolio (raza.ai)"] },
  { name: "Framer Motion", category: "Frontend", usedIn: ["This portfolio (raza.ai)"] },

  // Backend
  {
    name: "FastAPI",
    category: "Backend",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  { name: "Node.js", category: "Backend", usedIn: ["ShopNest"] },
  { name: "Express", category: "Backend", usedIn: ["ShopNest"] },

  // AI
  {
    name: "LangChain",
    category: "AI",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  {
    name: "LangGraph",
    category: "AI",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  { name: "RAG", category: "AI", usedIn: ["Healthcare AI Agent"] },
  { name: "EasyOCR", category: "AI", usedIn: ["Healthcare AI Agent", "SheetAgent AI"] },
  {
    name: "Google Gemini API",
    category: "AI",
    usedIn: ["AI Software Engineer", "SheetAgent AI", "This portfolio (raza.ai)"],
  },
  { name: "OpenRouter", category: "AI", usedIn: ["SheetAgent AI"] },
  { name: "MCP", category: "AI", usedIn: ["AI Software Engineer"] },

  // Database
  { name: "PostgreSQL (Neon)", category: "Database", usedIn: ["SheetAgent AI"] },
  { name: "Redis (Upstash)", category: "Database", usedIn: ["SheetAgent AI"] },
  { name: "MongoDB", category: "Database", usedIn: ["ShopNest"] },

  // DevOps
  {
    name: "Docker",
    category: "DevOps",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  { name: "Docker Compose", category: "DevOps", usedIn: ["SheetAgent AI"] },
  { name: "Nginx", category: "DevOps", usedIn: ["SheetAgent AI"] },
  {
    name: "GitHub",
    category: "DevOps",
    usedIn: ["AI Software Engineer", "Healthcare AI Agent", "SheetAgent AI"],
  },
  {
    name: "Vercel",
    category: "DevOps",
    usedIn: [
      "This portfolio (raza.ai)",
      "SheetAgent AI",
      "DHC Full Stack E-Commerce Web",
      "ShopNest",
    ],
  },
  { name: "Hugging Face Spaces", category: "DevOps", usedIn: ["Healthcare AI Agent", "SheetAgent AI"] },

  // Security
  { name: "JWT", category: "Security", usedIn: ["ShopNest"] },
  { name: "Stripe", category: "Security", usedIn: ["ShopNest"] },
];

export const TECH_CATEGORIES: TechCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "AI",
  "Database",
  "DevOps",
  "Security",
];
