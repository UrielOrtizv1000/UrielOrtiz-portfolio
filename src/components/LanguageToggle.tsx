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
    <div className="flex flex-shrink-0 items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-bold">
      {OPTIONS.map((option) => {
        const active = language === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLanguage(option.id)}
            aria-label={option.aria}
            aria-pressed={active}
            className={`press hoverable relative rounded-full px-2 py-1 transition-colors ${
              active ? "text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
