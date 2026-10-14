"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — nothing to fall back to here.
    }
  };

  const titleEm = t("contact.titleEm");

  return (
    <section
      id="contact"
      className="flex flex-wrap items-center justify-center gap-x-[clamp(24px,5vw,72px)] gap-y-6 py-[clamp(110px,13vw,180px)] text-center"
    >
      <ScrollReveal>
        <Image
          src="/assets/lego-laptop.webp"
          alt={t("contact.imageAlt")}
          width={267}
          height={400}
          className="h-[clamp(240px,28vw,400px)] w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.4)]"
        />
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div className="flex w-fit max-w-full flex-col items-stretch gap-6">
          <h2 className="display text-[clamp(64px,13vw,190px)] leading-[0.88]">
            {t("contact.title")}
            {titleEm ? (
              <>
                {" "}
                <span className="font-serif text-accent normal-case italic font-normal [font-stretch:100%] tracking-[-0.015em]">
                  {titleEm}
                </span>
              </>
            ) : null}
          </h2>
          <p className="text-[17px] leading-[1.6] text-muted">
            <Rich text={t("contact.description")} />
          </p>

          <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={t("contact.copyEmailAria")}
              className="hoverable press label-cond flex items-center justify-center gap-3 rounded-full bg-brand px-6 py-[18px] text-[22px] tracking-[0.03em] text-white hover:bg-brand-strong"
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copyEmail")}</span>
            </button>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable press label-cond flex items-center justify-center gap-3 rounded-full border border-border-strong px-6 py-[18px] text-[22px] tracking-[0.03em] hover:border-brand hover:!text-foreground"
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              {t("contact.github")}
            </a>
          </div>

          <p className="font-mono text-[13px] text-muted-2">{profile.email}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
