export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const a = align === "left" ? "text-left" : "text-center";
  return (
    <div className={`${a} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && (
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
          — {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-[#f5ede0]">
        {title}
      </h2>
      {align === "center" && <div className="divider-gold" />}
      {subtitle && (
        <p className="text-[#a99c80] leading-relaxed mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
