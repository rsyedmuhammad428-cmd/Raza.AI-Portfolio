import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { GlassPanel } from "@/components/GlassPanel";

type ContactLink = {
  label: string;
  display: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
};

/** "https://www.linkedin.com/in/abc/" -> "linkedin.com/in/abc" */
function toDisplayUrl(url: string): string {
  const { hostname, pathname } = new URL(url);
  return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`;
}

const LINKS: ContactLink[] = [
  {
    label: "GitHub",
    display: toDisplayUrl(CONTACT.github),
    href: CONTACT.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    display: toDisplayUrl(CONTACT.linkedin),
    href: CONTACT.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    display: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    display: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`,
    icon: Phone,
    external: false,
  },
  {
    label: "Resume",
    display: "Download PDF",
    href: CONTACT.resumeUrl,
    icon: Download,
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-shell py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="min-w-0">
          <p className="font-mono text-sm text-accent">Contact</p>
          <h2 id="contact-heading" className="mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
            Let&apos;s build something intelligent.
          </h2>
          <p className="mt-5 max-w-md text-ink-muted">
            Open to conversations about software engineering and AI work. Email is
            the most direct way to reach me.
          </p>
        </div>

        <ul className="min-w-0 space-y-3">
          {LINKS.map(({ label, display, href, icon: Icon, external }) => (
            <li key={label}>
              <GlassPanel className="p-0">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="group flex min-h-11 items-center gap-4 rounded-panel px-5 py-4 transition-colors hover:border-accent/40"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-ink">{label}</span>
                    <span className="block truncate font-mono text-xs text-ink-muted">
                      {display}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-ink"
                    aria-hidden="true"
                  />
                </a>
              </GlassPanel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
