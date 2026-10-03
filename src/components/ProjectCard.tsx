"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/lib/data";
import { BrowserFrame, ScaledStage, previews } from "./previews";

export type TileProject = Project & { featured: boolean };

type TileProps = {
  project: TileProject;
  index: number;
  total: number;
  selected: boolean;
  onSelect: () => void;
  onStep: (dir: -1 | 1) => void;
};

const SPRING = { type: "spring", stiffness: 210, damping: 28, mass: 0.9 } as const;

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

function Arrow({ dir }: { dir: -1 | 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
      <path
        d={dir === 1 ? "M3 8h10m0 0L9 4m4 4l-4 4" : "M13 8H3m0 0l4-4M3 8l4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectTile({ project, index, total, selected, onSelect, onStep }: TileProps) {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [view, setView] = useState<"sim" | "live">("sim");
  const Preview = previews[project.id];
  const bullets = t<string[]>(`projects.items.${project.id}.bullets`);
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      layout
      transition={SPRING}
      style={{ borderRadius: 32 }}
      whileHover={selected ? undefined : { y: -6 }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`glass spot group relative flex flex-col p-2.5 sm:p-3 ${
        selected ? "md:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Preview window */}
      <motion.div layout="position" transition={SPRING} className="relative">
        <BrowserFrame
          url={view === "live" && project.live ? project.live.replace(/^https?:\/\//, "") : project.previewPath}
          compact={!selected}
          toolbar={
            selected && project.live ? (
              <span className="flex rounded-md bg-white/[0.06] p-0.5 text-[10px] font-semibold">
                {(["sim", "live"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    className={`rounded px-2 py-0.5 transition-colors ${
                      view === v ? "bg-white text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {v === "sim" ? t("projects.simTab") : t("projects.liveTab")}
                  </button>
                ))}
              </span>
            ) : undefined
          }
        >
          {selected && view === "live" && project.live ? (
            <iframe
              src={project.live}
              title={project.name}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="block aspect-[16/10] w-full bg-white"
            />
          ) : (
            <ScaledStage>
              <Preview active={selected ? inView : hovered} lang={language} />
            </ScaledStage>
          )}
        </BrowserFrame>

        {!selected ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="glass glass-strong mono-tag flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {t("projects.hoverHint")}
            </span>
          </span>
        ) : null}
      </motion.div>

      {/* Body */}
      <AnimatePresence mode="popLayout" initial={false}>
        {selected ? (
          <motion.div
            key="expanded"
            layout="position"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="flex flex-1 flex-col px-2.5 pb-2 pt-5 sm:px-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono-tag text-xs text-muted-2">
                {number} / {String(total).padStart(2, "0")}
              </span>
              {project.featured ? (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-on-accent">
                  {t("projects.featuredBadge")}
                </span>
              ) : null}
              <span className="mono-tag flex items-center gap-1.5 text-[11px] text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                {view === "live" ? t("projects.liveNote") : t("projects.simNote")}
              </span>
              <span className="ml-auto flex gap-1.5">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => onStep(dir)}
                    aria-label={dir === 1 ? t("projects.next") : t("projects.prev")}
                    className="press flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground hover:bg-foreground hover:text-background"
                  >
                    <Arrow dir={dir} />
                  </button>
                ))}
              </span>
            </div>

            <h3 className="display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-black text-foreground">
              {project.name}
            </h3>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
              <p className="text-[15px] leading-relaxed text-muted">
                {t(`projects.items.${project.id}.description`)}
              </p>
              <div>
                <p className="mono-tag text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
                  {t("projects.myRole")}
                </p>
                {bullets.map((bullet) => (
                  <p key={bullet} className="mt-2 text-sm leading-relaxed text-muted">
                    {bullet}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="mono-tag rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground"
                  >
                    {t("projects.live")}
                  </a>
                ) : null}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable press inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-accent hover:text-on-accent"
                >
                  <GithubIcon />
                  {t("projects.code")}
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="compact"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex flex-1 flex-col px-2 pb-2 pt-4"
          >
            <div className="flex items-center gap-2">
              <span className="mono-tag text-xs text-muted-2">{number}</span>
              {project.featured ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
            </div>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground">{project.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
              {t(`projects.items.${project.id}.description`)}
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <p className="mono-tag truncate text-xs text-muted-2">
                {project.tech.slice(0, 3).join(" · ")}
                {project.tech.length > 3 ? ` · +${project.tech.length - 3}` : ""}
              </p>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                  <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected ? (
        <button
          type="button"
          onClick={onSelect}
          aria-label={t("projects.openAria", { name: project.name })}
          className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      ) : null}
    </motion.article>
  );
}
