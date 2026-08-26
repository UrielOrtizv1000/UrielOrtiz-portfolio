"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import ScrollReveal from "./Reveal";

type HeroStat = { label: string; value: string };
type AboutValue = { title: string; body: string };

export default function Hero() {
  const { t } = useLanguage();
  const stats = t<HeroStat[]>("hero.stats");
  const values = t<AboutValue[]>("about.values");

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Left: identity */}
        <div className="flex flex-col items-start">
          <ScrollReveal>
            <span className="hoverable inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {t("hero.specialization")}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl text-balance">
              {profile.fullName}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="mt-3 max-w-xl text-lg font-semibold text-accent sm:text-xl">
              {t("hero.role")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.tagline")}. {t("hero.description")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={260}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="hoverable press inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.6)]"
              >
                {t("hero.viewProjects")}
              </a>
              <a
                href="#contact"
                className="hoverable press inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
              >
                {t("hero.getInTouch")}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={320} className="w-full">
            <dl className="mt-8 grid w-full max-w-xl grid-cols-2 gap-5 border-t border-border pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-2">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-base font-bold text-foreground sm:text-lg">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        {/* Right: about */}
        <ScrollReveal delay={140} id="about" className="scroll-mt-24">
          <div className="hoverable h-full rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t("about.eyebrow")}
            </span>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {t("about.heading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {t("about.summary")}
            </p>

            <ul className="mt-6 space-y-3.5 border-t border-border pt-5">
              {values.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
