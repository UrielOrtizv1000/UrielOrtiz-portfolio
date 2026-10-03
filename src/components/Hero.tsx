"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import AsciiDino from "./AsciiDino";
import Magnetic from "./Magnetic";
import NetworkBackground from "./NetworkBackground";
import ScrollReveal from "./Reveal";

type HeroStat = { label: string; value: string };
type AboutValue = { title: string; body: string };

const EASE = [0.23, 1, 0.32, 1] as const;

/* Each letter rises out of a clipped line, one after another. */
function SplitWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-hidden="true">
      {word.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const stats = t<HeroStat[]>("hero.stats");
  const values = t<AboutValue[]>("about.values");
  const [running, setRunning] = useState(false);
  const [first, last] = profile.name.split(" ");

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 pb-14 pt-14 sm:overflow-visible sm:px-8 sm:pb-20 sm:pt-20"
    >
      <div className="absolute inset-x-0 top-0 -z-0 h-[560px] opacity-70">
        <NetworkBackground />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Left: identity */}
        <div className="flex flex-col items-start">
          <ScrollReveal>
            <p className="mono-tag text-xs text-muted sm:text-sm">
              <span className="text-accent">~$</span> {t("hero.specialization")}
              <span className="caret ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent" />
            </p>
          </ScrollReveal>

          <h1
            className="mt-5 text-[clamp(4rem,13vw,8.75rem)] font-black leading-[0.9] tracking-[-0.05em] text-foreground"
            aria-label={profile.fullName}
          >
            <SplitWord word={first} delay={0.1} />
            <br />
            <span className="inline-flex items-baseline gap-[0.1em]">
              <SplitWord word={last} delay={0.3} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.8 }}
                className="inline-block h-[0.15em] w-[0.15em] rounded-full bg-accent"
              />
            </span>
          </h1>

          <ScrollReveal delay={140}>
            <p className="mono-tag mt-5 max-w-xl text-sm uppercase tracking-[0.08em] text-accent sm:text-base">
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
              <Magnetic>
                <a
                  href="#projects"
                  className="btn-shine hoverable press group inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.6)]"
                >
                  {t("hero.viewProjects")}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3.5 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3.5 group-hover:opacity-100"
                  >
                    <path d="M8 2.5v11m0 0L4 9.5M8 13.5l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="glass spot hoverable press group inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  {t("hero.getInTouch")}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3.5 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3.5 group-hover:opacity-100"
                  >
                    <path d="M2.5 8h11m0 0L9.5 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={320} className="w-full">
            <dl className="mt-8 grid w-full max-w-xl grid-cols-2 gap-5 border-t border-border pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-2">
                    {stat.label}
                  </dt>
                  <dd className="mono-tag mt-1 text-base font-bold text-foreground sm:text-lg">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        {/* Right: about, with the ASCII T-rex standing on top of the glass card */}
        <div
          className="relative"
          onPointerEnter={(e) => e.pointerType === "mouse" && setRunning(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setRunning(false)}
          onPointerDown={(e) => e.pointerType !== "mouse" && setRunning((r) => !r)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute right-4 top-0 h-40 w-60 cursor-default text-accent sm:h-52 sm:w-72"
          >
            <AsciiDino running={running} />
          </motion.div>

          <ScrollReveal delay={140} id="about" className="relative z-10 mt-40 scroll-mt-24 sm:mt-52">
            <div className="glass spot hoverable h-full rounded-2xl p-6 sm:p-7">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {t("about.heading")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {t("about.summary")}
              </p>

              <ul className="mt-6 space-y-3.5 border-t border-border pt-5">
                {values.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-[0.6rem] h-px w-2.5 flex-shrink-0 bg-accent" />
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
      </div>
    </section>
  );
}
