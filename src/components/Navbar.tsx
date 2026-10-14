"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = ["about", "skills", "projects", "experience", "education", "contact"] as const;

export default function Navbar() {
  const { t, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const cvFile = profile.cvFiles[language];

  const links = SECTIONS.map((id) => ({ id, label: t(`nav.${id}`), href: `#${id}` }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--nav)] backdrop-blur-[10px]">
      <nav className="mx-auto flex max-w-[1240px] items-center gap-4 px-[clamp(20px,4vw,48px)] py-3.5">
        <a href="#top" className="press flex items-baseline gap-2 whitespace-nowrap">
          <span className="text-[22px] font-extrabold leading-none tracking-[-0.04em] [font-stretch:125%]">
            UO<span className="text-brand">.</span>
          </span>
          <span className="font-mono text-xs text-muted-2">({profile.version})</span>
        </a>

        <ul className="ml-auto hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`hoverable label-cond block whitespace-nowrap px-2 py-[7px] text-base hover:text-accent ${
                  active === link.id ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <ThemeToggle />
          <LanguageToggle />

          <a
            href={cvFile}
            download={cvFile}
            className="hoverable press label-cond hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 py-[9px] text-[15px] !text-white hover:bg-brand-strong md:flex"
          >
            {t("nav.downloadCv")}
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3">
              <path
                d="M12 4v11M7 10l5 5 5-5M5 20h14"
                stroke="currentColor"
                strokeWidth="2.2"
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
            className="press hoverable flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground md:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`grid overflow-hidden bg-[var(--nav)] backdrop-blur-[10px] transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-[clamp(20px,4vw,48px)] pb-4 pt-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`label-cond block rounded-lg px-3 py-2.5 text-lg hover:bg-surface hover:text-accent ${
                    active === link.id ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={cvFile}
                download={cvFile}
                onClick={() => setMenuOpen(false)}
                className="label-cond flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-lg !text-white hover:bg-brand-strong"
              >
                {t("nav.downloadCv")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
