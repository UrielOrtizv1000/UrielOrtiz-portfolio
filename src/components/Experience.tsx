"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { experience } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <SectionHeading
          index="04"
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
        />
      </ScrollReveal>

      <ol ref={listRef} className="relative space-y-6 pl-10 sm:pl-14">
        <span className="absolute bottom-2 left-[11px] top-2 w-px bg-border-strong sm:left-[15px]" aria-hidden="true" />
        <motion.span
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-accent sm:left-[15px]"
          style={{ scaleY: fill }}
          aria-hidden="true"
        />

        {experience.map((item, index) => {
          const bullets = t<string[]>(`experience.items.${item.id}.bullets`);
          const period = t(`experience.items.${item.id}.period`);
          return (
            <ScrollReveal key={item.id} delay={index * 120} as="li" className="relative">
              <span
                className="absolute -left-10 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-1 ring-border-strong sm:-left-14 sm:h-8 sm:w-8"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              </span>
              <article className="glass spot hoverable rounded-[1.75rem] p-6 hover:-translate-y-1 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {t(`experience.items.${item.id}.role`)}
                    </p>
                  </div>
                  {period ? (
                    <span className="mono-tag rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-foreground">
                      {period}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-6 grid gap-3 border-t border-border pt-5 md:grid-cols-2">
                  {bullets.map((bullet, i) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mono-tag mt-0.5 text-xs text-accent-text">0{i + 1}</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          );
        })}
      </ol>
    </section>
  );
}
