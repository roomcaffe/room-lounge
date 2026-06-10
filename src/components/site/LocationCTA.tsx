import { MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

export function LocationCTA() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-[var(--bg-soft)] border-t border-[var(--line)] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-50" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        <div className="flex flex-col justify-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            — Vizito Ne
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-[#f5ede0]">
            Te ne, gjithmonë <span className="italic text-gradient-gold">të mirëpritur</span>.
          </h2>
          <p className="mt-6 text-[#cbbfa6] leading-relaxed max-w-lg">
            Lipjan, Kosovë. Hap çdo ditë nga mëngjesi deri vonë në natë.
            Rezervo tavolinën tuaj online ose thirrëna direkt.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">Adresa</div>
                <div className="text-[#f5ede0] mt-1">Lipjan, Kosovë</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">Orari</div>
                <div className="text-[#f5ede0] mt-1">E Hënë – E Diel · 07:00 – 24:00</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">Telefoni</div>
                <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`} className="text-[#f5ede0] mt-1 block hover:text-[var(--gold)]">
                  {process.env.NEXT_PUBLIC_BUSINESS_PHONE}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/reservation" className="btn-gold">Rezervo Tash</Link>
            <Link href="/contact" className="btn-outline">Kontakti</Link>
          </div>
        </div>

        <div className="relative min-h-[400px] border border-[var(--line)] overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Lipjan%20Kosovo&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
