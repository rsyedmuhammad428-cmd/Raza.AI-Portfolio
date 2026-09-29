export type TechCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Database"
  | "DevOps"
  | "Security";

export type Technology = {
  name: string;
  category: TechCategory;
  /** Display names of projects (or "This portfolio (raza.ai)") — verified associations only. */
  usedIn: string[];
};
