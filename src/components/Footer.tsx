"use client";

import { profile } from "@/lib/data";
import { useLanguage } from "@/i18n/LanguageProvider";

const year = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-1.5 px-[clamp(20px,4vw,48px)] pb-7 pt-5 font-mono text-[10px] uppercase text-muted-2 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-3 md:py-[22px] md:text-[11px]">
        <span>
          © {year} {profile.fullName}
        </span>
        <span className="whitespace-nowrap md:ml-auto">{t("footer.credit")}</span>
      </div>
    </footer>
  );
}
