import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

const URL_PATTERN = /(https?:\/\/[^\s<>"')\]]+[^\s<>"')\].,;:!?])/g;

/** Turns bare URLs in assistant text into safe links (no HTML injection). */
function renderWithLinks(text: string) {
  return text.split(URL_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noreferrer noopener"
        className="break-all text-accent underline-offset-2 hover:underline"
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
        isUser ? "ml-auto bg-accent/15 text-ink" : "bg-black/25 text-ink-muted",
      )}
    >
      {isUser ? message.content : renderWithLinks(message.content)}
    </div>
  );
}
