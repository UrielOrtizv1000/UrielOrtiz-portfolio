"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useTheme } from "@/theme/ThemeProvider";

const SUN =
  "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z";
const MOON =
  "M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useLanguage();

  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? t(isDark ? "nav.switchToLight" : "nav.switchToDark") : undefined}
      className="press hoverable flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border text-foreground hover:border-accent/60 hover:text-accent"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={isDark ? "moon" : "sun"}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          initial={{ y: 16, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -16, rotate: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            stroke="currentColor"
            d={isDark ? MOON : SUN}
          />
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
