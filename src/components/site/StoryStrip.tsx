export function StoryStrip() {
  const stats = [
    { value: "18+", label: "Vite në Lipjan" },
    { value: "150K+", label: "Kafe të shërbyera" },
    { value: "200+", label: "Net live music" },
    { value: "∞", label: "Kujtime të krijuara" },
  ];
  return (
    <section className="py-24 md:py-32 border-y border-[var(--line)] bg-[var(--bg-soft)] relative">
      <div className="absolute inset-0 bg-radial-gold opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="font-display text-5xl md:text-6xl text-gradient-gold font-light italic">
              {s.value}
            </div>
            <div className="mt-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a99c80] group-hover:text-[var(--gold)] transition-colors">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
