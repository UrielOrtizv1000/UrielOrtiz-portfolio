import { Fragment, type ReactNode } from "react";

/**
 * Tiny inline markup for translated strings:
 *   *word*   → serif italic accent (editorial emphasis)
 *   {word}   → accent colour, same face (for display headings)
 *   **word** → semibold foreground
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\{[^}]+\})/g;

export default function Rich({ text }: { text: string }): ReactNode {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="font-serif text-[1.2em] font-normal italic text-accent">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span key={i} className="text-accent">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
