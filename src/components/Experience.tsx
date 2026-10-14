"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { experience } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="flex flex-col gap-14 py-[clamp(110px,13vw,180px)]">
      <ScrollReveal>
        <SectionHeading title={t("experience.title")} description={t("experience.description")} />
      </ScrollReveal>

      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-x-20 gap-y-14">
        {experience.map((item, index) => {
          const bullets = t<string[]>(`experience.items.${item.id}.bullets`);
          return (
            <ScrollReveal key={item.id} as="li" delay={index * 100} className="min-w-0">
              <div className="flex flex-col gap-3.5">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-accent">
                  {t(`experience.items.${item.id}.period`)}
                </span>
                <h3 className="display text-[clamp(30px,3.2vw,42px)] leading-[0.95]">{item.company}</h3>
                <p className="text-[17px] font-semibold leading-[1.4]">
                  {t(`experience.items.${item.id}.role`)}
                </p>
                <ul className="mt-1.5 flex flex-col gap-2.5">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[20px_1fr] text-base leading-[1.6] text-muted">
                      <span aria-hidden="true" className="text-brand">→</span>
                      <span>{bullet}</span>
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
