"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
    <section
      id="skills"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.description")}
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="-mx-1 mb-6 flex gap-1 overflow-x-auto px-1 pb-1">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTabIndex(index)}
              className="press hoverable relative flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              {activeTabIndex === index ? (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              ) : null}
              <span
                className={`relative z-10 ${
                  activeTabIndex === index ? "text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            className="grid gap-5"
            variants={list}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {visibleGroups.map((group) => (
              <div key={group.id}>
                {activeTabIndex === 0 ? (
                  <h3 className="mono-tag mb-2.5 text-xs font-bold uppercase tracking-wide text-muted-2">
                    {t(`skills.categories.${group.id}`)}
                  </h3>
                ) : null}
                <ul className="flex flex-wrap gap-2.5">
                  {group.skillIds.map((skillId) => (
                    <motion.li key={skillId} variants={chip}>
                      <span className="hoverable press inline-flex cursor-default items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {t(`skills.items.${skillId}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
}
