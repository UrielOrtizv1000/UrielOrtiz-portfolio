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
    <section id="skills" className="flex flex-col gap-10 py-[clamp(110px,13vw,180px)]">
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
              className="-mb-[60px] ml-auto h-[clamp(200px,22vw,300px)] w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.4)]"
            />
          }
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab, index) => {
            const on = activeTabIndex === index;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTabIndex(index)}
                aria-pressed={on}
                className="press hoverable label-cond relative whitespace-nowrap rounded-full border border-border-strong px-3.5 py-2 text-base tracking-[0.03em]"
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
                <ul className="flex flex-wrap items-center gap-y-1 text-[17px] leading-[1.7] text-muted md:col-span-2">
                  {group.skillIds.map((skillId, i) => (
                    <li key={skillId} className="flex items-center">
                      {i > 0 ? <span aria-hidden="true" className="px-2.5 text-muted-2">·</span> : null}
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
