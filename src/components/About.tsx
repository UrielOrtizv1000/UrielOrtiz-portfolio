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
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-20 gap-y-12 py-[clamp(110px,13vw,180px)]"
    >
      <ScrollReveal className="lg:sticky lg:top-24">
        <div className="flex flex-col gap-5">
          <h2 className="display text-[clamp(34px,4.4vw,60px)] leading-[0.92]">
            <Rich text={t("about.title")} />
          </h2>
          <p className="max-w-[520px] text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]">
            <Rich text={t("about.lead")} />
          </p>
          <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
            <Rich text={t("about.sub")} />
          </p>
        </div>
      </ScrollReveal>

      <ul className="flex flex-col gap-14 pt-3">
        {principles.map((item, index) => (
          <ScrollReveal key={item.title} as="li" delay={index * 100}>
            <div className="flex flex-col gap-3">
              <span className="block h-0.5 w-10 bg-brand" />
              <span className="display text-[clamp(30px,3vw,38px)] leading-none">{item.title}</span>
              <span className="max-w-[460px] text-[17px] leading-[1.6] text-muted">{item.body}</span>
            </div>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
