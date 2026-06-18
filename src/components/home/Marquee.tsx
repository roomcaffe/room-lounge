"use client";

const items = [
  "Espresso",
  "Negroni",
  "Old Fashioned",
  "Live Music",
  "DJ Nights",
  "Brass × Marble",
  "Velvet Lounge",
  "Rooftop Terrace",
  "Lipjan",
  "Since 2007",
];

export function Marquee() {
  return (
    <section className="relative py-6 md:py-8 border-y border-[color:var(--line)] bg-[color:var(--obsidian-soft)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 md:gap-12 px-4 md:px-8 text-2xl md:text-display-md text-[color:var(--cream-soft)]/40 hover:text-[color:var(--brass)] transition-colors duration-700"
          >
            <span className="font-display italic">{item}</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[color:var(--brass)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
