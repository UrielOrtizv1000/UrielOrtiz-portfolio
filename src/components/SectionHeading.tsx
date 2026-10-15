import type { ReactNode } from "react";
import Rich from "./Rich";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /**
   * Extra content aligned with the heading's baseline (image, controls).
   * On phones it sits beside the title (top-right grid cell), so callers
   * should give it `max-md:col-start-2 max-md:row-start-1`.
   */
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
      className={`grid grid-cols-[1fr_auto] items-end gap-x-2 gap-y-6 md:flex md:flex-wrap md:gap-x-12 md:gap-y-5 ${
        centered ? "md:items-center md:justify-center" : ""
      }`}
    >
      {/* `contents` on phones so the title and aside share one grid row */}
      <div className="max-md:contents md:flex md:flex-col md:gap-4">
        <h2 className="display text-[56px] leading-[0.9] max-md:row-start-1 md:text-[clamp(46px,7vw,100px)] md:leading-[0.92]">
          <Rich text={title} />
        </h2>
        {description ? (
          <p className="max-w-[520px] text-base leading-[1.6] text-muted max-md:col-span-2 max-md:row-start-2 md:text-[17px] md:leading-relaxed">
            <Rich text={description} />
          </p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}
