import type { Metadata, Viewport } from "next";

import { Navigation } from "@/components/Navigation";
import { RazaAIProvider } from "@/components/RazaAIProvider";
import { Footer } from "@/components/Footer";
import { RazaAIFloatingButton } from "@/components/RazaAIFloatingButton";
import { LazyChatWindow } from "@/components/LazyChatWindow";
import "./globals.css";




export const metadata: Metadata = {
  metadataBase: new URL("https://raza-ai-portfolio.vercel.app"),
  title: "Syed Muhammad Raza Zaidi — Full Stack & Agentic AI Engineer",
  description:
    "Portfolio of Syed Muhammad Raza Zaidi: full stack developer and AI/LLM engineer building agentic systems. Explore projects, architecture, and Raza AI — an AI assistant that answers questions about the work.",
  openGraph: {
    title: "Syed Muhammad Raza Zaidi — Full Stack & Agentic AI Engineer",
    description:
      "Full stack developer and AI/LLM engineer building agentic systems. Explore the projects, architecture, and Raza AI.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the layout use the safe-area insets on notched phones.
  viewportFit: "cover",
  themeColor: "#0B0D12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      
    >
      <head>
        {/* Section-reveal starts content at opacity 0; keep it visible without JavaScript. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="bg-base">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <RazaAIProvider>
          <Navigation />
          {children}
          <Footer />
          <RazaAIFloatingButton />
          <LazyChatWindow />
        </RazaAIProvider>
      </body>
    </html>
  );
}
