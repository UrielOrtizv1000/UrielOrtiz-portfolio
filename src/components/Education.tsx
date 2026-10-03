"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { courses, education } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type SpokenLanguage = { name: string; level: string };

/* Visual fill for each spoken language bar, in list order (native, C1). */
const LEVELS = [1, 0.85];

export default function Education() {
  const { t } = useLanguage();
  const languagesList = t<SpokenLanguage[]>("education.languagesList");

  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <SectionHeading index="05" eyebrow={t("education.eyebrow")} title={t("education.title")} />
      </ScrollReveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2" variant="scale">
          <article className="glass spot relative h-full overflow-hidden rounded-[2rem] p-7 sm:p-9">
            <span
              className="serif-accent pointer-events-none absolute -bottom-12 right-2 select-none text-[12rem] leading-none text-foreground/[0.05]"
              aria-hidden="true"
            >
              UAA
            </span>
            <p className="mono-tag text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-text">
              {t("education.degreeLabel")}
            </p>
            {education.map((item) => (
              <div key={item.id} className="relative mt-4">
                <h3 className="display text-[clamp(1.9rem,4vw,2.9rem)] font-black text-foreground">
                  {t("education.degree")}
                </h3>
                <p className="mt-3 text-base font-medium text-foreground">{item.school}</p>
                <p className="mono-tag mt-1 text-xs uppercase tracking-wide text-muted-2">
                  {t("education.period")}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {t("education.description")}
                </p>
              </div>
            ))}
          </article>
        </ScrollReveal>

        <div className="grid gap-4">
          <ScrollReveal delay={100} variant="scale">
            <article className="glass spot h-full rounded-[2rem] p-7">
              <p className="mono-tag text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-text">
                {t("education.coursesLabel")}
              </p>
              <ul className="mt-4 space-y-4">
                {courses.map((course) => (
                  <li key={course.name} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                      ✓
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-foreground">{course.name}</p>
                      <p className="mono-tag mt-0.5 text-xs text-muted-2">{course.provider}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={180} variant="scale">
            <article className="glass spot h-full rounded-[2rem] p-7">
              <p className="mono-tag text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-text">
                {t("education.languagesLabel")}
              </p>
              <ul className="mt-4 space-y-4">
                {languagesList.map((lang, i) => (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                      <span className="mono-tag text-xs text-muted">{lang.level}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                      <motion.span
                        className="block h-full origin-left rounded-full bg-accent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: LEVELS[i] ?? 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.3 + i * 0.15 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
