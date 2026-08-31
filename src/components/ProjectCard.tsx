"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const bullets = t<string[]>(`projects.items.${project.id}.bullets`);

  return (
    <article className="hoverable group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.45)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-foreground">
          {project.name}
        </h3>
        <a
          href={project.live ?? project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("projects.openAria", { name: project.name })}
          className="hoverable press flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-transform group-hover:rotate-45 group-hover:border-accent group-hover:text-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <path
              d="M5 11L11 5M11 5H6M11 5V10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {t(`projects.items.${project.id}.description`)}
      </p>

      <ul className="mt-4 space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="mono-tag rounded-md border border-border bg-surface-2 px-2 py-1 text-xs font-medium text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 pt-1">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hoverable press inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          {t("projects.code")}
        </a>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable press inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
              <path
                d="M6.5 9.5L14 2M14 2H9M14 2v5M8.5 3.5H4a2 2 0 0 0-2 2V12a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2V8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("projects.live")}
          </a>
        ) : null}
      </div>
    </article>
  );
}
