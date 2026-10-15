"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

const OPTIONS = [
  { code: "en", label: "EN", aria: "English" },
  { code: "es", label: "ES", aria: "Español" },
] as const;

/** `large` is the touch-sized variant used inside the phone menu. */
export default function LanguageToggle({ large = false }: { large?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`flex shrink-0 rounded-full border border-border-strong font-mono font-bold ${
        large ? "p-[3px] text-xs" : "p-0.5 text-[10px]"
      }`}
    >
      {OPTIONS.map((opt) => {
        const on = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-label={opt.aria}
            aria-pressed={on}
            className={`press hoverable rounded-full ${large ? "px-4 py-2.5" : "px-2 py-[5px]"} ${
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
