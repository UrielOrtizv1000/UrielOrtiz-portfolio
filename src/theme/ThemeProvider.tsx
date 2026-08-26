"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readDomTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: by the time this runs on the client (hydration), the
  // blocking inline script in layout.tsx has already set data-theme on
  // <html>, so reading it here is safe and needs no effect/setState.
  const [theme, setTheme] = useState<Theme>(readDomTheme);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // Dev-only safety net: React Strict Mode remounts once and clears any
    // <html> attribute not set from JSX, wiping what the inline script set.
    // Re-apply it here so dev matches prod. This setState is a deliberate
    // re-sync with the DOM (an external system), not derivable state.
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr !== "light" && attr !== "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-detection flag, no alternative
    setMounted(true);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage unavailable — preference just won't persist.
      }
      return next;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, mounted }),
    [theme, toggleTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
