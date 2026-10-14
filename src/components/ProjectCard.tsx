"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const kinds = t<string[]>(`projects.items.${project.id}.kinds`);

  return (
    <article className="group grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12 gap-y-4 border-t border-border py-8">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-accent">
          {kinds.join(" · ")}
        </p>
        <h3 className="display text-[clamp(30px,3.6vw,46px)] leading-[0.95] transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <div className="mt-1.5 flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-2">
            {t("projects.builtWith")}
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="whitespace-nowrap rounded-lg border border-border-strong px-[11px] py-1.5 font-mono text-[13px] font-medium"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base leading-[1.65] text-body">
          {t(`projects.items.${project.id}.description`)}
        </p>
        <p className="text-[15px] leading-[1.65] text-muted">
          <em className="font-serif text-[1.2em] font-normal italic text-accent">
            {t("projects.role")}
          </em>{" "}
          {t(`projects.items.${project.id}.role`)}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("projects.openAria", { name: project.name })}
            className="label-cond hoverable press w-fit border-b-[1.5px] border-current pb-0.5 text-base hover:text-accent"
          >
            {t("projects.code")}
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="label-cond hoverable press w-fit border-b-[1.5px] border-current pb-0.5 text-base hover:text-accent"
            >
              {t("projects.live")} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
