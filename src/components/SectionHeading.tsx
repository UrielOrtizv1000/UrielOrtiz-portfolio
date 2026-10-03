type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <span className="mono-tag inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
