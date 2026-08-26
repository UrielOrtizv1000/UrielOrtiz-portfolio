"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type ProjectGroup = "featured" | "other";

export default function Projects() {
  const { t } = useLanguage();
  const [group, setGroup] = useState<ProjectGroup>("featured");

  const isFeatured = group === "featured";
  const activeProjects = isFeatured ? projects.featured : projects.other;

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <ScrollReveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            eyebrow={t("projects.eyebrow")}
            title={isFeatured ? t("projects.title") : t("projects.otherTitle")}
            description={
              isFeatured ? t("projects.description") : t("projects.otherDescription")
            }
          />

          <div className="flex flex-shrink-0 items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setGroup("featured")}
              aria-pressed={isFeatured}
              className={`press hoverable rounded-full px-3 py-1.5 transition-colors ${
                isFeatured
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("projects.toggleFeatured")}
            </button>
            <button
              type="button"
              onClick={() => setGroup("other")}
              aria-pressed={!isFeatured}
              className={`press hoverable rounded-full px-3 py-1.5 transition-colors ${
                !isFeatured
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("projects.toggleOther")}
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 90} className="h-full">
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
