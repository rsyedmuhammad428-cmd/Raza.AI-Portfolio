import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { TIMELINE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { CONTACT } from "@/data/contact";
import { TECHNOLOGIES } from "@/data/tech-stack";

const FIXED_SYSTEM_INSTRUCTION = `You are Raza AI, the official AI assistant for Syed Muhammad Raza Zaidi's portfolio.

Your job is to answer questions about Raza's professional profile, projects, skills, education, academic performance, experience, software engineering work, AI/LLM work, and agentic AI systems.

Use ONLY the portfolio information provided in your context.

Never invent or assume information about Raza.

If requested information is not available in the portfolio context, clearly state that it is not currently available.

Be professional, friendly, and technically accurate. Give a complete answer to every part of the question, with enough detail to be useful. Explain relevant technologies, architecture, purpose, and capabilities when asked. Use clear paragraphs or bullets for multi-part answers, and finish every sentence and thought. Avoid overly brief answers that omit requested details.

Interpret each question using the complete portfolio context and answer the specific question asked. CGPA means cumulative grade point average, while SCGPA means semester cumulative grade point average. When asked about academic status, distinguish the current semester, CGPA, and SCGPA. When asked about Raza's best quality, describe strengths supported by his projects, experience, skills, or statement; do not invent personality traits.

When discussing projects, explain the actual technologies, architecture, purpose, and capabilities provided in the portfolio data.

When appropriate, provide relevant GitHub or live-demo links.

Do not claim that Raza has experience, clients, certifications, employment, technologies, achievements, or projects that are not present in the portfolio data.

You are an assistant for the portfolio, not a general-purpose general knowledge assistant.`;

function buildPortfolioContext(): string {
  const profileBlock = [
    `Name: ${PROFILE.name}`,
    `Roles: ${PROFILE.roles.join(", ")}`,
    `Location: ${PROFILE.location}`,
    `Current role: ${PROFILE.currentRole}`,
    `Research paper: ${PROFILE.researchPaperStatus}`,
    `Career goal: ${PROFILE.careerGoal}`,
    `Statement: ${PROFILE.statement}`,
  ].join("\n");

  const educationBlock = EDUCATION.map(
    (entry) =>
      `${entry.degree}, ${entry.institution} (${entry.period})
    Current semester: ${entry.currentSemester}
    Current CGPA: ${entry.currentCgpa}/${entry.gradingScale}
    Current SCGPA: ${entry.currentScgpa}/${entry.gradingScale}${
        entry.coursework ? `\nRelevant Coursework: ${entry.coursework.join(", ")}` : ""
      }`,
  ).join("\n");

  const experienceBlock = TIMELINE.map(
    (entry) =>
      `${entry.title ? `${entry.title} ` : ""}${entry.organization ? `at ${entry.organization} ` : ""}(${entry.year}):\n${entry.items.map((i) => `  - ${i}`).join("\n")}`,
  ).join("\n\n");

  const skillsBlock = SKILLS.map(
    (group) => `${group.category}: ${group.items.join(", ")}`,
  ).join("\n");

  const projectsBlock = PROJECTS.map((project) => {
    const lines = [
      `### ${project.name}${project.isPrimary ? "" : " (secondary/reference project)"}`,
      project.tagline,
    ];
    if (project.problem) lines.push(`Problem: ${project.problem}`);
    if (project.solution) lines.push(`Solution: ${project.solution}`);
    if (project.description) lines.push(`Description: ${project.description}`);
    lines.push(`Technologies: ${project.highlights.join(", ")}`);
    if (project.architecture) {
      lines.push(`Architecture: ${project.architecture.map((step) => step.label).join(" -> ")}`);
    }
    if (project.links.github) lines.push(`GitHub: ${project.links.github}`);
    if (project.links.demo) lines.push(`Live demo: ${project.links.demo}`);
    return lines.join("\n");
  }).join("\n\n");

  const techBlock = TECHNOLOGIES.map(
    (tech) => `${tech.name} (${tech.category}) — used in: ${tech.usedIn.join(", ")}`,
  ).join("\n");

  const contactLines = [
    `GitHub: ${CONTACT.github}`,
    `LinkedIn: ${CONTACT.linkedin}`,
    `Email: ${CONTACT.email}`,
    `Phone: ${CONTACT.phone}`,
    `Resume (downloadable): ${CONTACT.resumeUrl}`,
  ];

  return [
    "PROFILE",
    profileBlock,
    "\nEDUCATION",
    educationBlock,
    "\nEXPERIENCE TIMELINE",
    experienceBlock,
    "\nSKILLS",
    skillsBlock,
    "\nPROJECTS",
    projectsBlock,
    "\nTECHNOLOGY USAGE (which projects use which technology)",
    techBlock,
    "\nCONTACT",
    contactLines.join("\n"),
  ].join("\n");
}

export const SYSTEM_INSTRUCTION = `${FIXED_SYSTEM_INSTRUCTION}

---
PORTFOLIO DATA (source of truth — never go beyond this):
${buildPortfolioContext()}`;
