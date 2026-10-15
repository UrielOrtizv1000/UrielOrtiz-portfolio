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

  const links = SECTIONS.map((id, i) => ({
    id,
    label: t(`nav.${id}`),
    href: `#${id}`,
    n: `0${i + 1}`,
  }));

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
    document.body.dataset.menu = "open";
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menu;
    };
  }, [menuOpen]);

  // The full-screen menu only exists below `md`; close it if the viewport grows past that.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--nav)] backdrop-blur-[10px] md:border-b-0">
      <nav className="mx-auto flex h-[60px] max-w-[1240px] items-center gap-2 px-[clamp(20px,4vw,48px)] md:h-auto md:gap-4 md:py-3.5">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="press flex items-baseline gap-1.5 whitespace-nowrap md:gap-2"
        >
          <span className="text-[22px] font-extrabold leading-none tracking-[-0.04em] [font-stretch:125%]">
            UO<span className="text-brand">.</span>
          </span>
          <span className="font-mono text-[11px] text-muted-2 md:text-xs">({profile.version})</span>
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
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

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
            aria-controls="mobile-menu"
            className="press hoverable grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white md:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[60px] flex h-[calc(100dvh-60px)] flex-col gap-7 overflow-y-auto bg-background px-[clamp(20px,4vw,48px)] pb-8 pt-6 md:hidden"
        >
          <nav aria-label="Menu" className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`display flex items-baseline justify-between border-b border-border py-3 text-[44px] leading-none ${
                  active === link.id ? "!text-accent" : ""
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs font-medium normal-case tracking-normal text-muted-2">
                  {link.n}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-2">
              {t("nav.language")}
            </span>
            <LanguageToggle large />
          </div>

          <a
            href={cvFile}
            download={cvFile}
            onClick={() => setMenuOpen(false)}
            className="label-cond flex items-center justify-center gap-2 rounded-full bg-brand p-4 text-xl tracking-[0.04em] !text-white hover:bg-brand-strong"
          >
            {t("nav.downloadCv")}
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="M12 4v11M7 10l5 5 5-5M5 20h14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      ) : null}
    </header>
  );
}
