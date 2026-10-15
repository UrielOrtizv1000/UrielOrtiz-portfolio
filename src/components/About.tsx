"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type Principle = { title: string; body: string };

export default function About() {
  const { t } = useLanguage();
  const principles = t<Principle[]>("about.values");

  return (
    <section
      id="about"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-20 gap-y-5 pt-[88px] md:gap-y-12 md:py-[clamp(110px,13vw,180px)]"
    >
      <ScrollReveal className="lg:sticky lg:top-24">
        <div className="flex flex-col gap-5">
          <h2 className="display text-[56px] leading-[0.9] md:text-[clamp(34px,4.4vw,60px)] md:leading-[0.92]">
            <Rich text={t("about.title")} />
          </h2>
          <p className="max-w-[520px] text-[26px] leading-[1.18] tracking-[-0.02em] [text-wrap:pretty] md:text-[clamp(28px,3vw,40px)] md:leading-[1.15]">
            <Rich text={t("about.lead")} />
          </p>
          <p className="max-w-[420px] text-base leading-[1.6] text-muted md:text-[17px]">
            <Rich text={t("about.sub")} />
          </p>
        </div>
      </ScrollReveal>

      <ul className="mt-6 flex flex-col gap-9 md:mt-0 md:gap-14 md:pt-3">
        {principles.map((item, index) => (
          <ScrollReveal key={item.title} as="li" delay={index * 100}>
            <div className="flex flex-col gap-2.5 md:gap-3">
              <span className="block h-0.5 w-9 bg-brand md:w-10" />
              <span className="display text-[30px] leading-none md:text-[clamp(30px,3vw,38px)]">{item.title}</span>
              <span className="max-w-[460px] text-base leading-[1.6] text-muted md:text-[17px]">{item.body}</span>
            </div>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
