"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import NetworkBackground from "./NetworkBackground";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type Fact = { label: string; value: string };

const headline = "display text-[clamp(60px,11vw,160px)] leading-[0.9] tracking-[-0.005em]";

export default function Hero() {
  const { t } = useLanguage();
  const facts = t<Fact[]>("hero.facts");
  const alt = t("hero.imageAlt");

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[calc(100vh-70px)] flex-col justify-center gap-[clamp(20px,3vw,36px)] pb-8 pt-12"
      >
        {/* Full-bleed animated network, faded out toward the bottom edge */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-85 [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
          <NetworkBackground />
        </div>

        <div className="relative flex flex-wrap items-center gap-x-12 gap-y-5">
          <ScrollReveal>
            <h1 className={headline}>
              <Rich text={t("hero.greeting")} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="max-w-[250px] text-[15px] leading-[1.55] text-muted">
              <Rich text={t("hero.intro")} />
            </p>
          </ScrollReveal>
        </div>

        <div className="relative flex flex-wrap-reverse items-center gap-x-12 gap-y-5">
          <ScrollReveal delay={200}>
            <p className="max-w-[250px] text-[15px] leading-[1.55] text-muted">
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
          className="relative h-[300px] w-auto self-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] min-[900px]:hidden"
        />

        <a
          href="#about"
          className="label-cond relative z-[3] mx-auto mt-[clamp(32px,6vh,72px)] flex flex-col items-center gap-2.5 text-sm tracking-[0.06em] hover:text-accent"
        >
          {t("hero.scrollCue")}
          <span className="block h-11 w-[1.5px] overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-current" />
          </span>
        </a>
      </section>

      <ScrollReveal>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-2 rounded-3xl border border-border bg-surface px-[clamp(20px,3vw,36px)] py-2.5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5 py-[18px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-2">
                {fact.label}
              </dt>
              <dd className="display text-2xl leading-[1.05]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </>
  );
}
