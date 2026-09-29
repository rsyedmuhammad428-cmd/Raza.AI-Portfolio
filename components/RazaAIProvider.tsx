"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export type RazaAIPanelContextValue = {
  isOpen: boolean;
  pendingQuestion: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  askQuestion: (question: string) => void;
  clearPendingQuestion: () => void;
};

export const RazaAIPanelContext = createContext<RazaAIPanelContextValue | null>(null);

/**
 * Owns only the panel's visibility and the hand-off of a question from
 * elsewhere on the page (e.g. an example chip) into the chat. The conversation
 * itself lives in ChatWindow.
 */
export function RazaAIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);
  const askQuestion = useCallback((question: string) => {
    setPendingQuestion(question);
    setIsOpen(true);
  }, []);
  const clearPendingQuestion = useCallback(() => setPendingQuestion(null), []);

  const value = useMemo(
    () => ({ isOpen, pendingQuestion, open, close, toggle, askQuestion, clearPendingQuestion }),
    [isOpen, pendingQuestion, open, close, toggle, askQuestion, clearPendingQuestion],
  );

  return <RazaAIPanelContext.Provider value={value}>{children}</RazaAIPanelContext.Provider>;
}
