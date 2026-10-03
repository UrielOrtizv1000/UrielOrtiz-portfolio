"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import ScrollReveal from "./Reveal";

/* Drifts toward the cursor while hovered, then springs back. */
function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const cvFile = profile.cvFiles[language];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — nothing to fall back to here.
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <div className="flex items-center gap-3">
          <span className="mono-tag flex h-7 min-w-7 items-center justify-center rounded-full bg-foreground px-2 text-[11px] font-semibold text-background">
            06
          </span>
          <span className="mono-tag text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {t("contact.eyebrow")}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h2 className="display mt-8 text-[clamp(3.5rem,13vw,10rem)] font-black text-foreground">
          {t("contact.titleA")}
          <br />
          <span className="serif-accent font-normal tracking-[-0.04em] text-accent">{t("contact.titleB")}</span>
          <span className="text-accent">.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {t("contact.description")}
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <ScrollReveal delay={0} variant="scale">
          <Magnetic strength={0.08}>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={t("contact.copyEmailAria")}
              className="press group relative flex w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-7 text-left text-on-ink sm:min-h-[13rem]"
            >
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent opacity-80 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <span className="relative flex items-center justify-between">
                <span className="mono-tag text-[11px] font-semibold uppercase tracking-[0.2em] text-on-ink/60">
                  {t("contact.emailLabel")}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-on-ink text-ink transition-transform duration-300 group-hover:rotate-12">
                  {copied ? "✓" : "⧉"}
                </span>
              </span>
              <span className="relative mt-10 block min-h-[2.5rem] text-[clamp(1.25rem,2.6vw,1.9rem)] font-bold tracking-tight">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "email"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`block break-all ${copied ? "text-accent" : ""}`}
                  >
                    {copied ? t("contact.copied") : profile.email}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </Magnetic>
        </ScrollReveal>

        {[
          {
            href: profile.github,
            label: t("contact.githubLabel"),
            value: "UrielOrtizv1000",
            action: t("contact.githubAction"),
            external: true,
          },
          {
            href: cvFile,
            label: t("contact.cvLabel"),
            value: cvFile.replace(/_/g, " ").replace(".pdf", ""),
            action: t("contact.cvAction"),
            download: cvFile,
          },
        ].map((card, i) => (
          <ScrollReveal key={card.label} delay={90 * (i + 1)} variant="scale">
            <a
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              download={card.download}
              className="glass spot hoverable press group flex h-full flex-col justify-between rounded-[2rem] p-7 hover:-translate-y-1"
            >
              <span className="flex items-center justify-between">
                <span className="mono-tag text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {card.label}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className="mt-10 block">
                <span className="block truncate text-lg font-bold tracking-tight text-foreground">{card.value}</span>
                <span className="mt-1 block text-sm text-muted">{card.action}</span>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
