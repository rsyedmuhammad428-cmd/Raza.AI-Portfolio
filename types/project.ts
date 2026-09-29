export type ProjectCategory = "ai" | "fullstack";

export type ProjectLink = {
  github?: string;
  demo?: string;
};

export type ArchitectureStep = {
  id: string;
  label: string;
  description: string;
};

export type ProjectDetail = {
  id: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  /** Primary projects get the full expandable Project Lab treatment; others are shown as secondary references. */
  isPrimary: boolean;
  /** Problem/solution framing — used when the project's own scope supports it. */
  problem?: string;
  solution?: string;
  /** Plain description — used instead of problem/solution when that framing isn't warranted by verified info. */
  description?: string;
  highlights: string[];
  architecture?: ArchitectureStep[];
  links: ProjectLink;
};
