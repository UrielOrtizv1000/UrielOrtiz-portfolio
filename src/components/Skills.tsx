"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function Skills() {
  const { t } = useLanguage();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = useMemo(
    () => [t("skills.all"), ...skillCategories.map((c) => t(`skills.categories.${c.id}`))],
    [t]
  );

  const visibleGroups =
    activeTabIndex === 0 ? skillCategories : skillCategories.filter((_, i) => i === activeTabIndex - 1);

  return (
    <section id="skills" className="flex flex-col gap-6 pt-[88px] md:gap-10 md:py-[clamp(110px,13vw,180px)]">
      <ScrollReveal>
        <SectionHeading
          title={t("skills.title")}
          description={t("skills.description")}
          aside={
            <Image
              src="/assets/lego-point.webp"
              alt=""
              width={200}
              height={300}
              className="-mb-5 h-[150px] w-auto drop-shadow-[0_16px_20px_rgba(0,0,0,0.4)] max-md:col-start-2 max-md:row-start-1 md:-mb-[60px] md:ml-auto md:h-[clamp(200px,22vw,300px)] md:drop-shadow-[0_24px_30px_rgba(0,0,0,0.4)]"
            />
          }
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        {/* Phones: one swipeable row that bleeds to the screen edges */}
        <div className="scrollbar-none -mx-[clamp(20px,4vw,48px)] flex gap-1.5 overflow-x-auto px-[clamp(20px,4vw,48px)] py-0.5 md:mx-0 md:flex-wrap md:overflow-visible md:p-0">
          {tabs.map((tab, index) => {
            const on = activeTabIndex === index;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTabIndex(index)}
                aria-pressed={on}
                className="press hoverable label-cond relative min-h-11 shrink-0 whitespace-nowrap rounded-full border border-border-strong px-4 py-2 text-base tracking-[0.03em] md:min-h-0 md:px-3.5"
              >
                {on ? (
                  <motion.span
                    layoutId="skills-tab-indicator"
                    className="absolute -inset-px rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                ) : null}
                <span className={`relative z-10 ${on ? "text-background" : "text-muted hover:text-foreground"}`}>
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            className="flex flex-col"
            variants={list}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {visibleGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={row}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-3 border-t border-border py-[22px]"
              >
                <h3 className="display !text-foreground text-[23px] leading-none">
                  {t(`skills.categories.${group.id}`)}
                </h3>
                <ul className="flex flex-wrap items-center gap-1.5 text-sm text-muted md:col-span-2 md:gap-x-0 md:gap-y-1 md:text-[17px] md:leading-[1.7]">
                  {group.skillIds.map((skillId, i) => (
                    <li
                      key={skillId}
                      className="flex items-center max-md:rounded-full max-md:border max-md:border-border max-md:bg-surface max-md:px-3 max-md:py-[7px] max-md:text-body"
                    >
                      {i > 0 ? <span aria-hidden="true" className="px-2.5 text-muted-2 max-md:hidden">·</span> : null}
                      <span className="hoverable cursor-default hover:text-accent">
                        {t(`skills.items.${skillId}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
}
