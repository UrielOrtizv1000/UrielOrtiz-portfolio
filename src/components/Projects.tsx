"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl border-t border-border px-6 py-14 sm:px-8 sm:py-20"
    >
      <Reveal>
        <SectionHeading
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
