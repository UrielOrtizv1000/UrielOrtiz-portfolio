import type { ReactNode } from "react";
import Rich from "./Rich";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Extra content aligned with the heading's baseline (image, controls). */
  aside?: ReactNode;
  centered?: boolean;
};

export default function SectionHeading({
  title,
  description,
  aside,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-wrap gap-x-12 gap-y-5 ${
        centered ? "items-center justify-center" : "items-end"
      }`}
    >
      <div className="min-w-0 max-w-full flex flex-col gap-4">
        <h2 className="display text-balance text-[clamp(36px,7vw,100px)] leading-[1.02]">
          <Rich text={title} />
        </h2>
        {description ? (
          <p className="max-w-[520px] text-[17px] leading-relaxed text-muted">
            <Rich text={description} />
          </p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}
