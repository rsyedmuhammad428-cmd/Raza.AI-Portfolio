import Image from "next/image";
import { CONTACT } from "@/data/contact";
import { PROFILE } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-base-border">
      <div className="section-shell flex flex-col gap-4 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Raza AI Logo"
            width={20}
            height={20}
            className="h-5 w-5 rounded object-cover border border-accent/30"
          />
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js,
            TypeScript, Tailwind CSS, and Gemini API.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5">
          <a href="#main" className="inline-flex py-2 transition-colors hover:text-ink">
            Back to top
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex py-2 transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex py-2 transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex py-2 transition-colors hover:text-ink">
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
