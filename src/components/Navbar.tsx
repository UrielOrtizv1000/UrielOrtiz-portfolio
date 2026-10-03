"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = ["about", "projects", "experience", "education", "contact"];

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return active;
}

function LogoMark() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });

  return (
    <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="16.5" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <motion.circle
          cx="18"
          cy="18"
          r="16.5"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-[11px] font-black tracking-tight text-background">
        UO
      </span>
    </span>
  );
}

export default function Navbar() {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection();
  const cvFile = profile.cvFiles[language];

  const links = [
    { id: "about", label: t("nav.research") },
    { id: "projects", label: t("nav.projects") },
    { id: "experience", label: t("nav.experience") },
    { id: "education", label: t("nav.education") },
    { id: "contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const highlighted = hovered ?? active;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      {/* Glass panels stay siblings: a backdrop-filter on an ancestor would
          stop the inner panel from blurring the page behind it. */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className={`pointer-events-auto relative w-full transition-[max-width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled ? "max-w-5xl" : "max-w-6xl"
        }`}
      >
        <nav className="glass glass-strong flex h-14 items-center gap-3 whitespace-nowrap rounded-full pl-2.5 pr-2">
          <a href="#top" className="press flex items-center gap-2.5" aria-label={profile.name}>
            <LogoMark />
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline md:hidden xl:inline">
              {profile.name}
              <span className="mono-tag ml-1.5 text-xs font-normal text-muted-2">
                {profile.version}
              </span>
            </span>
          </a>

          <ul
            className="mx-auto hidden items-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onMouseEnter={() => setHovered(link.id)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    highlighted === link.id ? "text-foreground" : "text-muted"
                  }`}
                >
                  {highlighted === link.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/[0.07] ring-1 ring-foreground/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{link.label}</span>
                  {active === link.id ? (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <ThemeToggle />
            <LanguageToggle />
            <a
              href={cvFile}
              download={cvFile}
              className="hoverable press hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background hover:bg-accent hover:text-on-accent sm:inline-flex"
            >
              {t("nav.downloadCv")}
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M8 1.5v9m0 0L4.5 7M8 10.5L11.5 7M2.5 13.5h11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={menuOpen}
              className="press flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background md:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <motion.path
                  initial={false}
                  d={menuOpen ? "M5 5l10 10" : "M3 7h14"}
                  animate={{ d: menuOpen ? "M5 5l10 10" : "M3 7h14" }}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={false}
                  d={menuOpen ? "M15 5L5 15" : "M3 13h14"}
                  animate={{ d: menuOpen ? "M15 5L5 15" : "M3 13h14" }}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="glass glass-strong absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top rounded-3xl p-2 md:hidden"
            >
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="press flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-foreground/5"
                    >
                      {link.label}
                      <span className="mono-tag text-xs text-muted-2">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
                <li className="p-1 pt-2">
                  <a
                    href={cvFile}
                    download={cvFile}
                    onClick={() => setMenuOpen(false)}
                    className="press flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background"
                  >
                    {t("nav.downloadCv")}
                  </a>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
