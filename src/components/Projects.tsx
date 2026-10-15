"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Rich from "./Rich";
import ScrollReveal from "./Reveal";

type ProjectGroup = "featured" | "other";

export default function Projects() {
  const { t } = useLanguage();
  const [group, setGroup] = useState<ProjectGroup>("featured");

  const isFeatured = group === "featured";
  const activeProjects = isFeatured ? projects.featured : projects.other;

  const tabs: { id: ProjectGroup; label: string }[] = [
    { id: "featured", label: t("projects.toggleFeatured") },
    { id: "other", label: t("projects.toggleOther") },
  ];

  return (
    <section id="projects" className="flex flex-col gap-6 pt-[88px] md:gap-10 md:py-[clamp(110px,13vw,180px)]">
      <ScrollReveal>
        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-12 md:gap-y-5">
          <h2 className="display text-[56px] leading-[0.9] md:text-[clamp(46px,7vw,100px)] md:leading-[0.92]">
            <Rich text={t(isFeatured ? "projects.titleFeatured" : "projects.titleOther")} />
          </h2>
          {/* Phones: full-width segmented control */}
          <div className="grid grid-cols-2 gap-1 rounded-full border border-border-strong p-1 md:flex md:gap-1.5 md:rounded-none md:border-0 md:p-0 md:pb-2">
            {tabs.map((tab) => {
              const on = group === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGroup(tab.id)}
                  aria-pressed={on}
                  className={`press hoverable label-cond min-h-11 rounded-full border px-3.5 text-base tracking-[0.03em] md:min-h-0 md:py-2 ${
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-transparent text-muted hover:text-foreground md:border-border-strong"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ol key={group} className="flex flex-col">
        {activeProjects.map((project, index) => (
          <ScrollReveal key={project.id} as="li" delay={index * 90}>
            <ProjectCard project={project} index={index} total={activeProjects.length} />
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}
