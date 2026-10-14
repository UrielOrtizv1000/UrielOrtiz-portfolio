"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import NetworkBackground from "./NetworkBackground";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type Fact = { label: string; value: string };

const headline = "display hero-headline leading-[0.98] tracking-[-0.005em]";

export default function Hero() {
  const { t } = useLanguage();
  const facts = t<Fact[]>("hero.facts");
  const alt = t("hero.imageAlt");

  return (
    <>
      <section
        id="top"
        className="hero-layout relative gap-[clamp(24px,3vw,40px)] pb-8 pt-10 sm:pt-12"
      >
        {/* Full-bleed animated network, faded out toward the bottom edge */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-85 [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
          <NetworkBackground />
        </div>

        <div className="hero-introduction relative flex min-w-0 flex-wrap items-center gap-x-10 gap-y-5">
          <ScrollReveal>
            <h1 className={headline}>
              <Rich text={t("hero.greeting")} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="hero-copy max-w-[290px] text-base leading-[1.6] text-muted">
              <Rich text={t("hero.intro")} />
            </p>
          </ScrollReveal>
        </div>

        <div className="hero-specialty relative flex min-w-0 flex-col-reverse items-start justify-center gap-5">
          <ScrollReveal delay={200}>
            <p className="hero-copy max-w-[380px] text-base leading-[1.6] text-muted">
              <Rich text={t("hero.intro2")} />
            </p>
          </ScrollReveal>
          <ScrollReveal delay={280}>
            <p className={headline}>
              <Rich text={t("hero.headline")} />
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={360}
          className="hero-portrait pointer-events-none relative z-[2] justify-self-center"
        >
          <Image
            src="/assets/lego-wave.webp"
            alt={alt}
            width={293}
            height={440}
            priority
            className="h-[240px] w-auto sm:h-[300px] min-[900px]:h-[360px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </ScrollReveal>


        <a
          href="#about"
          className="hero-cue label-cond relative z-[3] mx-auto mt-2 flex flex-col items-center gap-2.5 text-sm tracking-[0.06em] hover:text-accent"
        >
          {t("hero.scrollCue")}
          <span className="block h-11 w-[1.5px] overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-current" />
          </span>
        </a>
      </section>

      <ScrollReveal>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-2 rounded-3xl border border-border bg-surface px-[clamp(20px,3vw,36px)] py-2.5 sm:grid-cols-3 xl:grid-cols-6">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0 flex flex-col gap-1.5 py-3 sm:py-[18px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-2">
                {fact.label}
              </dt>
              <dd className="display text-[clamp(18px,4.5vw,24px)] leading-[1.15] [overflow-wrap:anywhere]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </>
  );
}
