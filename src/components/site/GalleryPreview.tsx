import { SectionHeading } from "./SectionHeading";
import Link from "next/link";

const tiles = [
  { grad: "linear-gradient(135deg,#3a2419,#0a0807)", label: "Atmosfera" },
  { grad: "linear-gradient(135deg,#8f7344,#1a1614)", label: "Cocktails" },
  { grad: "linear-gradient(135deg,#1a1614,#c9a86a)", label: "Live Music" },
  { grad: "linear-gradient(135deg,#141110,#3a2419)", label: "Coffee" },
  { grad: "linear-gradient(135deg,#c9a86a,#3a2419)", label: "Community" },
  { grad: "linear-gradient(135deg,#0a0807,#8f7344)", label: "Events" },
];

export function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Galeria"
          title="Brenda Room-it"
          subtitle="Atmosferë, momente, dhe njerëzit që na bëjnë atë që jemi."
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3">
          {tiles.map((t, i) => (
            <Link
              key={i}
              href="/gallery"
              className={`group relative overflow-hidden aspect-square ${
                i === 0 ? "md:row-span-2 md:aspect-auto" : ""
              }`}
              style={{ background: t.grad }}
            >
              <div className="absolute inset-0 bg-noise opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-5 right-5 z-10">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  {t.label}
                </div>
                <div className="h-px w-0 bg-[var(--gold)] group-hover:w-12 transition-all duration-700 mt-2" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/gallery" className="btn-outline">
            Galeria e Plotë
          </Link>
        </div>
      </div>
    </section>
  );
}
