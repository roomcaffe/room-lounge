import { SectionHeading } from "@/components/site/SectionHeading";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Calendar, Music } from "lucide-react";

export const metadata = { title: "Eventet" };
export const dynamic = "force-dynamic";

const FALLBACK = [
  { title: "Saturday Live Sessions", artist: "Roli & Band", date: new Date(Date.now() + 86400000 * 3), time: "22:00", description: "Nje natë me muzikë live, energji dhe atmosferë premium." },
  { title: "Acoustic Nights", artist: "Edita Krasniqi", date: new Date(Date.now() + 86400000 * 7), time: "21:30", description: "Akustika më e bukur që ka mbajtur Room ndonjëherë." },
  { title: "DJ Sunset Lounge", artist: "DJ Aksi", date: new Date(Date.now() + 86400000 * 10), time: "20:00", description: "House · deep · groove. Mbrëmje për t'u shijuar." },
  { title: "Champions League Night", artist: "Sports Screening", date: new Date(Date.now() + 86400000 * 14), time: "21:00", description: "Ekrane të mëdha, atmosferë stadiumi, drinks special." },
];

export default async function EventsPage() {
  const dbEvents = await prisma.event
    .findMany({
      where: { status: "published" },
      orderBy: { date: "asc" },
    })
    .catch(() => []);

  const events = dbEvents.length > 0 ? dbEvents : FALLBACK;

  return (
    <>
      <section className="pt-32 pb-16 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">— Live & Events</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Eventet
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-2xl mx-auto">
            Net live music, DJ, sport screenings dhe momente që mbahen mend.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <div key={i} className="card-luxe group">
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{
                  background:
                    "coverImage" in e && (e as { coverImage?: string }).coverImage
                      ? `url(${(e as { coverImage?: string }).coverImage}) center/cover`
                      : `linear-gradient(135deg, hsl(${(i * 47) % 360},20%,15%), hsl(${(i * 47 + 180) % 360},30%,30%))`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                  <Music size={100} className="text-[var(--gold)]" />
                </div>
                <div className="absolute top-5 left-5 px-3 py-1 bg-[rgba(10,8,7,0.7)] backdrop-blur-sm border border-[var(--line-strong)] text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                  Live
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2 text-[var(--gold-deep)] text-xs uppercase tracking-widest mb-3">
                  <Calendar size={12} /> {formatDate(e.date)} · {e.time}
                </div>
                <h3 className="font-display text-2xl text-[#f5ede0] group-hover:text-[var(--gold)] transition-colors">
                  {e.title}
                </h3>
                {e.artist && <p className="text-[var(--gold-soft)] text-sm mt-1 italic">{e.artist}</p>}
                {e.description && <p className="text-[#a99c80] text-sm mt-3 leading-relaxed">{e.description}</p>}
                <div className="mt-6 pt-5 border-t border-[var(--line)]">
                  <Link href="/reservation" className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase hover:text-[var(--gold-soft)] transition-colors">
                    Rezervo Tavolinë →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-24">
          <SectionHeading
            eyebrow="Më shumë se eventet"
            title="Çfarë ofron Room"
            subtitle="Pa marrë parasysh çfarë po festoni, ne kemi vendin."
          />
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
            {[
              { t: "Live Music Nights", d: "Çdo të premte dhe shtunë me artistë lokalë dhe ndërkombëtarë." },
              { t: "Sport Screenings", d: "Champions League, Euro, derbi — atmosferë stadiumi." },
              { t: "Private Celebrations", d: "Ditëlindje, përvjetorë, festime profesionale." },
              { t: "Seasonal Events", d: "Vit i Ri, ditët kombëtare, festa speciale." },
            ].map((s, i) => (
              <div key={i} className="bg-[var(--bg)] p-8">
                <h4 className="font-display text-xl text-gradient-gold">{s.t}</h4>
                <p className="mt-3 text-[#a99c80] text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
