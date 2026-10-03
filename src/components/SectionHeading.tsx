type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3">
        {index ? (
          <span className="mono-tag flex h-7 min-w-7 items-center justify-center rounded-full bg-foreground px-2 text-[11px] font-semibold text-background">
            {index}
          </span>
        ) : null}
        <span className="mono-tag text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />
      </div>
      <h2 className="display mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.25rem)] font-black text-foreground text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
