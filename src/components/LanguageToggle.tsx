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
    <div className="mono-tag flex flex-shrink-0 items-center gap-0.5 text-xs font-bold">
      {OPTIONS.map((option, i) => (
        <span key={option.id} className="flex items-center">
          {i > 0 ? <span className="px-0.5 text-muted-2">/</span> : null}
          <button
            type="button"
            onClick={() => setLanguage(option.id)}
            aria-label={option.aria}
            aria-pressed={language === option.id}
            className={`press relative px-1 py-1.5 transition-colors ${
              language === option.id ? "text-foreground" : "text-muted-2 hover:text-foreground"
            }`}
          >
            {option.label}
            {language === option.id ? (
              <motion.span
                layoutId="lang-underline"
                className="absolute inset-x-1 bottom-0.5 h-[2px] bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
          </button>
        </span>
      ))}
    </div>
  );
}
