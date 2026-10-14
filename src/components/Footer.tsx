"use client";

import { profile } from "@/lib/data";
import { useLanguage } from "@/i18n/LanguageProvider";

const year = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-6 gap-y-3 px-[clamp(20px,4vw,48px)] py-[22px] font-mono text-[11px] uppercase text-muted-2">
        <span>
          © {year} {profile.fullName}
        </span>
        <span className="ml-auto whitespace-nowrap">{t("footer.credit")}</span>
      </div>
    </footer>
  );
}
