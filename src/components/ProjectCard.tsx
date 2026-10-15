"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/lib/data";

// Desktop: underlined text links. Phones: full-width pill buttons with the arrow pushed right.
const linkClass =
  "label-cond hoverable press w-fit border-b-[1.5px] border-current pb-0.5 text-base hover:text-accent " +
  "max-md:flex max-md:min-h-12 max-md:w-full max-md:items-center max-md:justify-between max-md:rounded-full " +
  "max-md:border max-md:border-border-strong max-md:px-[18px] max-md:pb-0 max-md:text-[17px] max-md:tracking-[0.04em]";

export default function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const { t } = useLanguage();
  const kinds = t<string[]>(`projects.items.${project.id}.kinds`);

  return (
    <article className="group flex flex-col gap-3 border-t border-border py-7 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] md:gap-x-12 md:gap-y-4 md:py-8">
      {/* On phones both columns dissolve and `order` restores the single-column reading sequence. */}
      <div className="flex flex-col gap-3 max-md:contents">
        <div className="flex items-baseline justify-between gap-3 max-md:order-1">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent md:text-[13px]">
            {kinds.join(" · ")}
          </p>
          <span className="font-mono text-[11px] text-muted-2 md:hidden">
            {index + 1}/{total}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 max-md:order-2">
          <h3 className="display text-4xl leading-[0.95] [overflow-wrap:anywhere] transition-colors group-hover:text-accent md:text-[clamp(30px,3.6vw,46px)] md:[overflow-wrap:normal]">
            {project.name}
          </h3>
          {project.inDevelopment ? (
            <span className="rounded-full border border-accent px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
              {t("projects.inDevelopment")}
            </span>
          ) : null}
        </div>
        <div className="mt-1 flex flex-col gap-2 max-md:order-5 md:mt-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-2 max-md:hidden">
            {t("projects.builtWith")}
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="whitespace-nowrap rounded-lg border border-border-strong px-2.5 py-[5px] font-mono text-xs font-medium md:px-[11px] md:py-1.5 md:text-[13px]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-md:contents">
        <p className="text-base leading-[1.6] text-body max-md:order-3 md:leading-[1.65]">
          {t(`projects.items.${project.id}.description`)}
        </p>
        <p className="text-[15px] leading-[1.6] text-muted max-md:order-4 md:leading-[1.65]">
          <em className="font-serif text-[1.2em] font-normal italic text-accent">
            {t("projects.role")}
          </em>{" "}
          {t(`projects.items.${project.id}.role`)}
        </p>
        <div className="mt-1.5 flex flex-col gap-2.5 max-md:order-6 md:mt-0 md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("projects.openAria", { name: project.name })}
            className={linkClass}
          >
            {t("projects.code")}
            <span aria-hidden="true" className="max-md:text-accent">
              {" "}
              ↗
            </span>
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("projects.live")}
              <span aria-hidden="true" className="max-md:text-accent">
                {" "}
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
