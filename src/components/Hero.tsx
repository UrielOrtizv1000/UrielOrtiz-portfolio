"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import NetworkBackground from "./NetworkBackground";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type Fact = { label: string; value: string };

const greeting =
  "display text-[clamp(64px,21vw,96px)] leading-[0.88] md:text-[clamp(60px,11vw,160px)] md:leading-[0.9] md:tracking-[-0.005em]";
const headline =
  "display text-right text-[clamp(56px,18vw,84px)] leading-[0.88] md:text-left md:text-[clamp(60px,11vw,160px)] md:leading-[0.9] md:tracking-[-0.005em]";
const intro = "text-base leading-[1.55] text-muted [text-wrap:pretty] md:max-w-[250px] md:text-[15px]";
const ctaBase =
  "label-cond hoverable press flex min-h-[52px] items-center justify-center rounded-full text-lg tracking-[0.04em]";

export default function Hero() {
  const { t } = useLanguage();
  const facts = t<Fact[]>("hero.facts");
  const alt = t("hero.imageAlt");

  return (
    <>
      <section
        id="top"
        className="relative flex flex-col gap-5 pb-10 pt-7 md:min-h-[calc(100vh-70px)] md:justify-center md:gap-[clamp(20px,3vw,36px)] md:pb-8 md:pt-12"
      >
        {/* Full-bleed animated network, faded out toward the bottom edge (desktop only) */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 opacity-85 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] md:block">
          <NetworkBackground />
        </div>

        {/* On phones the two rows dissolve into one column; `order` sets the reading sequence. */}
        <div className="relative flex flex-wrap items-center gap-x-12 gap-y-5 max-md:contents">
          <ScrollReveal className="max-md:order-1">
            <h1 className={greeting}>
              <Rich text={t("hero.greeting")} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={120} className="max-md:order-2">
            <p className={intro}>
              <Rich text={t("hero.intro")} />
            </p>
          </ScrollReveal>
        </div>

        <div className="relative flex flex-wrap-reverse items-center gap-x-12 gap-y-5 max-md:contents">
          <ScrollReveal delay={200} className="max-md:order-5">
            <p className={intro}>
              <Rich text={t("hero.intro2")} />
            </p>
          </ScrollReveal>
          <ScrollReveal delay={280} className="max-md:order-4">
            <p className={headline}>
              <Rich text={t("hero.headline")} />
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={360}
          className="pointer-events-none absolute bottom-24 right-[clamp(0px,4vw,53px)] z-[2] hidden min-[900px]:block"
        >
          <Image
            src="/assets/lego-wave.webp"
            alt={alt}
            width={293}
            height={440}
            priority
            className="h-[440px] w-[293px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </ScrollReveal>
        <Image
          src="/assets/lego-wave.webp"
          alt={alt}
          width={200}
          height={300}
          priority
          className="relative my-2 h-[280px] w-auto self-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] max-md:order-3 md:my-0 md:h-[300px] min-[900px]:hidden"
        />

        <div className="mt-2 grid grid-cols-2 gap-2.5 md:hidden max-md:order-6">
          <a href="#projects" className={`${ctaBase} bg-brand !text-white hover:bg-brand-strong`}>
            {t("hero.scrollCue")}
          </a>
          <a
            href="#contact"
            className={`${ctaBase} border border-border-strong hover:border-brand`}
          >
            {t("hero.talk")}
          </a>
        </div>

        <a
          href="#about"
          className="label-cond relative z-[3] mx-auto mt-[clamp(32px,6vh,72px)] hidden flex-col items-center gap-2.5 text-sm tracking-[0.06em] hover:text-accent md:flex"
        >
          {t("hero.scrollCue")}
          <span className="block h-11 w-[1.5px] overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-current" />
          </span>
        </a>
      </section>

      <ScrollReveal>
        <dl className="grid grid-cols-2 gap-x-4 rounded-[20px] border border-border bg-surface px-[18px] py-1 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:gap-x-6 md:gap-y-2 md:rounded-3xl md:px-[clamp(20px,3vw,36px)] md:py-2.5">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1.5 py-4 md:border-b-0 md:py-[18px] ${
                index < 4 ? "border-b border-border" : ""
              }`}
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-2 md:text-[11px]">
                {fact.label}
              </dt>
              <dd className="display text-[21px] leading-[1.05] md:text-2xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </>
  );
}
