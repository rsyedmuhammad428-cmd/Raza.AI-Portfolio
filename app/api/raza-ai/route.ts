import { NextRequest, NextResponse } from "next/server";
import { askRazaAI } from "@/lib/gemini";
import { isRateLimited } from "@/lib/rate-limit";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1000;
// Only the most recent turns are forwarded to Gemini — keeps cost and
// latency bounded regardless of how long the on-screen conversation gets.
const MAX_HISTORY_MESSAGES = 6;

function getClientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { role?: unknown; content?: unknown };
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { message: rawMessage, history: rawHistory } = body as {
    message?: unknown;
    history?: unknown;
  };

  if (typeof rawMessage !== "string") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const message = rawMessage.trim();
  if (message.length === 0) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "message_too_long" }, { status: 413 });
  }

  const history: ChatMessage[] = Array.isArray(rawHistory)
    ? rawHistory
        .filter(isChatMessage)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))
        .slice(-MAX_HISTORY_MESSAGES)
    : [];

  if (isRateLimited(getClientKey(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const reply = await askRazaAI([...history, { role: "user", content: message }]);
    return NextResponse.json({ reply });
  } catch {
    // Timeouts, API errors, missing key, empty responses — all one honest
    // fallback for the client. Details are deliberately not leaked.
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
