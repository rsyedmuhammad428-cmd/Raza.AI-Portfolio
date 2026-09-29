export type TimelineEntry = {
  id: string;
  year: string;
  title?: string;
  organization?: string;
  items: string[];
};

export const TIMELINE: TimelineEntry[] = [
  
      {
    id: "education",
    year: "2024 – 2028",
    title: "BS Software Engineering",
    organization: "Iqra University, Karachi",
    items: [
      "Undergraduate degree (Semester 5). Coursework: Data Structures & Algorithms, System Design, Database Systems, OOP, Software Engineering.",
    ],
  },
  {
    id: "freelance",
    year: "2025 – Present",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    items: [
      "Designed and delivered 5+ client websites using MERN stack with JWT auth, RESTful APIs, and responsive UI.",
    ],
  },
  
  {
    id: "frontend-intern",
    year: "Feb 2026 – April 2026",
    title: "Frontend Developer Intern (Remote)",
    organization: "DeveloperHub Corporation",
    items: [
      "Developed responsive React.js and Tailwind CSS interfaces for business and e-commerce websites.",
      "Built reusable UI components and integrated REST APIs for dynamic data rendering.",
      "Improved application performance through code splitting, lazy loading, and component optimization.",
      "Ensured cross-browser compatibility and mobile-first responsive design across client projects.",
    ],
  },
  {
    id: "fullstack-intern",
    year: "May 2026 – July 2026",
    title: "Full Stack Developer Intern (Remote)",
    organization: "DeveloperHub Corporation",
    items: [
      "Developed and maintained full-stack MERN applications, including e-commerce platforms and business websites.",
      "Built scalable REST APIs using Express.js and MongoDB while integrating React frontends.",
      "Implemented JWT authentication, protected routes, CRUD operations, and database models.",
      "Collaborated using Git/GitHub workflows, participated in code reviews, and delivered features following agile practices.",
    ],
  },

  {
    id: "current",
    title: "Building Agentic AI Systems",
    organization: "Self-Employed",
    year: "2026 – Present",
    items: ["Building agentic AI systems: SheetAgent AI, Healthcare AI Agent, AI Software Engineer"],

  },

  
  
]
