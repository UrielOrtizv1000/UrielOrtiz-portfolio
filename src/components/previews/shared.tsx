"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import type { Language } from "@/i18n/LanguageProvider";

export type PreviewProps = {
  /* Animate only while the preview is on screen and in focus. */
  active: boolean;
  lang: Language;
};

/* The virtual canvas every preview is drawn on; ScaledStage fits it to its box. */
export const STAGE_W = 640;
export const STAGE_H = 400;

/* A step counter that advances every `ms` while active. Paused previews (and
   reduced-motion users) keep showing the `initial` frame. */
export function useTick(active: boolean, ms: number, initial = 0) {
  const [tick, setTick] = useState(initial);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1);
    }, ms);
    return () => window.clearInterval(id);
  }, [active, ms, reduce]);

  return tick;
}

/* Deterministic pseudo-random in [0, 1) so frames are stable across renders. */
export function rand(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ScaledStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / STAGE_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  compact = false,
  children,
  toolbar,
}: {
  url: string;
  compact?: boolean;
  children: ReactNode;
  toolbar?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] bg-[#141417] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/10 dark:ring-white/10">
      <div
        className={`flex items-center gap-2 border-b border-white/[0.06] bg-[#1c1c20] ${
          compact ? "h-7 px-2.5" : "h-9 px-3.5"
        }`}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className={`rounded-full bg-[#ff5f57] ${compact ? "h-2 w-2" : "h-2.5 w-2.5"}`} />
          <span className={`rounded-full bg-[#febc2e] ${compact ? "h-2 w-2" : "h-2.5 w-2.5"}`} />
          <span className={`rounded-full bg-[#28c840] ${compact ? "h-2 w-2" : "h-2.5 w-2.5"}`} />
        </span>
        <span
          className={`mono-tag mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/[0.06] text-white/55 ${
            compact ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[11px]"
          }`}
        >
          <svg aria-hidden="true" viewBox="0 0 12 12" className="h-2.5 w-2.5 flex-shrink-0" fill="none">
            <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5M3 5.5h6v4.5H3z" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span className="truncate">{url}</span>
        </span>
        {toolbar ?? <span className={compact ? "w-8" : "w-12"} />}
      </div>
      {children}
    </div>
  );
}
