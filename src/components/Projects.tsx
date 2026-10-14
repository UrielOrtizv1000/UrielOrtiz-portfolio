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
    <section id="projects" className="flex flex-col gap-10 py-[clamp(110px,13vw,180px)]">
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2 className="display text-[clamp(46px,7vw,100px)] leading-[0.92]">
            <Rich text={t(isFeatured ? "projects.titleFeatured" : "projects.titleOther")} />
          </h2>
          <div className="flex gap-1.5 pb-2">
            {tabs.map((tab) => {
              const on = group === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGroup(tab.id)}
                  aria-pressed={on}
                  className={`press hoverable label-cond rounded-full border px-3.5 py-2 text-base tracking-[0.03em] ${
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border-strong text-muted hover:text-foreground"
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
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}
