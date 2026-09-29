export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  currentSemester: number;
  currentCgpa: number;
  currentScgpa: number;
  gradingScale: number;
  coursework?: string[];
};

export const EDUCATION: EducationEntry[] = [
  {
    id: "bs-se",
    degree: "BS Software Engineering",
    institution: "Iqra University, Karachi",
    period: "2024–2028 (Semester 5)",
    currentSemester: 5,
    currentCgpa: 3.4,
    currentScgpa: 3.7,
    gradingScale: 4,
    coursework: [
      "Data Structures & Algorithms",
      "System Design",
      "Database Systems",
      "Object-Oriented Programming (OOP)",
      "Software Engineering",
    ],
  },
];
