"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CACTI, DINO_FRAMES, DINO_H, DINO_W } from "@/lib/ascii";

type Phase = "idle" | "running" | "over";

const P = 3; // sprite pixel → canvas px
const HEIGHT = 150;
const GROUND_OFFSET = 22;
const GRAVITY = 0.0028; // px / ms²
const JUMP_V = 0.66; // px / ms
const START_SPEED = 0.34; // px / ms

type Cactus = { x: number; shape: string[] };

const pad = (n: number) => String(n).padStart(5, "0");

function readColor(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000";
}

function drawSprite(ctx: CanvasRenderingContext2D, rows: string[], x: number, y: number, color: string) {
  ctx.fillStyle = color;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c] === "#") ctx.fillRect(Math.round(x + c * P), Math.round(y + r * P), P, P);
    }
  }
}

export default function DinoRunner() {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [best, setBest] = useState(0);
  const actionRef = useRef<() => void>(() => {});

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem("dino-best"));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from localStorage, not derivable at render time
      if (stored > 0) setBest(stored);
    } catch {
      // localStorage unavailable — best score just won't persist.
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let fg = readColor("--foreground");
    let accent = readColor("--accent");
    let muted = readColor("--muted-2");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      canvas.width = width * dpr;
      canvas.height = HEIGHT * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };

    const groundY = HEIGHT - GROUND_OFFSET;
    const dinoX = 36;
    const dinoH = DINO_H * P;

    let state: Phase = "idle";
    let y = 0; // height above ground
    let vy = 0;
    let speed = START_SPEED;
    let distance = 0;
    let cacti: Cactus[] = [];
    let nextGap = 420;
    let last = 0;
    let raf = 0;
    let visible = true;
    let localBest = 0;
    try {
      localBest = Number(localStorage.getItem("dino-best")) || 0;
    } catch {
      localBest = 0;
    }

    const reset = () => {
      y = 0;
      vy = 0;
      speed = START_SPEED;
      distance = 0;
      cacti = [];
      nextGap = 420;
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, HEIGHT);

      // Ground: a line plus pebbles that scroll with the run.
      ctx.fillStyle = muted;
      ctx.fillRect(0, groundY, width, 1);
      for (let i = 0; i < 40; i++) {
        const px = (((i * 97.3 - distance) % (width + 40)) + width + 40) % (width + 40) - 20;
        ctx.fillRect(px, groundY + 5 + ((i * 7) % 11), (i % 3) + 1, 1);
      }

      for (const cactus of cacti) {
        drawSprite(ctx, cactus.shape, cactus.x, groundY - cactus.shape.length * P, accent);
      }

      const airborne = y > 0;
      const frame =
        state !== "running" || airborne
          ? DINO_FRAMES.stand
          : Math.floor(now / 90) % 2
            ? DINO_FRAMES.runA
            : DINO_FRAMES.runB;
      const dinoY = groundY - dinoH - y;
      drawSprite(ctx, frame, dinoX, dinoY, fg);
      // The eye socket lights up once the run is over.
      if (state === "over") {
        ctx.fillStyle = accent;
        ctx.fillRect(dinoX + 12 * P, dinoY + P, P, P);
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(32, now - (last || now));
      last = now;
      if (!visible || state !== "running") return;

      vy -= GRAVITY * dt;
      y = Math.max(0, y + vy * dt);
      if (y === 0) vy = 0;

      speed = START_SPEED + Math.min(0.32, distance / 40000);
      const dx = speed * dt;
      distance += dx;

      for (const c of cacti) c.x -= dx;
      cacti = cacti.filter((c) => c.x > -40);
      const lastCactus = cacti[cacti.length - 1];
      if (!lastCactus || width - lastCactus.x > nextGap) {
        cacti.push({ x: width + 10, shape: CACTI[Math.random() < 0.5 ? 0 : 1] });
        nextGap = 260 + Math.random() * 360 + speed * 300;
      }

      // Collision with a forgiving inset hitbox.
      const dl = dinoX + 3 * P;
      const dr = dinoX + (DINO_W - 6) * P;
      const db = groundY - y;
      const dtTop = db - dinoH + 4 * P;
      for (const c of cacti) {
        const cl = c.x + P;
        const cr = c.x + (c.shape[0].length - 1) * P;
        const ct = groundY - c.shape.length * P + P;
        if (dr > cl && dl < cr && db > ct && dtTop < groundY) {
          state = "over";
          setPhase("over");
          const final = Math.floor(distance / 10);
          if (final > localBest) {
            localBest = final;
            setBest(final);
            try {
              localStorage.setItem("dino-best", String(final));
            } catch {
              // ignore
            }
          }
          break;
        }
      }

      if (scoreRef.current) scoreRef.current.textContent = pad(Math.floor(distance / 10));
      render(now);
    };

    actionRef.current = () => {
      if (state === "running") {
        if (y === 0) vy = JUMP_V;
        return;
      }
      reset();
      state = "running";
      setPhase("running");
      vy = JUMP_V;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        actionRef.current();
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      fg = readColor("--foreground");
      accent = readColor("--accent");
      muted = readColor("--muted-2");
      render(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="glass overflow-hidden rounded-[2rem]">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="mono-tag flex items-center gap-2 text-xs font-semibold text-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {t("footer.gameTitle")}
        </span>
        <span className="mono-tag text-xs tabular-nums text-muted">
          {t("footer.best")} {pad(best)} · {t("footer.score")} <span ref={scoreRef}>{pad(0)}</span>
        </span>
      </div>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-label={`${t("footer.gameTitle")} — ${t("footer.gameHint")}`}
        onPointerDown={() => actionRef.current()}
        className="relative cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        style={{ height: HEIGHT, touchAction: "manipulation" }}
      >
        <canvas ref={canvasRef} className="block" aria-hidden="true" />
        {phase !== "running" ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="glass glass-strong mono-tag rounded-full px-4 py-2 text-xs font-semibold text-foreground">
              {phase === "idle" ? t("footer.gameStart") : t("footer.gameOver")}
              <span className="ml-2 text-muted-2">· {t("footer.gameHint")}</span>
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
