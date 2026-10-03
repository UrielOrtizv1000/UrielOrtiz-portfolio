"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import AsciiDino from "./AsciiDino";

type HeroStat = { value: string; label: string };

const EASE = [0.23, 1, 0.32, 1] as const;

function SplitWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.06em] pr-[0.04em]" aria-hidden="true">
      {word.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* Counts up the numeric part of a stat ("50k" → 0…50 + "k") once visible.
   The count is kept apart from the text so a language switch mid-way
   still renders the current locale's prefix/suffix. */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState<number | null>(0);
  // Single digits ("C1") read better static; only count real magnitudes.
  const raw = value.match(/^(\D*)(\d+)(.*)$/);
  const match = raw && Number(raw[2]) >= 5 ? raw : null;
  const target = match ? Number(match[2]) : 0;

  useEffect(() => {
    if (!inView || reduce || !target) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setCount(null),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  const text = !match || reduce || count === null ? value : `${match[1]}${count}${match[3]}`;
  return <span ref={ref}>{text}</span>;
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });

  return (
    <motion.div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="relative h-full w-full"
    >
      {children}
    </motion.div>
  );
}

const CHIPS = [
  { label: "Docker", className: "-left-5 top-[18%] sm:-left-8", delay: 0 },
  { label: "Kubernetes", className: "-right-3 top-[40%] sm:-right-7", delay: 1.2 },
  { label: "Azure", className: "-left-4 bottom-[22%] sm:-left-6", delay: 2.1 },
  { label: "FastAPI", className: "right-10 -bottom-4", delay: 0.6 },
];

export default function Hero() {
  const { t, language } = useLanguage();
  const stats = t<HeroStat[]>("hero.stats");
  const [running, setRunning] = useState(false);
  const cvFile = profile.cvFiles[language];

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("hero.available")}
            </span>
            <span className="mono-tag text-xs text-muted-2">{profile.location}</span>
          </motion.div>

          <h1
            className="display mt-6 text-[clamp(4.2rem,15vw,10.5rem)] font-black text-foreground"
            aria-label={profile.name}
          >
            <SplitWord word="Uriel" delay={0.15} />
            <br />
            <span className="inline-flex items-baseline gap-[0.12em]">
              <SplitWord word="Ortiz" delay={0.35} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.9 }}
                className="inline-block h-[0.16em] w-[0.16em] rounded-full bg-accent"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-5 max-w-xl text-2xl leading-tight text-foreground sm:text-3xl"
          >
            <span className="serif-accent">{t("hero.rolePrefix")}</span>{" "}
            <span className="font-semibold tracking-tight">{t("hero.roleStrong")}</span>{" "}
            <span className="text-muted-2">{t("hero.roleRest")}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="hoverable press group inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-semibold text-background hover:shadow-[0_12px_32px_-12px_var(--accent)]"
            >
              {t("hero.viewProjects")}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:rotate-45">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a
              href="#contact"
              className="glass spot hoverable press inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5"
            >
              {t("hero.getInTouch")}
            </a>

            <div className="flex items-center gap-1.5 sm:ml-2">
              {[
                { href: profile.github, label: "gh", aria: "GitHub", external: true },
                { href: `mailto:${profile.email}`, label: "@", aria: profile.email },
                { href: cvFile, label: "cv", aria: t("nav.downloadCv"), download: cvFile },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.aria}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  download={item.download}
                  className="hoverable press mono-tag flex h-10 w-10 items-center justify-center rounded-full border border-foreground/80 text-xs font-semibold text-foreground hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ASCII specimen card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:mt-4"
          onPointerEnter={(e) => e.pointerType === "mouse" && setRunning(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setRunning(false)}
          onPointerDown={(e) => e.pointerType !== "mouse" && setRunning((r) => !r)}
        >
          <TiltCard>
            <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-[linear-gradient(160deg,#ffb36b_0%,#ff7a2f_45%,#ff5a1f_100%)] text-[#0b0b0c] shadow-[0_40px_80px_-30px_rgba(255,90,31,0.6)]">
              <div className="absolute inset-0 opacity-90">
                <AsciiDino running={running} />
              </div>
              <span className="serif-accent absolute left-6 top-5 text-4xl text-[#0b0b0c]/85">
                v1000
              </span>
              <span className="mono-tag absolute right-6 top-7 text-[10px] uppercase tracking-[0.2em] text-[#0b0b0c]/70">
                {running ? (
                  t("hero.dinoRunning")
                ) : (
                  <>
                    <span className="hidden [@media(hover:hover)]:inline">{t("hero.dinoHover")}</span>
                    <span className="[@media(hover:hover)]:hidden">{t("hero.dinoTap")}</span>
                  </>
                )}
              </span>
              <a
                href="#projects"
                aria-label={t("hero.viewProjects")}
                className="press group absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b0b0c] text-white"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45">
                  <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </TiltCard>

          {CHIPS.map((chip, i) => (
            <motion.span
              key={chip.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.1 + i * 0.12 }}
              className={`absolute z-10 ${chip.className}`}
            >
              <span
                className="glass glass-strong float-y mono-tag inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground"
                style={{ animationDelay: `${chip.delay}s` }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {chip.label}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:mt-20 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            className="flex flex-col-reverse"
          >
            <dt className="mt-3 max-w-[14rem] text-sm leading-snug text-muted">{stat.label}</dt>
            <dd className="display text-5xl font-black text-foreground sm:text-6xl">
              <StatValue value={stat.value} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
