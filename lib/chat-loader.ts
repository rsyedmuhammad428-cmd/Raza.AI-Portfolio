/** Single import point for the chat window so it can be lazy-loaded or preloaded. */
export const loadChatWindow = () =>
  import("@/components/ChatWindow").then((module) => module.ChatWindow);
