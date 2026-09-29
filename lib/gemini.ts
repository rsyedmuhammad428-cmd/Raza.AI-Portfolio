import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "@/data/knowledge";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { CONTACT } from "@/data/contact";
import { EDUCATION } from "@/data/education";
import { TIMELINE } from "@/data/experience";
import { retrieveRelevantContext } from "@/lib/rag";
import type { ChatMessage } from "@/types/chat";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const TIMEOUT_MS = 15_000;
const MAX_OUTPUT_TOKENS = 1200;

let client: GoogleGenAI | null = null;

function hasGeminiApiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

function getClient(): GoogleGenAI {
  if (client) return client;

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  client = new GoogleGenAI({ apiKey });
  return client;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Gemini request timed out")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function generateKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // 1. Experience & Years of Experience Queries
  if (
    query.includes("experience") ||
    query.includes("years") ||
    query.includes("how long") ||
    query.includes("history") ||
    query.includes("working since")
  ) {
    const years = TIMELINE.map((t) => parseInt(t.year)).filter((y) => !isNaN(y));
    const startYear = years.length > 0 ? Math.min(...years) : 2023;
    const currentYear = new Date().getFullYear();
    const expYears = currentYear - startYear + 1;

    const timelineSummary = TIMELINE.map((t) => `${t.year}: ${t.items.join(", ")}`).join("\n");

    return `Raza has approximately ${expYears}+ years of hands-on software development and AI engineering experience (active since ${startYear}).\n\nCareer Timeline:\n${timelineSummary}\n\nCurrently, he is focused on building agentic AI systems, LangGraph multi-agent pipelines, and production web applications.`;
  }

  // 2. Research paper queries
  if (
    query.includes("research paper") ||
    query.includes("research papers") ||
    query.includes("paper") && (query.includes("write") || query.includes("working") || query.includes("published"))
  ) {
    return `Yes. Raza is currently working on a research paper. The paper's title and topic are not currently available in the portfolio context.`;
  }

  // 3. Who / About / Profile / Location / Role Queries
  if (
    query.includes("who is") ||
    query.includes("about raza") ||
    query.includes("role") ||
    query.includes("location") ||
    query.includes("bio") ||
    query.includes("background")
  ) {
    return `Syed Muhammad Raza Zaidi is a ${PROFILE.roles.join(", ")} based in ${PROFILE.location}.\n\n• Current Role: ${PROFILE.currentRole}\n• Career Goal: ${PROFILE.careerGoal}\n• Statement: ${PROFILE.statement}`;
  }

  // 4. Specific Project Matching (Dynamic lookup)
  for (const project of PROJECTS) {
    const pName = project.name.toLowerCase();
    const pId = project.id.toLowerCase();
    const matchesProject =
      query.includes(pId) ||
      pName.split(" ").some((word) => word.length > 3 && query.includes(word));

    if (matchesProject) {
      let reply = `### ${project.name}\n${project.tagline}\n\n`;
      if (project.problem) reply += `• Problem: ${project.problem}\n`;
      if (project.solution) reply += `• Solution: ${project.solution}\n`;
      reply += `• Technologies: ${project.highlights.join(", ")}\n`;
      if (project.links.github) reply += `• GitHub: ${project.links.github}\n`;
      if (project.links.demo) reply += `• Live Demo: ${project.links.demo}\n`;
      return reply.trim();
    }
  }

  // 5. Projects General Query
  if (
    query.includes("project") ||
    query.includes("work") ||
    query.includes("built") ||
    query.includes("portfolio") ||
    query.includes("app")
  ) {
    const list = PROJECTS.map((p, idx) => `${idx + 1}. **${p.name}**: ${p.tagline}`).join("\n");
    return `Syed Muhammad Raza Zaidi has built the following featured AI & Full-Stack projects:\n\n${list}`;
  }

  // 6. Skills & Tech Stack Queries
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("technology") ||
    query.includes("tech") ||
    query.includes("language") ||
    query.includes("python") ||
    query.includes("react") ||
    query.includes("fastapi") ||
    query.includes("langgraph") ||
    query.includes("docker")
  ) {
    const skillText = SKILLS.map((s) => `• **${s.category}**: ${s.items.join(", ")}`).join("\n");
    return `Here is Raza's technical stack & skills:\n\n${skillText}`;
  }

  // 7. Education Queries
  if (
    query.includes("education") ||
    query.includes("university") ||
    query.includes("iqra") ||
    query.includes("degree") ||
    query.includes("study") ||
    query.includes("college")
  ) {
    const eduList = EDUCATION.map(
      (e) =>
        `• ${e.degree} at ${e.institution} (${e.period})\n  Current semester: ${e.currentSemester}\n  Current CGPA: ${e.currentCgpa}/${e.gradingScale}\n  Current SCGPA: ${e.currentScgpa}/${e.gradingScale}`,
    ).join("\n");
    return `Education Details:\n${eduList}`;
  }

  // 8. Contact / Hire / Links Queries
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("github") ||
    query.includes("linkedin") ||
    query.includes("hire") ||
    query.includes("reach") ||
    query.includes("resume") ||
    query.includes("phone")
  ) {
    return `Contact Information for Syed Muhammad Raza Zaidi:\n• Email: ${CONTACT.email}\n• GitHub: ${CONTACT.github}\n• LinkedIn: ${CONTACT.linkedin}\n• Phone: ${CONTACT.phone}\n• Resume: ${CONTACT.resumeUrl}`;
  }

  // 9. RAG Semantic Chunk Retrieval (Fallback for all other queries)
  const chunks = retrieveRelevantContext(query, 2);
  const bestChunk = chunks[0];
  if (bestChunk && bestChunk.content) {
    return `Based on Raza's portfolio context (${bestChunk.title}):\n\n${bestChunk.content}`;
  }

  // 10. Honest fallback for out-of-scope / unavailable information
  return `I do not have specific information about that in Raza's portfolio context. You can ask me about Raza's projects (SheetAgent AI, Healthcare AI, AI Software Engineer), experience, technical skills, education, or contact details (${CONTACT.email}).`;
}

/**
 * Sends the conversation to Gemini using RAG (Retrieval-Augmented Generation), or uses the knowledge engine fallback.
 * Always resolves to a response so the chatbot never displays an error.
 */
export async function askRazaAI(messages: ChatMessage[]): Promise<string> {
  const lastMessage = messages[messages.length - 1]?.content || "";

  if (hasGeminiApiKey()) {
    try {
      const ai = getClient();
      const contents = messages.map((message) => ({
        role: message.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: message.content }],
      }));

      // RAG Retrieval Step: Retrieve top 3 relevant chunks for the user query
      const retrievedChunks = retrieveRelevantContext(lastMessage, 3);
      const ragContext = retrievedChunks
        .map((c) => `[RETRIEVED CONTEXT: ${c.title}]\n${c.content}`)
        .join("\n\n");

      const dynamicSystemInstruction = `${SYSTEM_INSTRUCTION}\n\n### RETRIEVED RAG CONTEXT:\n${ragContext}`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: MODEL,
          contents,
          config: {
            systemInstruction: dynamicSystemInstruction,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
          },
        }),
        TIMEOUT_MS,
      );

      const text = response.text;
      if (typeof text === "string" && text.trim().length > 0) {
        return text.trim();
      }
    } catch {
      // Fallback to local knowledge engine below if Gemini call fails
    }
  }

  return generateKnowledgeResponse(lastMessage);
}
