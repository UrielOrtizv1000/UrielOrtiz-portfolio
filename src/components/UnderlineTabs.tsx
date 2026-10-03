"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type Tab = { id: string; label: ReactNode };

type UnderlineTabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  /* Unique per tab group so the underline only slides within its own row. */
  layoutId: string;
  className?: string;
};

/* Text tabs with an accent bar that slides under the active one. */
export default function UnderlineTabs({
  tabs,
  active,
  onChange,
  layoutId,
  className = "",
}: UnderlineTabsProps) {
  return (
    <div className={`no-scrollbar flex gap-6 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={`relative flex-shrink-0 whitespace-nowrap pb-3 pt-1 text-sm font-medium transition-colors duration-200 ${
              isActive ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
