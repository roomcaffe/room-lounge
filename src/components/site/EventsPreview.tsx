import { SectionHeading } from "./SectionHeading";
import Link from "next/link";
import { Calendar, Music } from "lucide-react";

const events = [
  {
    title: "Saturday Live Sessions",
    artist: "Roli & Band",
    date: "E Shtunë · 22:00",
    img: "linear-gradient(135deg, #3a2419 0%, #8f7344 100%)",
  },
  {
    title: "Acoustic Nights",
    artist: "Edita Krasniqi",
    date: "E Premte · 21:30",
    img: "linear-gradient(135deg, #1a1614 0%, #c9a86a 100%)",
  },
  {
    title: "DJ Sunset Lounge",
    artist: "DJ Aksi",
    date: "E Diel · 20:00",
    img: "linear-gradient(135deg, #141110 0%, #d4b87e 100%)",
  },
];

export function EventsPreview() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-[var(--bg-soft)] border-y border-[var(--line)] relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Live & Events"
          title="Net që mbahen mend"
          subtitle="Çdo javë, skena e Room mban muzikë live nga më të mirët e Lipjanit dhe më gjerë."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <Link
              key={i}
              href="/events"
              className="card-luxe group cursor-pointer block"
            >
              <div
                className="aspect-[4/5] relative overflow-hidden"
                style={{ background: e.img }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Music size={120} className="text-[var(--gold)]" />
                </div>
                <div className="absolute top-6 left-6 px-3 py-1 bg-[rgba(10,8,7,0.7)] backdrop-blur-sm border border-[var(--line-strong)] text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                  Live
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[var(--gold-deep)] text-xs uppercase tracking-widest mb-3">
                  <Calendar size={12} /> {e.date}
                </div>
                <h3 className="font-display text-2xl text-[#f5ede0] group-hover:text-[var(--gold)] transition-colors">
                  {e.title}
                </h3>
                <p className="text-[#a99c80] text-sm mt-2">{e.artist}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/events" className="btn-gold">
            Të Gjitha Eventet
          </Link>
        </div>
      </div>
    </section>
  );
}
