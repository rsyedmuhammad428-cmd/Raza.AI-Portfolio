"use client";

import { Sparkles } from "lucide-react";
import { useRazaAIPanel } from "@/hooks/useRazaAIPanel";
import { loadChatWindow } from "@/lib/chat-loader";

export function RazaAIFloatingButton() {
  const { isOpen, open } = useRazaAIPanel();

  // The open panel has its own close control; hiding the button avoids
  // stacking two controls in the same corner (and on the mobile full-screen view).
  if (isOpen) return null;

  // Start fetching the chat code as soon as intent is clear, so opening feels instant.
  const preload = () => void loadChatWindow().catch(() => undefined);

  return (
    <button
      id="raza-ai-fab"
      type="button"
      onClick={open}
      onPointerEnter={preload}
      onFocus={preload}
      aria-label="Ask Raza AI"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-base-panel/90 text-accent shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-accent/25 opacity-60 blur-lg"
      />
      <Sparkles className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
