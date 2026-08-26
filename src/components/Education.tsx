"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { courses, education } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type SpokenLanguage = { name: string; level: string };

export default function Education() {
  const { t } = useLanguage();
  const languagesList = t<SpokenLanguage[]>("education.languagesList");

  return (
    <section
      id="education"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("education.eyebrow")}
          title={t("education.title")}
        />
      </ScrollReveal>

      <div className="grid gap-5 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2">
          <div className="hoverable h-full rounded-2xl border border-border bg-surface p-7">
            <h3 className="text-xs font-bold uppercase tracking-wide text-accent">
              {t("education.degreeLabel")}
            </h3>
            <div className="mt-3 space-y-5">
              {education.map((item) => (
                <div key={item.id}>
                  <p className="text-base font-bold text-foreground">
                    {item.school}
                  </p>
                  <p className="mt-1 text-sm text-muted">{t("education.degree")}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-2">
                    {t("education.period")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t("education.description")}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-accent">
              {t("education.coursesLabel")}
            </h3>
            <ul className="mt-4 space-y-3">
              {courses.map((course) => (
                <li
                  key={course.name}
                  className="border-t border-border pt-3 first:border-t-0 first:pt-0"
                >
                  <p className="text-sm font-medium text-foreground">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-2">{course.provider}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="hoverable h-full rounded-2xl border border-border bg-surface p-7">
            <h3 className="text-xs font-bold uppercase tracking-wide text-accent">
              {t("education.languagesLabel")}
            </h3>
            <ul className="mt-3 space-y-4">
              {languagesList.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {lang.name}
                  </span>
                  <span className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-accent">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
