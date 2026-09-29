export type SkillGroup = {
  category: string;
  items: string[];
};

// Full personal skill inventory, from Raza's resume. Broader than
// data/tech-stack.ts, which only lists technologies verifiably tied to a
// specific showcased project.
export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java"],
  },
  {
    category: "Frontend",
    items: [
      "React.js / React 19",
      "TanStack Start (SSR)",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Recharts",
    ],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "Express.js", "Uvicorn", "SQLAlchemy (async)", "REST API design"],
  },
  {
    category: "AI / LLM Engineering",
    items: [
      "LangChain",
      "LangGraph",
      "Google Gemini",
      "OpenRouter",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt engineering",
      "Multi-agent systems",
      "OCR / EasyOCR",
      "Embeddings",
    ],
  },
  {
    category: "Database",
    items: [
      "PostgreSQL (Neon)",
      "MongoDB",
      "Redis (Upstash)",
      "SQLite",
      "Vector databases",
      "asyncpg",
      "aiosqlite",
    ],
  },
  {
    category: "DevOps / CI-CD",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx (reverse proxy)",
      "GitHub Actions",
      "Hugging Face Spaces",
      "Vercel",
      "CI/CD pipelines",
    ],
  },
  {
    category: "Security",
    items: [
      "JWT authentication",
      "bcrypt",
      "HTTPS / TLS",
      "CORS",
      "Environment-based secrets management",
    ],
  },
  {
    category: "Tools",
    items: ["Git / GitHub", "Postman", "VS Code", "WebSocket", "pdfplumber", "openpyxl", "pandas", "Alembic"],
  },
];
