"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const { t, language } = useLanguage();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const tabs = useMemo(
    () => [t("skills.all"), ...skillCategories.map((c) => t(`skills.categories.${c.id}`))],
    [t]
  );

  const updateIndicator = (index: number) => {
    const node = tabRefs.current[index];
    if (!node) return;
    setIndicator({ left: node.offsetLeft, width: node.offsetWidth });
  };

  useEffect(() => {
    updateIndicator(activeTabIndex);
    const onResize = () => updateIndicator(activeTabIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // Re-measure on language change too — translated labels have different widths.
  }, [activeTabIndex, language]);

  const selectTab = (index: number) => {
    if (index === activeTabIndex) return;
    setTransitioning(true);
    setActiveTabIndex(index);
    window.setTimeout(() => setTransitioning(false), 160);
  };

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
        <div className="relative -mx-1 mb-6 flex gap-1 overflow-x-auto px-1 pb-1">
          <div
            aria-hidden="true"
            className="absolute top-0 h-full rounded-full bg-accent transition-[transform,width] duration-300"
            style={{
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
            }}
          />
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              onClick={() => selectTab(index)}
              className={`press hoverable relative z-10 flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTabIndex === index
                  ? "text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={140}>
      <div
        className="grid gap-5 transition-[opacity,filter] duration-150"
        style={{
          opacity: transitioning ? 0.4 : 1,
          filter: transitioning ? "blur(2px)" : "blur(0px)",
        }}
      >
        {visibleGroups.map((group) => (
          <div key={group.id}>
            {activeTabIndex === 0 ? (
              <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-muted-2">
                {t(`skills.categories.${group.id}`)}
              </h3>
            ) : null}
            <ul className="flex flex-wrap gap-2.5">
              {group.skillIds.map((skillId) => (
                <li key={skillId}>
                  <span className="hoverable press inline-flex cursor-default items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t(`skills.items.${skillId}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </ScrollReveal>
    </section>
  );
}
