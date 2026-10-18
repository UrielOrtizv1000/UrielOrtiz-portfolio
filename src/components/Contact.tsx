"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

export default function Contact() {
  const { t } = useLanguage();
  const titleEm = t("contact.titleEm");

  return (
    <section
      id="contact"
      className="flex flex-wrap items-center justify-center gap-x-[clamp(24px,5vw,72px)] gap-y-5 pb-16 pt-[88px] text-center md:gap-y-6 md:py-[clamp(110px,13vw,180px)]"
    >
      <ScrollReveal>
        <Image
          src="/assets/lego-laptop.webp"
          alt={t("contact.imageAlt")}
          width={267}
          height={400}
          className="h-[240px] w-auto drop-shadow-[0_20px_26px_rgba(0,0,0,0.4)] md:h-[clamp(240px,28vw,400px)] md:drop-shadow-[0_24px_30px_rgba(0,0,0,0.4)]"
        />
      </ScrollReveal>

      <ScrollReveal delay={120} className="max-md:w-full">
        <div className="flex w-full flex-col items-stretch gap-5 md:w-fit md:max-w-full md:gap-6">
          <h2 className="display text-[clamp(64px,21vw,120px)] leading-[0.85] md:text-[clamp(64px,13vw,190px)] md:leading-[0.88]">
            {t("contact.title")}
            {titleEm ? (
              <>
                {" "}
                <span className="font-serif text-accent normal-case italic font-normal [font-stretch:100%] tracking-[-0.015em]">
                  {titleEm}
                </span>
              </>
            ) : null}
          </h2>
          <p className="text-base leading-[1.6] text-muted [text-wrap:balance] md:text-[17px] md:[text-wrap:wrap]">
            <Rich text={t("contact.description")} />
          </p>

          <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5 md:gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable press label-cond flex min-h-[58px] items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3 text-white hover:bg-brand-strong text-[21px] tracking-[0.03em] md:gap-3 md:py-[18px] md:text-[22px]"
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              {t("contact.github")}
            </a>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
