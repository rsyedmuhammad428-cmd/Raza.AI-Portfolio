import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EDUCATION } from "@/data/education";
import { CONTACT } from "@/data/contact";
import { TECHNOLOGIES } from "@/data/tech-stack";

export type DocumentChunk = {
  id: string;
  title: string;
  content: string;
  keywords: string[];
};

/**
 * Knowledge Base Chunks for RAG (Retrieval-Augmented Generation)
 */
export const KNOWLEDGE_CHUNKS: DocumentChunk[] = [
  {
    id: "profile",
    title: "Syed Muhammad Raza Zaidi - Profile & Bio",
    content: `Name: ${PROFILE.name}\nRoles: ${PROFILE.roles.join(", ")}\nLocation: ${PROFILE.location}\nCurrent Role: ${PROFILE.currentRole}\nCareer Goal: ${PROFILE.careerGoal}\nStatement: ${PROFILE.statement}\nPortfolio evidence of strengths: building intelligent software, agentic AI systems, full-stack applications, and practical AI/LLM projects.`,
    keywords: ["raza", "profile", "bio", "who", "quality", "strength", "best", "undergraduate", "iqra", "career", "goal", "developer", "engineer", "problem solving"],
  },
  {
    id: "ai-software-engineer",
    title: "AI Software Engineer Project",
    content: `Project: AI Software Engineer\nTagline: An experimental agentic pipeline that plans, writes, tests, and debugs code changes.\nProblem: Manual code fix loops are tedious.\nSolution: LangGraph multi-agent pipeline inside a sandboxed environment connected to GitHub via OAuth & MCP.\nHighlights: LangGraph, FastAPI, React, Docker Sandbox, GitHub OAuth, MCP, Gemini API, Human-in-the-loop.`,
    keywords: ["ai software engineer", "agentic", "pipeline", "langgraph", "fastapi", "docker", "sandbox", "mcp", "github pr"],
  },
  {
    id: "healthcare-ai-agent",
    title: "Healthcare AI Agent Project",
    content: `Project: Healthcare AI Agent\nTagline: Generative-AI healthcare assistant built on multi-agent LangGraph pipeline with triage, researcher, lifestyle agents.\nProblem: Medical questions vary in urgency and domain.\nSolution: LangGraph agents with specialized prompts, EasyOCR text extraction, voice output, deployed on Hugging Face Spaces.\nHighlights: FastAPI, LangChain, LangGraph, RAG, EasyOCR, Docker, Hugging Face Spaces.\nGitHub: https://github.com/rsyedmuhammad428-cmd/HealthCare-AI\nLive Demo: https://huggingface.co/spaces/RazaZaidi/healthcare-ai-agent`,
    keywords: ["healthcare", "medical", "triage", "langgraph", "langchain", "rag", "easyocr", "hugging face", "voice"],
  },
  {
    id: "sheetagent",
    title: "SheetAgent AI Project",
    content: `Project: SheetAgent AI\nTagline: Multi-agent platform converting PDFs, images, CSVs, and text into formatted Excel workbooks with charts & KPI dashboards.\nHighlights: React 19, TanStack Start, TypeScript, FastAPI, LangChain, LangGraph, Gemini, OpenRouter failover, PostgreSQL, Redis, EasyOCR, openpyxl.\nGitHub: https://github.com/rsyedmuhammad428-cmd/SheetAgent_AgenticAI-\nLive Demo: https://sheet-agent-agentic-ai-tbjd.vercel.app`,
    keywords: ["sheetagent", "excel", "spreadsheet", "csv", "pdf", "openpyxl", "react 19", "tanstack", "fastapi", "openrouter"],
  },
  {
    id: "dhc-ecommerce",
    title: "DHC Full Stack E-Commerce Project",
    content: `Project: DHC Full Stack E-Commerce Web\nTagline: Full-stack storefront for DeveloperHub Corporation covering product browsing, deals, and supplier information.\nHighlights: Product Browsing, Categories, Deals, Services, Supplier Information, Responsive Frontend.\nLive Demo: https://dhc-full-stack-e-commerce-web.vercel.app/`,
    keywords: ["dhc", "ecommerce", "storefront", "fullstack", "developerhub", "deals", "responsive"],
  },
  {
    id: "shopnest",
    title: "ShopNest E-Commerce Project",
    content: `Project: ShopNest\nTagline: Full-stack MERN e-commerce reference project with cart, wishlist, Stripe checkout, admin dashboard, Mongoose aggregation.\nHighlights: React.js, Node.js, Express, MongoDB, Mongoose, JWT, Stripe Checkout, Admin Dashboard.\nLive Demo: https://fullstack-ecommerce-shopnest.vercel.app`,
    keywords: ["shopnest", "mern", "mongodb", "express", "stripe", "checkout", "jwt", "cart", "wishlist"],
  },
  {
    id: "skills-and-tech",
    title: "Skills & Technical Stack",
    content: `Skills:\n${SKILLS.map((s) => `• ${s.category}: ${s.items.join(", ")}`).join("\n")}\n\nTechnologies:\n${TECHNOLOGIES.map((t) => `${t.name} (${t.category})`).join(", ")}`,
    keywords: ["skills", "tech", "stack", "languages", "python", "typescript", "react", "next.js", "tailwind", "docker", "fastapi"],
  },
  {
    id: "experience",
    title: "Professional Work Experience & Internships",
    content: `Experience:\n1. Full Stack Developer Intern (Remote) at DeveloperHub Corporation (May 2026 – July 2026, 3 Months):\n   - Developed MERN full-stack apps, REST APIs with Express.js & MongoDB, JWT auth, protected routes, CRUD, agile workflows.\n2. Frontend Developer Intern (Remote) at DeveloperHub Corporation (Feb 2026 – April 2026, 3 Months):\n   - React.js & Tailwind CSS UI, REST API integration, code splitting, lazy loading, performance optimization, mobile-first design.\n3. Freelance Web Developer (Self-Employed, 2025 – Present):\n   - Designed and delivered 5+ client websites using MERN stack with JWT auth, RESTful APIs, and responsive UI.`,
    keywords: ["experience", "intern", "developerhub", "corporation", "fullstack", "frontend", "freelance", "work", "job", "history", "years"],
  },
  {
    id: "education",
    title: "Academic Background & Education",
    content: `Academic background and education:\n${EDUCATION.map((e) => `${e.degree} at ${e.institution} (${e.period})\nCurrent semester: ${e.currentSemester}\nCurrent CGPA: ${e.currentCgpa}/${e.gradingScale}\nCurrent SCGPA: ${e.currentScgpa}/${e.gradingScale}${e.coursework ? `\nRelevant coursework: ${e.coursework.join(", ")}` : ""}`).join("\n")}`,
    keywords: ["education", "academic", "academics", "background", "academic background", "iqra", "university", "degree", "software engineering", "undergraduate", "coursework", "semester", "cgpa", "scgpa", "gpa", "grade"],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: `GitHub: ${CONTACT.github}\nLinkedIn: ${CONTACT.linkedin}\nEmail: ${CONTACT.email}\nPhone: ${CONTACT.phone}\nResume: ${CONTACT.resumeUrl}`,
    keywords: ["contact", "email", "github", "linkedin", "phone", "resume", "reach", "hire"],
  },
];

/**
 * RAG Retriever: Retrieves the most relevant knowledge chunks for a query.
 */
export function retrieveRelevantContext(query: string, topK: number = 3): DocumentChunk[] {
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedQuery.split(/\W+/).filter(Boolean);

  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const chunkText = (chunk.title + " " + chunk.content + " " + chunk.keywords.join(" ")).toLowerCase();

    tokens.forEach((token) => {
      if (token.length < 2) return;
      if (chunk.keywords.includes(token)) score += 5;
      if (chunkText.includes(token)) score += 2;
    });

    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);
}
