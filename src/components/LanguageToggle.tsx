"use client";

import { motion } from "motion/react";
import { useLanguage, type Language } from "@/i18n/LanguageProvider";

const OPTIONS: { id: Language; label: string; aria: string }[] = [
  { id: "en", label: "EN", aria: "English" },
  { id: "es", label: "ES", aria: "Español" },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-shrink-0 items-center rounded-full bg-foreground/[0.06] p-0.5 text-[11px] font-bold ring-1 ring-foreground/10">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setLanguage(option.id)}
          aria-label={option.aria}
          aria-pressed={language === option.id}
          className={`press relative rounded-full px-2.5 py-1.5 transition-colors ${
            language === option.id ? "text-background" : "text-muted hover:text-foreground"
          }`}
        >
          {language === option.id ? (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-foreground"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          ) : null}
          <span className="relative">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
