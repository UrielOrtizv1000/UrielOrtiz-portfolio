"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type AboutValue = { title: string; body: string };

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* Paragraph whose words light up as it scrolls through the viewport. */
function ScrollLitParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[clamp(1.6rem,3.6vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground"
    >
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

const ICONS = [
  // server stack
  "M4 5.5h16v5H4zM4 13.5h16v5H4zM7.5 8h.01M7.5 16h.01",
  // steps / checklist
  "M5 7l2 2 3.5-3.5M5 15l2 2 3.5-3.5M13.5 8H19M13.5 16H19",
  // document
  "M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h6M9.5 15.5h6",
];

export default function About() {
  const { t } = useLanguage();
  const values = t<AboutValue[]>("about.values");

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <SectionHeading index="01" eyebrow={t("about.eyebrow")} title={t("about.heading")} />
      </ScrollReveal>

      <ScrollLitParagraph text={t("about.summary")} />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {values.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 110} className="h-full" variant="scale">
            <article className="glass spot hoverable group h-full rounded-[1.75rem] p-6 hover:-translate-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d={ICONS[i % ICONS.length]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mono-tag text-xs text-muted-2">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
