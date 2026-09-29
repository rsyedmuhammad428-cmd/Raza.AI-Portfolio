"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { useRazaAIPanel } from "@/hooks/useRazaAIPanel";
import { EXAMPLE_QUESTIONS } from "@/data/example-questions";
import { GlassPanel } from "@/components/GlassPanel";
import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import type { ChatMessage } from "@/types/chat";

const MAX_MESSAGE_LENGTH = 1000;

const UNAVAILABLE_MESSAGE =
  "Raza AI is temporarily unavailable. You can still explore Raza's projects and skills below.";
const RATE_LIMIT_MESSAGE =
  "You're sending messages a little quickly — please wait a moment and try again.";

type Status = "idle" | "loading" | "error";

export function ChatWindow() {
  const { isOpen, close, pendingQuestion, clearPendingQuestion } = useRazaAIPanel();
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!trimmed || status === "loading") return;

      const history = messages;

      // On any failure the optimistic message is taken back out of the thread
      // and returned to the input, so a retry is one tap and the history never
      // contains a question that has no answer.
      const fail = (message: string) => {
        setMessages(history);
        setInput(trimmed);
        setStatus("error");
        setErrorText(message);
      };

      setMessages([...history, { role: "user", content: trimmed }]);
      setInput("");
      setStatus("loading");
      setErrorText(null);

      try {
        const res = await fetch("/api/raza-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        if (res.status === 429) return fail(RATE_LIMIT_MESSAGE);
        if (!res.ok) return fail(UNAVAILABLE_MESSAGE);

        const data: unknown = await res.json();
        const reply =
          typeof data === "object" && data !== null && "reply" in data
            ? (data as { reply: unknown }).reply
            : null;

        if (typeof reply !== "string" || reply.trim().length === 0) {
          return fail(UNAVAILABLE_MESSAGE);
        }

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        setStatus("idle");
      } catch {
        fail(UNAVAILABLE_MESSAGE);
      }
    },
    [messages, status],
  );

  // A question handed over from elsewhere on the page (e.g. an example chip).
  useEffect(() => {
    if (isOpen && pendingQuestion) {
      const question = pendingQuestion;
      clearPendingQuestion();
      void sendMessage(question);
    }
  }, [isOpen, pendingQuestion, clearPendingQuestion, sendMessage]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages, status, prefersReducedMotion]);

  // Open: remember where focus was, move it into the panel, close on Escape.
  // Close: hand focus back to where the visitor came from.
  useEffect(() => {
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      const previous = returnFocusRef.current;
      // The floating button unmounts while the panel is open, so fall back to it.
      const target =
        previous && previous.isConnected ? previous : document.getElementById("raza-ai-fab");
      target?.focus();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="raza-ai-panel"
          role="dialog"
          aria-label="Raza AI assistant"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 sm:inset-auto sm:bottom-6 sm:right-6"
        >
          <GlassPanel className="flex h-full w-full flex-col !bg-base-panel/95 sm:h-[34rem] sm:w-96">
            <div className="flex items-center justify-between border-b border-base-border py-1.5 pl-4 pr-1.5 pt-[max(0.375rem,env(safe-area-inset-top))]">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-sm">Raza AI</span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close Raza AI"
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink-faint transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation with Raza AI"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 && status !== "loading" && (
                <div>
                  <p className="text-sm text-ink-muted">
                    Ask about Raza&apos;s projects, skills, experience, or how any of
                    the AI systems work. Answers come only from this portfolio&apos;s
                    data.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {EXAMPLE_QUESTIONS.slice(0, 4).map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void sendMessage(question)}
                        className="touch-target rounded-full border border-base-border px-3 py-1.5 text-left text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <ChatMessageBubble key={index} message={message} />
              ))}

              {status === "loading" && (
                <div
                  role="status"
                  className="max-w-[88%] animate-pulse rounded-2xl bg-black/25 px-3.5 py-2 text-sm text-ink-muted"
                >
                  Thinking…
                </div>
              )}

              {status === "error" && errorText && (
                <div
                  role="alert"
                  className="rounded-2xl border border-base-border bg-black/25 px-3.5 py-2 text-sm text-ink-muted"
                >
                  {errorText}
                  {input && " Your message is still in the box — press send to retry."}
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-base-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                placeholder="Ask about a project, skill, or experience…"
                aria-label="Message Raza AI"
                // 16px on small screens: anything smaller makes iOS Safari zoom the page on focus.
                className="min-h-11 flex-1 rounded-full border border-base-border bg-black/25 px-4 py-2 text-[16px] text-ink placeholder:text-ink-faint sm:min-h-0 sm:text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading" || input.trim().length === 0}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-canvas transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
