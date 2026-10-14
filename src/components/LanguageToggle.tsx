"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

const OPTIONS = [
  { code: "en", label: "EN", aria: "English" },
  { code: "es", label: "ES", aria: "Español" },
] as const;

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex shrink-0 rounded-full border border-border-strong p-0.5 font-mono text-[10px] font-bold">
      {OPTIONS.map((opt) => {
        const on = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-label={opt.aria}
            aria-pressed={on}
            className={`press hoverable rounded-full px-2 py-[5px] ${
              on ? "bg-foreground text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
