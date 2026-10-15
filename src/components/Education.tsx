"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { courses, education } from "@/lib/data";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type SpokenLanguage = { name: string; level: string };

const label = "font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent md:text-xs";
// Phones stack the three columns as ruled, centred rows (the last row is closed by a bottom rule).
const block =
  "flex min-w-0 flex-col gap-2 max-md:border-t max-md:border-border max-md:py-5 md:gap-3 max-md:last:border-b";

export default function Education() {
  const { t } = useLanguage();
  const languagesList = t<SpokenLanguage[]>("education.languagesList");
  const school = education[0];

  return (
    <section
      id="education"
      className="flex flex-col items-center gap-5 pt-[88px] text-center md:gap-[clamp(40px,5vw,64px)] md:py-[clamp(110px,13vw,180px)]"
    >
      <ScrollReveal>
        <h2 className="display text-[56px] leading-[0.9] md:text-[clamp(46px,7vw,100px)] md:leading-[0.92]">
          <Rich text={t("education.title")} />
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="flex max-w-[900px] flex-col items-center gap-5 max-md:mt-2 md:gap-3.5">
          <span className={`${label} whitespace-nowrap md:mb-1.5`}>{t("education.period")}</span>
          <h3 className="display text-[38px] leading-[0.92] text-balance md:text-[clamp(34px,5vw,66px)]">
            {school.school}
          </h3>
          <p className="font-serif text-[clamp(24px,2.6vw,32px)] italic leading-[1.2] text-accent">
            {t("education.degree")}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-3 w-full max-w-[900px] md:mt-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 md:gap-y-10">
          <div className={`order-2 ${block}`}>
            <span className={label}>{t("education.focusLabel")}</span>
            <p className="text-base leading-[1.6] text-body md:text-[17px]">
              <Rich text={t("education.focus")} />
            </p>
          </div>

          <div className={`order-1 ${block}`}>
            <span className={label}>{t("education.certsLabel")}</span>
            {courses.map((course) => (
              <p key={course.name} className="text-base font-semibold leading-normal md:text-[17px]">
                {course.name}
              </p>
            ))}
            <p className="text-[13px] text-muted-2 md:text-sm">{courses[0].provider}</p>
          </div>

          <div className={`order-3 ${block}`}>
            <span className={label}>{t("education.languagesLabel")}</span>
            {languagesList.map((lang) => (
              <p key={lang.name} className="text-base leading-normal md:text-[17px]">
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
