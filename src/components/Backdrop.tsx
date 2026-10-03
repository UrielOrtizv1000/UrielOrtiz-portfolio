"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { specimens } from "@/lib/ascii";

/* Fixed aurora + grid behind everything, plus the pointer bookkeeping the
   glass ".spot" sheen relies on. */
export function Ambient() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let last: PointerEvent | null = null;

    const flush = () => {
      raf = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
        target.style.setProperty("--my", `${last.clientY - rect.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="grid-lines" aria-hidden="true" />
    </>
  );
}

const placements = [
  { id: "trex", top: "13%", side: "right", speed: 0.5 },
  { id: "bronto", top: "33%", side: "left", speed: 0.8 },
  { id: "ptero", top: "50%", side: "right", speed: 1.2 },
  { id: "stego", top: "68%", side: "left", speed: 0.6 },
  { id: "trex", top: "86%", side: "right", speed: 0.9 },
] as const;

function Specimens({ offsets }: { offsets: MotionValue<number>[] }) {
  return (
    <>
      {placements.map((p, i) => {
        const specimen = specimens.find((s) => s.id === p.id)!;
        return (
          <motion.figure
            key={`${p.id}-${i}`}
            className="absolute m-0"
            style={{
              top: p.top,
              [p.side]: "clamp(-80px, 2vw, 48px)",
              y: offsets[i],
            }}
          >
            <pre>{specimen.art}</pre>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em]">
              ⌖ {specimen.label}
            </figcaption>
          </motion.figure>
        );
      })}
    </>
  );
}

/* Page-length layer of ASCII dinos. Each specimen drifts at its own
   parallax speed; a second accent-coloured copy is masked to a circle
   around the cursor so the fossils "light up" as you explore. */
export function AsciiDinos() {
  const litRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const o0 = useTransform(scrollYProgress, [0, 1], [0, -placements[0].speed * 360]);
  const o1 = useTransform(scrollYProgress, [0, 1], [0, -placements[1].speed * 360]);
  const o2 = useTransform(scrollYProgress, [0, 1], [0, -placements[2].speed * 360]);
  const o3 = useTransform(scrollYProgress, [0, 1], [0, -placements[3].speed * 360]);
  const o4 = useTransform(scrollYProgress, [0, 1], [0, -placements[4].speed * 360]);
  const offsets = [o0, o1, o2, o3, o4];

  useEffect(() => {
    const lit = litRef.current;
    if (!lit) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let cx = -9999;
    let cy = -9999;

    const flush = () => {
      raf = 0;
      const rect = lit.getBoundingClientRect();
      lit.style.setProperty("--px", `${cx - rect.left}px`);
      lit.style.setProperty("--py", `${cy - rect.top}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="ascii-layer" data-tone="dim" aria-hidden="true">
        <Specimens offsets={offsets} />
      </div>
      <div ref={litRef} className="ascii-layer" data-tone="lit" aria-hidden="true">
        <Specimens offsets={offsets} />
      </div>
    </>
  );
}
