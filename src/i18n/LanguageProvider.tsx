"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";

export type Language = "en" | "es";

const dictionaries = { en, es } as const;

type InterpolationVars = Record<string, string | number>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <T = string>(path: string, vars?: InterpolationVars) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getByPath(source: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      source
    );
}

function interpolate(value: string, vars?: InterpolationVars): string {
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Starts at "en" so the server render and the client's first hydration
  // pass match exactly (localStorage isn't available on the server, and
  // reading it in a lazy initializer here would mismatch nearly every text
  // node on the page, unlike the theme, which is CSS-only). The effect
  // below then syncs the real stored preference right after mount — an
  // unavoidable one-frame correction for a client-only i18n toggle with no
  // per-locale routing.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("language");
      if (stored === "en" || stored === "es") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from localStorage, not derivable at render time
        setLanguageState(stored);
      }
    } catch {
      // localStorage unavailable — keep default language.
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      // localStorage unavailable — preference just won't persist.
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "es" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    <T = string,>(path: string, vars?: InterpolationVars): T => {
      const value = getByPath(dictionaries[language], path);
      if (typeof value === "string") {
        return interpolate(value, vars) as unknown as T;
      }
      return value as T;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
