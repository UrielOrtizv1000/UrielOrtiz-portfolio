"use client";

import { useEffect, useRef } from "react";
import { DINO_FRAMES, DINO_H, DINO_W, RAMP } from "@/lib/ascii";

/* Cells per sprite pixel. Mono glyphs are ~0.6em wide, so 4 columns by
   2 rows at line-height 1.2 keeps each sprite pixel square. */
const SX = 4;
const SY = 2;
const PAD_X = 4;
const PAD_TOP = 2; // no bottom padding: the feet sit on the box's lower edge
const COLS = DINO_W * SX + PAD_X * 2;
const ROWS = DINO_H * SY + PAD_TOP;
const GLITCH = "01<>/\\{}[]#$%&*+=?";

type Grid = Float32Array;

function pixel(frame: string[], x: number, y: number, eyeOpen: boolean) {
  if (y < 0 || y >= frame.length || x < 0 || x >= DINO_W) return 0;
  const c = frame[y][x];
  if (c === "#") return 1;
  if (c === "o") return eyeOpen ? 0 : 1;
  return 0;
}

/* Bilinear coverage of the binary sprite at every character cell, which
   gives anti-aliased edges once mapped through the density ramp. */
function coverage(frame: string[], eyeOpen: boolean): Grid {
  const grid = new Float32Array(COLS * ROWS);
  for (let cy = 0; cy < ROWS; cy++) {
    for (let cx = 0; cx < COLS; cx++) {
      const u = (cx - PAD_X + 0.5) / SX - 0.5;
      const v = (cy - PAD_TOP + 0.5) / SY - 0.5;
      const x0 = Math.floor(u);
      const y0 = Math.floor(v);
      const fx = u - x0;
      const fy = v - y0;
      const a = pixel(frame, x0, y0, eyeOpen);
      const b = pixel(frame, x0 + 1, y0, eyeOpen);
      const c = pixel(frame, x0, y0 + 1, eyeOpen);
      const d = pixel(frame, x0 + 1, y0 + 1, eyeOpen);
      const top = a + (b - a) * fx;
      const bottom = c + (d - c) * fx;
      grid[cy * COLS + cx] = top + (bottom - top) * fy;
    }
  }
  return grid;
}

export default function AsciiDino({ running = false }: { running?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const box = boxRef.current;
    const pre = preRef.current;
    if (!box || !pre) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const grids = {
      stand: [coverage(DINO_FRAMES.stand, true), coverage(DINO_FRAMES.stand, false)],
      runA: [coverage(DINO_FRAMES.runA, true), coverage(DINO_FRAMES.runA, false)],
      runB: [coverage(DINO_FRAMES.runB, true), coverage(DINO_FRAMES.runB, false)],
    };

    // Each cell decodes in at its own moment, sweeping roughly top to bottom.
    const revealAt = new Float32Array(COLS * ROWS);
    for (let i = 0; i < revealAt.length; i++) {
      revealAt[i] = Math.random() * 900 + (Math.floor(i / COLS) / ROWS) * 700;
    }

    const fit = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      const byWidth = width / (COLS * 0.6);
      const byHeight = height / (ROWS * 1.2);
      pre.style.fontSize = `${Math.min(byWidth, byHeight)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    let pointer = { x: -999, y: -999 };
    const onMove = (e: PointerEvent) => {
      const rect = pre.getBoundingClientRect();
      pointer = {
        x: ((e.clientX - rect.left) / rect.width) * COLS,
        y: ((e.clientY - rect.top) / rect.height) * ROWS,
      };
    };
    const onLeave = () => {
      pointer = { x: -999, y: -999 };
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);

    const start = performance.now();
    let lastDraw = 0;
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const elapsed = now - start;
      const blink = t % 4.2 > 4.05;
      const step = Math.floor(now / 110) % 2;
      const pose = runningRef.current ? (step ? "runA" : "runB") : "stand";
      const grid = grids[pose][blink ? 1 : 0];

      let out = "";
      for (let cy = 0; cy < ROWS; cy++) {
        for (let cx = 0; cx < COLS; cx++) {
          const i = cy * COLS + cx;
          const cov = grid[i];
          const dx = (cx - pointer.x) * 0.6;
          const dy = (cy - pointer.y) * 1.2;
          const near = dx * dx + dy * dy < 36;

          if (!reduceMotion && elapsed < revealAt[i]) {
            out += elapsed > revealAt[i] - 260 ? GLITCH[(Math.random() * GLITCH.length) | 0] : " ";
            continue;
          }

          if (cov > 0.04) {
            if (near && Math.random() < 0.55) {
              out += GLITCH[(Math.random() * GLITCH.length) | 0];
              continue;
            }
            const wave = Math.sin(t * 2.2 - cx * 0.18 + cy * 0.32) * 0.16;
            const v = Math.min(1, Math.max(0, cov * 0.78 + 0.16 + wave));
            out += RAMP[3 + Math.round(v * (RAMP.length - 4))];
          } else {
            out += near && Math.random() < 0.25 ? "·" : " ";
          }
        }
        out += "\n";
      }
      pre.textContent = out;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - lastDraw < 66) return;
      lastDraw = now;
      draw(now);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(box);

    if (reduceMotion) {
      draw(start + 2000);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} className="flex h-full w-full items-end justify-center" aria-hidden="true">
      <pre
        ref={preRef}
        className="m-0 select-none font-mono leading-[1.2] tracking-normal"
        style={{ fontSize: 8 }}
      />
    </div>
  );
}
