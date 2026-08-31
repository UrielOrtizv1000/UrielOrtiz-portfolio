"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const NODE_COUNT = 46;
const LINK_DISTANCE = 130;
const POINTER_RADIUS = 140;

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let running = true;
    let accentColor = "168, 85, 247";

    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const m = raw.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
      if (m) {
        accentColor = `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.max(18, Math.min(NODE_COUNT, Math.round(area / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const drawStatic = () => {
      readAccent();
      resize();
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor}, 0.5)`;
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_RADIUS) {
          const force = (1 - dist / POINTER_RADIUS) * 0.03;
          n.vx += (dx / (dist || 1)) * force;
          n.vy += (dy / (dist || 1)) * force;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.98;
        n.vy *= 0.98;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${accentColor}, ${(1 - dist / LINK_DISTANCE) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor}, 0.55)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer = { x: -9999, y: -9999 };
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const onThemeChange = () => {
      readAccent();
      if (reduceMotion) drawStatic();
    };

    readAccent();
    resize();

    if (reduceMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(step);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
