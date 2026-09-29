"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/#project-lab");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-spy: detects active section dynamically as visitor scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const item of NAV_ITEMS) {
        const id = item.href.replace("/#", "");
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell mt-4">
        <nav
          aria-label="Primary"
          className="glass-panel flex items-center justify-between px-4 py-1.5 sm:px-6"
        >
          <a
            href="/"
            className="touch-target flex items-center gap-2.5 font-display text-sm font-medium tracking-tight text-ink hover:opacity-90 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Raza AI Logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-md object-cover border border-accent/40 shadow-[0_0_10px_rgba(217,161,90,0.25)]"
            />
            <span>
              raza<span className="text-accent">.ai</span>
            </span>
          </a>

          <ul className="hidden items-center gap-5 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href} className="relative py-2">
                  <a
                    href={item.href}
                    onClick={() => setActiveSection(item.href)}
                    className={`inline-flex items-center px-1 py-1 text-sm transition-colors ${
                      isActive ? "text-accent font-medium" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-accent shadow-[0_0_8px_rgba(217,161,90,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/#raza-ai"
              className="touch-target hidden gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm text-accent transition-colors hover:bg-accent/20 sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Ask Raza AI
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-base-border text-ink md:hidden"
            >
              {isOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              id="mobile-nav"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              className="glass-panel mt-2 flex flex-col px-2 py-2 md:hidden"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.href);
                        setIsOpen(false);
                      }}
                      className={`flex min-h-11 items-center rounded-md px-3 text-sm transition-colors ${
                        isActive
                          ? "bg-accent/10 text-accent font-medium border-l-2 border-accent"
                          : "text-ink-muted hover:bg-white/5 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
