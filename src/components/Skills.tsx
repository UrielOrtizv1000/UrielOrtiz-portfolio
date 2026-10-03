"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import UnderlineTabs from "./UnderlineTabs";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/* Every skill with the category it belongs to, in category order. */
const allSkills = skillCategories.flatMap((category, categoryIndex) =>
  category.skillIds.map((id) => ({ id, categoryIndex }))
);

/* On demand, resolves the text out of random glyphs, left to right. */
function useScramble(text: string) {
  const [display, setDisplay] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();

  const run = useCallback(() => {
    if (reduce) return;
    window.clearInterval(timer.current);
    const frames = 14;
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

function SkillTile({
  label,
  categoryIndex,
  dimmed,
  onHover,
}: {
  label: string;
  categoryIndex: number;
  dimmed: boolean;
  onHover: (categoryIndex: number | null) => void;
}) {
  const [text, scramble] = useScramble(label);

  return (
    <div
      onPointerEnter={() => {
        onHover(categoryIndex);
        scramble();
      }}
      onPointerLeave={() => onHover(null)}
      className={`glass spot group relative flex h-full min-h-[5rem] cursor-default flex-col justify-between overflow-hidden rounded-lg px-4 pb-4 pt-3.5 transition-[opacity,border-color] duration-300 hover:border-accent/50 ${
        dimmed ? "opacity-35" : ""
      }`}
    >
      <span className="mono-tag flex items-center gap-2 text-[11px] text-muted-2">
        <span className="h-px w-3 bg-accent transition-all duration-300 group-hover:w-6" />
        {String(categoryIndex + 1).padStart(2, "0")}
      </span>
      <span className="mt-3 text-sm font-semibold leading-snug text-foreground">{text}</span>
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [active, setActive] = useState("all");
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const tabs = [
    { id: "all", label: t("skills.all") },
    ...skillCategories.map((category, i) => ({
      id: category.id,
      label: (
        <>
          <span className="mono-tag mr-1.5 text-[11px] text-muted-2">
            {String(i + 1).padStart(2, "0")}
          </span>
          {t(`skills.categories.${category.id}`)}
        </>
      ),
    })),
  ];

  const activeIndex = skillCategories.findIndex((c) => c.id === active);
  const visible =
    activeIndex === -1 ? allSkills : allSkills.filter((s) => s.categoryIndex === activeIndex);

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
        <div className="mb-6 flex items-end justify-between gap-6 border-b border-border">
          <UnderlineTabs
            tabs={tabs}
            active={active}
            onChange={setActive}
            layoutId="skills-tab"
            className="-mb-px"
          />
          <span className="mono-tag hidden flex-shrink-0 overflow-hidden pb-3 text-xs tabular-nums text-muted-2 sm:flex">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={visible.length}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block text-foreground"
              >
                {String(visible.length).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span>&nbsp;/ {allSkills.length}</span>
          </span>
        </div>
      </ScrollReveal>

      <motion.ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.li
              key={skill.id}
              layout
              variants={tile}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
              transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
            >
              <SkillTile
                label={t(`skills.items.${skill.id}`)}
                categoryIndex={skill.categoryIndex}
                dimmed={
                  activeIndex === -1 &&
                  hoveredCategory !== null &&
                  hoveredCategory !== skill.categoryIndex
                }
                onHover={setHoveredCategory}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
