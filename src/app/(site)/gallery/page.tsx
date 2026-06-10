import { prisma } from "@/lib/prisma";

export const metadata = { title: "Galeria" };
export const dynamic = "force-dynamic";

const FALLBACK_TILES = [
  { grad: "linear-gradient(135deg,#3a2419,#0a0807)", label: "Atmosfera e Mbrëmjes" },
  { grad: "linear-gradient(135deg,#8f7344,#1a1614)", label: "Cocktails Signature" },
  { grad: "linear-gradient(135deg,#1a1614,#c9a86a)", label: "Live Music" },
  { grad: "linear-gradient(135deg,#141110,#3a2419)", label: "Espresso Time" },
  { grad: "linear-gradient(135deg,#c9a86a,#3a2419)", label: "Community Moments" },
  { grad: "linear-gradient(135deg,#0a0807,#8f7344)", label: "Special Events" },
  { grad: "linear-gradient(135deg,#3a2419,#c9a86a)", label: "Anniversary Night" },
  { grad: "linear-gradient(135deg,#1a1614,#8f7344)", label: "DJ Sessions" },
  { grad: "linear-gradient(135deg,#8f7344,#0a0807)", label: "Behind The Scenes" },
];

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => []);

  return (
    <>
      <section className="pt-32 pb-16 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">— Brenda Room-it</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Galeria
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-2xl mx-auto">
            Momente, atmosfera, dhe njerëzit që na bëjnë atë që jemi.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {images.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group overflow-hidden">
                  <img src={img.url} alt={img.caption || "Room Lounge"} className="w-full h-auto" />
                  {img.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-[var(--gold)] text-sm">{img.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FALLBACK_TILES.map((t, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden ${
                    i === 0 || i === 5 ? "aspect-[3/4] md:aspect-square md:row-span-2" : "aspect-square"
                  }`}
                  style={{ background: t.grad }}
                >
                  <div className="absolute inset-0 bg-noise opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] opacity-80 group-hover:opacity-100 transition-opacity">
                      {t.label}
                    </div>
                    <div className="h-px w-12 bg-[var(--gold)] mt-2 group-hover:w-20 transition-all duration-700" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
