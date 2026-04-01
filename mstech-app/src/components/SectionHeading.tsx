interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 ring-1 ring-primary/20 mb-6 animate-fade-in ${
            align === "center" ? "" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-dm-sans)] leading-tight animate-fade-in-up ${
          gradient ? "gradient-text" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed animate-fade-in-up delay-200">
          {subtitle}
        </p>
      )}
    </div>
  );
}
