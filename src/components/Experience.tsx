"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { experience } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="flex flex-col gap-6 pt-[88px] md:gap-14 md:py-[clamp(110px,13vw,180px)]">
      <ScrollReveal>
        <SectionHeading title={t("experience.title")} description={t("experience.description")} />
      </ScrollReveal>

      <ol className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-x-20 gap-y-10 md:mt-0 md:gap-y-14">
        {experience.map((item, index) => {
          const bullets = t<string[]>(`experience.items.${item.id}.bullets`);
          return (
            <ScrollReveal key={item.id} as="li" delay={index * 100} className="min-w-0">
              <div className="flex flex-col gap-2.5 max-md:border-l-2 max-md:border-brand max-md:pl-[18px] md:gap-3.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent md:text-xs">
                  {t(`experience.items.${item.id}.period`)}
                </span>
                <h3 className="display text-[32px] leading-[0.95] md:text-[clamp(30px,3.2vw,42px)]">{item.company}</h3>
                <p className="text-base font-semibold leading-[1.4] md:text-[17px]">
                  {t(`experience.items.${item.id}.role`)}
                </p>
                <ul className="mt-1 flex flex-col gap-2.5 md:mt-1.5">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[18px_1fr] text-[15px] leading-[1.6] text-muted md:grid-cols-[20px_1fr] md:text-base">
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
