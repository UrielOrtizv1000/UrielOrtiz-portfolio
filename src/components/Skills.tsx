"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/* On demand, resolves the text out of random glyphs, left to right. */
function useScramble(text: string) {
  const [display, setDisplay] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();

  const run = useCallback(() => {
    if (reduce) return;
    window.clearInterval(timer.current);
    const frames = 12;
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / frames) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame >= frames) {
        window.clearInterval(timer.current);
        setDisplay(null);
      }
    }, 26);
  }, [text, reduce]);

  useEffect(() => () => window.clearInterval(timer.current), []);

  return [display ?? text, run] as const;
}

function SkillChip({ label }: { label: string }) {
  const [text, scramble] = useScramble(label);

  return (
    <motion.li variants={chip}>
      <span
        onPointerEnter={scramble}
        className="hoverable press inline-flex cursor-default items-center rounded-full border border-border-strong bg-surface/60 px-4 py-2 text-sm font-medium text-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent hover:shadow-[0_6px_18px_-8px_rgba(168,85,247,0.55)]"
      >
        {text}
      </span>
    </motion.li>
  );
}

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
        <div className="glass no-scrollbar mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTabIndex(index)}
              aria-pressed={activeTabIndex === index}
              className="press relative flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              {activeTabIndex === index ? (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_4px_14px_-4px_rgba(168,85,247,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
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

      <LayoutGroup>
        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleGroups.map((group) => (
              <motion.article
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ borderRadius: 16 }}
                className={`glass spot p-6 ${activeTabIndex !== 0 ? "md:col-span-2" : ""}`}
              >
                <motion.h3
                  layout="position"
                  className="mono-tag text-xs font-bold uppercase tracking-wide text-muted-2"
                >
                  {t(`skills.categories.${group.id}`)}
                </motion.h3>
                <motion.ul
                  layout="position"
                  className="mt-4 flex flex-wrap gap-2.5"
                  variants={list}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {group.skillIds.map((skillId) => (
                    <SkillChip key={skillId} label={t(`skills.items.${skillId}`)} />
                  ))}
                </motion.ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
