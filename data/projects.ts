import type { ProjectDetail } from "@/types/project";

export const PROJECTS: ProjectDetail[] = [
  {
    id: "ai-software-engineer",
    name: "AI Software Engineer",
    tagline:
      "An experimental agentic pipeline that plans, writes, tests, and debugs code changes, with a human approving anything before it ships.",
    category: "ai",
    isPrimary: true,
    problem:
      "Fixing a bug or shipping a small feature usually means repeating the same loop by hand: read the issue, plan a fix, write the code, run the tests, and iterate when something breaks.",
    solution:
      "A LangGraph multi-agent pipeline — planner, coder, tester, and debugger — works through that loop inside a sandboxed environment, connects to GitHub via OAuth and MCP, and opens a pull request only after a human approves the change.",
    highlights: [
      "LangGraph",
      "FastAPI",
      "React",
      "Docker Sandbox",
      "GitHub OAuth",
      "MCP",
      "Google Gemini API",
      "Human-in-the-loop",
    ],
    architecture: [
      {
        id: "request",
        label: "Request",
        description: "The task or bug report that starts the pipeline.",
      },
      {
        id: "planner",
        label: "Planner",
        description: "Breaks the request into an ordered set of implementation steps.",
      },
      {
        id: "coder",
        label: "Coder",
        description: "Writes or edits the code for the current step.",
      },
      {
        id: "tester",
        label: "Tester",
        description: "Runs the project's test suite against the change.",
      },
      {
        id: "debugger",
        label: "Debugger",
        description:
          "Diagnoses a failing test and hands a fix back to the coder — this loop repeats until tests pass.",
      },
      {
        id: "github",
        label: "GitHub PR",
        description: "Opens a pull request for human review once tests pass.",
      },
    ],
    links: {},
  },
  {
    id: "healthcare-ai-agent",
    name: "Healthcare AI Agent",
    tagline:
      "A generative-AI healthcare assistant built on a multi-agent LangGraph pipeline with triage, researcher, lifestyle, and general agents.",
    category: "ai",
    isPrimary: true,
    problem:
      "Medical questions vary a lot in kind — some need urgent triage, some need research grounding, some are about lifestyle — and a single generic chatbot handles that range poorly.",
    solution:
      "Separate LangGraph agents (triage, researcher, lifestyle, and general), each with its own tuned temperature, handle different kinds of questions. Per-agent conversation memory and an expanded NLU intents dataset keep responses grounded, with voice output and Docker deployment on Hugging Face Spaces.",
    highlights: [
      "FastAPI",
      "LangChain",
      "LangGraph",
      "RAG",
      "EasyOCR",
      "Docker",
      "Multi-agent systems",
      "Voice output",
    ],
    architecture: [
      {
        id: "upload",
        label: "Input",
        description: "A question or uploaded medical document/image from the user.",
      },
      {
        id: "ocr",
        label: "EasyOCR",
        description: "Extracts text from uploaded documents and images.",
      },
      {
        id: "triage",
        label: "Triage Agent",
        description: "Routes the request to the right specialised agent.",
      },
      {
        id: "researcher",
        label: "Researcher Agent",
        description: "Grounds answers that need factual/medical research using RAG.",
      },
      {
        id: "lifestyle",
        label: "Lifestyle Agent",
        description: "Handles lifestyle and general-wellness questions.",
      },
      {
        id: "general",
        label: "General Agent",
        description: "Handles everything else, with per-agent conversation memory.",
      },
      {
        id: "response",
        label: "Response",
        description: "Returned as text and voice output to the user.",
      },
    ],
    links: {
      github: "https://github.com/rsyedmuhammad428-cmd/HealthCare-AI",
      demo: "https://huggingface.co/spaces/RazaZaidi/healthcare-ai-agent",
    },
  },
  {
    id: "sheetagent",
    name: "SheetAgent AI",
    tagline:
      "A production multi-agent platform that turns natural language, PDFs, images, and CSVs into formatted Excel workbooks with charts and KPI dashboards.",
    category: "ai",
    isPrimary: true,
    problem:
      "Turning unstructured input — a PDF, a scanned image, a CSV, or a plain-language request — into a polished, chart-ready spreadsheet is manual and repetitive.",
    solution:
      "A ChatGPT-style interface takes the request, extracts and clarifies the data with a human-in-the-loop step when it's ambiguous, and generates a formatted Excel workbook — including charts, KPI dashboards, and conditional formatting — through a fully containerized pipeline.",
    highlights: [
      "React 19",
      "TanStack Start (SSR)",
      "TypeScript",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Google Gemini",
      "OpenRouter (auto-failover)",
      "PostgreSQL (Neon)",
      "Redis (Upstash)",
      "Nginx",
      "Docker Compose",
      "EasyOCR",
      "openpyxl",
      "pdfplumber",
      "Human-in-the-loop",
    ],
    architecture: [
      {
        id: "frontend",
        label: "React + TanStack Start",
        description: "A ChatGPT-style SSR frontend where the request or file is submitted.",
      },
      {
        id: "nginx",
        label: "Nginx",
        description: "Reverse proxy in front of the backend.",
      },
      {
        id: "fastapi",
        label: "FastAPI",
        description: "Backend that coordinates extraction, clarification, and generation.",
      },
      {
        id: "llm",
        label: "Gemini / OpenRouter",
        description:
          "Google Gemini as the primary model, with OpenRouter as an automatic failover if it's unavailable.",
      },
      {
        id: "extraction",
        label: "Extraction",
        description:
          "Multi-page PDF extraction with smart header detection, or a 4-pass Gemini Vision OCR pipeline for image-based data.",
      },
      {
        id: "storage",
        label: "PostgreSQL + Redis",
        description: "Persists workbook data and caches results, backed by Neon and Upstash.",
      },
      {
        id: "excel",
        label: "Excel Output",
        description:
          "Writes the final workbook with openpyxl — charts, KPI dashboards, and conditional formatting included.",
      },
    ],
    links: {
      github: "https://github.com/rsyedmuhammad428-cmd/SheetAgent_AgenticAI-",
      demo: "https://sheet-agent-agentic-ai-tbjd.vercel.app",
    },
  },
  {
    id: "dhc-ecommerce",
    name: "DHC Full Stack E-Commerce Web",
    tagline:
      "A full-stack storefront for DeveloperHub Corporation covering product browsing, deals, and supplier information.",
    category: "fullstack",
    isPrimary: true,
    description:
      "A full-stack storefront for DeveloperHub Corporation covering product browsing, categories, deals, services, supplier information, and a newsletter signup, with a responsive frontend.",
    highlights: [
      "Product Browsing",
      "Categories",
      "Deals",
      "Services",
      "Supplier Information",
      "Newsletter",
      "Responsive Frontend",
    ],
    links: {
      demo: "https://dhc-full-stack-e-commerce-web.vercel.app/",
    },
  },
  {
    id: "shopnest",
    name: "ShopNest",
    tagline: "A full-stack e-commerce reference project with cart, wishlist, and checkout flows.",
    category: "fullstack",
    isPrimary: false,
    description:
      "A full-stack e-commerce reference project with cart, wishlist, and Stripe checkout, plus an admin dashboard for managing products and orders, built on the MERN stack with a Mongoose aggregation-pipeline API.",
    highlights: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose (aggregation pipelines)",
      "JWT",
      "Bcrypt",
      "Stripe Checkout",
      "Cart",
      "Wishlist",
      "Admin Dashboard",
      "Email",
    ],
    links: {
      demo: "https://fullstack-ecommerce-shopnest.vercel.app",
    },
  },
];
