"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, type Variants } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

const GLYPHS = ["</>", "☁", "{ }", "✓"];

export default function Skills() {
  const { t } = useLanguage();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = useMemo(
    () => [t("skills.all"), ...skillCategories.map((c) => t(`skills.categories.${c.id}`))],
    [t]
  );

  const visibleGroups =
    activeTabIndex === 0
      ? skillCategories
      : skillCategories.filter((_, i) => i === activeTabIndex - 1);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <SectionHeading
          index="02"
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.description")}
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="glass no-scrollbar mb-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTabIndex(index)}
              aria-pressed={activeTabIndex === index}
              className="press relative flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium"
            >
              {activeTabIndex === index ? (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span
                className={`relative z-10 transition-colors ${
                  activeTabIndex === index ? "text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      <LayoutGroup>
        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group) => {
              const categoryIndex = skillCategories.indexOf(group);
              return (
                <motion.article
                  key={group.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`glass spot rounded-[1.75rem] p-6 sm:p-7 ${
                    activeTabIndex !== 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {t(`skills.categories.${group.id}`)}
                    </h3>
                    <span className="mono-tag flex h-9 min-w-9 items-center justify-center rounded-full bg-accent-soft px-2 text-xs font-bold text-accent-text">
                      {GLYPHS[categoryIndex]}
                    </span>
                  </div>
                  <motion.ul
                    className="mt-5 flex flex-wrap gap-2"
                    variants={list}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {group.skillIds.map((skillId) => (
                      <motion.li key={skillId} variants={chip}>
                        <span className="hoverable inline-flex cursor-default items-center gap-2 rounded-full border border-border-strong bg-background/40 px-3.5 py-1.5 text-sm font-medium text-foreground hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background">
                          {t(`skills.items.${skillId}`)}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
