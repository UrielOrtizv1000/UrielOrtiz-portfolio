"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { courses, education } from "@/lib/data";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type SpokenLanguage = { name: string; level: string };

const label = "font-mono text-xs font-bold uppercase tracking-[0.08em] text-accent";

export default function Education() {
  const { t } = useLanguage();
  const languagesList = t<SpokenLanguage[]>("education.languagesList");
  const school = education[0];

  return (
    <section
      id="education"
      className="flex flex-col items-center gap-[clamp(40px,5vw,64px)] py-[clamp(110px,13vw,180px)] text-center"
    >
      <ScrollReveal>
        <h2 className="display text-[clamp(46px,7vw,100px)] leading-[0.92]">
          <Rich text={t("education.title")} />
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="flex max-w-[900px] flex-col items-center gap-3.5">
          <span className={`${label} mb-1.5 whitespace-nowrap`}>{t("education.period")}</span>
          <h3 className="display text-[clamp(34px,5vw,66px)] leading-[0.92] text-balance">
            {school.school}
          </h3>
          <p className="font-serif text-[clamp(24px,2.6vw,32px)] italic leading-[1.2] text-accent">
            {t("education.degree")}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-4 w-full max-w-[900px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-10">
          <div className="order-2 flex min-w-0 flex-col gap-3">
            <span className={label}>{t("education.focusLabel")}</span>
            <p className="text-[17px] leading-[1.6] text-body">
              <Rich text={t("education.focus")} />
            </p>
          </div>

          <div className="order-1 flex min-w-0 flex-col gap-3">
            <span className={label}>{t("education.certsLabel")}</span>
            {courses.map((course) => (
              <p key={course.name} className="text-[17px] font-semibold leading-normal">
                {course.name}
              </p>
            ))}
            <p className="text-sm text-muted-2">{courses[0].provider}</p>
          </div>

          <div className="order-3 flex min-w-0 flex-col gap-3">
            <span className={label}>{t("education.languagesLabel")}</span>
            {languagesList.map((lang) => (
              <p key={lang.name} className="text-[17px] leading-normal">
                <b className="font-semibold">{lang.name}</b>{" "}
                <span className="text-muted">· {lang.level}</span>
              </p>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
