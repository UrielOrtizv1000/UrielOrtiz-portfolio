"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
