"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type CopiedField = "email" | null;

export default function Contact() {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState<CopiedField>(null);

  const copyToClipboard = async (field: "email", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard unavailable — nothing to fall back to here.
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          description={t("contact.description")}
        />
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2">
        <ScrollReveal delay={0}>
          <button
            type="button"
            onClick={() => copyToClipboard("email", profile.email)}
            aria-label={t("contact.copyEmailAria")}
            className="hoverable press group flex h-full w-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 text-left hover:border-accent/60 hover:-translate-y-1"
          >
            <span
              className={`hoverable flex h-10 w-10 items-center justify-center rounded-full text-accent ${
                copiedField === "email" ? "bg-accent text-white" : "bg-accent-soft"
              }`}
            >
              {copiedField === "email" ? (
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
                  <path
                    d="M4.5 10.5l3.5 3.5 7.5-8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
                  <path
                    d="M3 5.5h14v9H3v-9Zm0 0 7 5.5 7-5.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
                {t("contact.emailLabel")}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  copiedField === "email"
                    ? "text-accent"
                    : "text-foreground group-hover:text-accent"
                }`}
              >
                {copiedField === "email" ? t("contact.copied") : profile.email}
              </p>
            </div>
          </button>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable press group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 hover:border-accent/60 hover:-translate-y-1"
          >
            <span className="hoverable flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-4.5 w-4.5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </span>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
                {t("contact.githubLabel")}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground group-hover:text-accent">
                UrielOrtizv1000
              </p>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
