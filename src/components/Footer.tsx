"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/lib/data";

const year = new Date().getFullYear();

export default function Footer() {
  const { t, language } = useLanguage();
  const cvFile = profile.cvFiles[language];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <p className="text-sm text-muted-2">
          © {year} {profile.fullName}. {t("footer.rights")}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable press text-sm font-medium text-muted hover:text-accent"
          >
            {t("footer.github")}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hoverable press text-sm font-medium text-muted hover:text-accent"
          >
            {t("footer.email")}
          </a>
          <a
            href={cvFile}
            download={cvFile}
            className="hoverable press text-sm font-medium text-muted hover:text-accent"
          >
            {t("footer.cv")}
          </a>
        </div>
      </div>

      {}
      <p className="mono-tag border-t border-border py-4 text-center text-xs text-muted-2">
        developed by v1000
      </p>
    </footer>
  );
}
