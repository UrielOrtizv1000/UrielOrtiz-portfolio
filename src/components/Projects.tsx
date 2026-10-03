"use client";

import { useRef, useState } from "react";
import { LayoutGroup } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { allProjects } from "@/lib/data";
import ProjectTile from "./ProjectCard";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(allProjects[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  // The selected project always leads the grid so it lands in the large
  // top-left slot; the rest keep their original order around it.
  const selected = allProjects.find((p) => p.id === selectedId) ?? allProjects[0];
  const ordered = [selected, ...allProjects.filter((p) => p.id !== selected.id)];

  const select = (id: string) => {
    setSelectedId(id);
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const step = (dir: -1 | 1) => {
    const i = allProjects.findIndex((p) => p.id === selected.id);
    const next = allProjects[(i + dir + allProjects.length) % allProjects.length];
    setSelectedId(next.id);
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            description={t("projects.description")}
          />
          <p className="mono-tag mb-14 hidden max-w-[15rem] text-right text-xs leading-relaxed text-muted-2 lg:block">
            ↳ {t("projects.hint")}
          </p>
        </div>
      </ScrollReveal>

      <LayoutGroup>
        <div
          ref={gridRef}
          className="grid scroll-mt-28 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3"
        >
          {ordered.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              index={allProjects.indexOf(project)}
              total={allProjects.length}
              selected={project.id === selected.id}
              onSelect={() => select(project.id)}
              onStep={step}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
