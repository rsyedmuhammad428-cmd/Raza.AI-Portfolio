"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRazaAIPanel } from "@/hooks/useRazaAIPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { loadChatWindow } from "@/lib/chat-loader";

function ChatLoading() {
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 rounded-panel border border-base-border bg-base-panel/95 px-4 py-3 text-sm text-ink-muted sm:inset-x-auto sm:bottom-6 sm:right-6"
    >
      Loading Raza AI…
    </div>
  );
}

function ChatLoadFailed() {
  return (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-4 z-50 rounded-panel border border-base-border bg-base-panel/95 px-4 py-3 text-sm text-ink-muted sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xs"
    >
      Raza AI couldn&apos;t load. Reload the page to try again — the rest of the
      portfolio is unaffected.
    </div>
  );
}

// The chat UI (and its code) is only fetched the first time it is opened.
const ChatWindow = dynamic(loadChatWindow, { ssr: false, loading: ChatLoading });

export function LazyChatWindow() {
  const { isOpen } = useRazaAIPanel();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  if (!hasOpened) return null;

  return (
    <ErrorBoundary fallback={<ChatLoadFailed />}>
      <ChatWindow />
    </ErrorBoundary>
  );
}
