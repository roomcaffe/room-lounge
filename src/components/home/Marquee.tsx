"use client";

const items = [
  "Espresso",
  "Cocktails",
  "Live Music",
  "DJ Nights",
  "Sports",
  "Anniversaries",
  "Community",
  "Lipjan",
  "Since 2007",
];

export function Marquee() {
  return (
    <section className="relative py-8 border-y border-[color:var(--line)] bg-[color:var(--obsidian-soft)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 px-8 text-display-md text-[color:var(--cream-soft)]/40 hover:text-[color:var(--ember)] transition-colors duration-700"
          >
            <span className="font-display italic">{item}</span>
            <span className="w-2 h-2 rounded-full bg-[color:var(--ember)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
