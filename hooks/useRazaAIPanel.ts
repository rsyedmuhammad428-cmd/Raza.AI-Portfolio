"use client";

import { useContext } from "react";
import { RazaAIPanelContext } from "@/components/RazaAIProvider";

export function useRazaAIPanel() {
  const context = useContext(RazaAIPanelContext);
  if (!context) {
    throw new Error("useRazaAIPanel must be used within RazaAIProvider");
  }
  return context;
}
