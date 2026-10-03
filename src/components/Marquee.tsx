"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* A row that drifts on its own and speeds up (or reverses) with scroll velocity. */
function VelocityRow({ children, baseVelocity }: { children: ReactNode; baseVelocity: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex flex-nowrap" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const { t } = useLanguage();
  const words = t<string[]>("marquee.words");
  const tech = ["Docker", "Kubernetes", "Azure", "FastAPI", "React", "Angular", "Node.js", "MySQL"];

  return (
    <section
      aria-label={words.join(", ")}
      className="relative -rotate-[1.5deg] scale-[1.03] bg-ink py-6 text-on-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:py-8"
    >
      <span className="absolute left-4 top-3 text-xl text-on-ink/60 sm:left-8" aria-hidden="true">⌖</span>
      <span className="absolute right-4 top-3 text-xl text-on-ink/60 sm:right-8" aria-hidden="true">⌖</span>

      <VelocityRow baseVelocity={-2.2}>
        {words.map((word) => (
          <span key={word} className="marquee-text flex items-center font-black">
            <span className="px-[0.18em]">{word}</span>
            <span className="text-accent">.</span>
          </span>
        ))}
      </VelocityRow>

      <div className="mt-2">
        <VelocityRow baseVelocity={1.6}>
          {tech.map((name) => (
            <span key={name} className="flex items-center gap-6 px-6 text-2xl sm:text-4xl">
              <span className="serif-accent text-on-ink/85">{name}</span>
              <span className="text-accent" aria-hidden="true">✳</span>
            </span>
          ))}
        </VelocityRow>
      </div>
    </section>
  );
}
