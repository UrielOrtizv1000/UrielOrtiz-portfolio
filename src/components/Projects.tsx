"use client";

import { useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type ProjectGroup = "featured" | "other";

export default function Projects() {
  const { t } = useLanguage();
  const [group, setGroup] = useState<ProjectGroup>("featured");
  const [selectedId, setSelectedId] = useState(projects.featured[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  const isFeatured = group === "featured";
  const activeProjects = isFeatured ? projects.featured : projects.other;

  // The selected project always comes first so it takes the large slot;
  // the others keep their order beside it.
  const selected = activeProjects.find((p) => p.id === selectedId) ?? activeProjects[0];
  const ordered = [selected, ...activeProjects.filter((p) => p.id !== selected.id)];

  const switchGroup = (next: ProjectGroup) => {
    setGroup(next);
    setSelectedId((next === "featured" ? projects.featured : projects.other)[0].id);
  };

  const select = (id: string) => {
    setSelectedId(id);
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

          <div className="glass flex flex-shrink-0 items-center gap-0.5 rounded-full p-0.5 text-xs font-bold">
            {(["featured", "other"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => switchGroup(id)}
                aria-pressed={group === id}
                className={`press hoverable relative rounded-full px-3 py-1.5 transition-colors ${
                  group === id ? "text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {group === id ? (
                  <motion.span
                    layoutId="projects-group-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <span className="relative">
                  {id === "featured" ? t("projects.toggleFeatured") : t("projects.toggleOther")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <LayoutGroup>
        <div
          ref={gridRef}
          className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3"
        >
          {ordered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                layout: { type: "spring", stiffness: 220, damping: 30 },
                default: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.09 },
              }}
              className={project.id === selected.id ? "md:col-span-2 lg:row-span-2" : ""}
            >
              <ProjectCard
                project={project}
                selected={project.id === selected.id}
                onSelect={() => select(project.id)}
              />
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
