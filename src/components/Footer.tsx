"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";
import DinoRunner from "./DinoRunner";

const year = new Date().getFullYear();

export default function Footer() {
  const { t, language } = useLanguage();
  const cvFile = profile.cvFiles[language];

  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
      <DinoRunner />

      <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted-2 sm:text-left">
          © {year} {profile.fullName}. {t("footer.rights")}
        </p>

        <div className="flex items-center gap-1">
          {[
            { href: profile.github, label: t("footer.github"), external: true },
            { href: `mailto:${profile.email}`, label: t("footer.email") },
            { href: cvFile, label: t("footer.cv"), download: cvFile },
            { href: "#top", label: `${t("footer.backToTop")} ↑` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              download={link.download}
              className="hoverable press rounded-full px-3 py-1.5 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <p className="mono-tag mt-6 text-center text-xs text-muted-2">developed by v1000</p>
    </footer>
  );
}
