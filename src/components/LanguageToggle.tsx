"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-shrink-0 items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-bold">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-label="English"
        aria-pressed={language === "en"}
        className={`press hoverable rounded-full px-2 py-1 transition-colors ${
          language === "en"
            ? "bg-accent text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        aria-label="Español"
        aria-pressed={language === "es"}
        className={`press hoverable rounded-full px-2 py-1 transition-colors ${
          language === "es"
            ? "bg-accent text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        ES
      </button>
    </div>
  );
}
