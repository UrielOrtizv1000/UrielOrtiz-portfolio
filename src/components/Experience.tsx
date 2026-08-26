"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { experience } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
        />
      </ScrollReveal>

      <ol className="relative space-y-6 border-l border-border pl-8 sm:pl-10">
        {experience.map((item, index) => {
          const bullets = t<string[]>(`experience.items.${item.id}.bullets`);
          const period = t(`experience.items.${item.id}.period`);
          return (
            <ScrollReveal key={item.id} delay={index * 100} as="li" className="relative">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" />
              <div className="hoverable rounded-2xl border border-border bg-surface p-6 hover:border-accent/50">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    {item.company}
                  </h3>
                  {period ? (
                    <span className="text-xs font-medium uppercase tracking-wide text-accent">
                      {period}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-muted">
                  {t(`experience.items.${item.id}.role`)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          );
        })}
      </ol>
    </section>
  );
}
