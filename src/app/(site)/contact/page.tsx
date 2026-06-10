import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/Social";

export const metadata = { title: "Kontakti" };

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">— Na Kontakto</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Kontakti
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-2xl mx-auto">
            Na gjeni në Lipjan, ose na thirrni — jemi këtu çdo ditë.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { i: <MapPin size={18} />, t: "Adresa", v: "Lipjan, Kosovë" },
              { i: <Clock size={18} />, t: "Orari", v: "E Hënë – E Diel · 07:00 – 24:00" },
              { i: <Phone size={18} />, t: "Telefoni", v: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+383 44 000 000" },
              { i: <Mail size={18} />, t: "Email", v: "info@roomloungecafe.com" },
            ].map((c, i) => (
              <div key={i} className="card-luxe p-7 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--gold)] shrink-0">
                  {c.i}
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">{c.t}</div>
                  <div className="text-[#f5ede0] mt-1 text-lg">{c.v}</div>
                </div>
              </div>
            ))}

            <div className="card-luxe p-7">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)] mb-4">Social</div>
              <div className="flex gap-3">
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM || "#"} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all">
                  <InstagramIcon size={18} />
                </a>
                <a href={process.env.NEXT_PUBLIC_FACEBOOK || "#"} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all">
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[500px] border border-[var(--line)] overflow-hidden">
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
    </>
  );
}
