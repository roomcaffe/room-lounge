"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Social";
import Link from "next/link";

const hours = [
  { day: "E hënë", open: "08:00", close: "01:00" },
  { day: "E martë", open: "08:00", close: "01:00" },
  { day: "E mërkurë", open: "08:00", close: "01:00" },
  { day: "E enjte", open: "08:00", close: "01:00" },
  { day: "E premte", open: "08:00", close: "03:00" },
  { day: "E shtunë", open: "08:00", close: "03:00" },
  { day: "E diel", open: "08:00", close: "01:00" },
];

function getKosovoDay() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ks = new Date(utc + 2 * 3600000);
  // 0 = Sunday in JS, our list starts Monday
  const jsDay = ks.getDay();
  return (jsDay + 6) % 7;
}

export function VisitView() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(getKosovoDay());
  }, []);

  const wa = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "38344000000";
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+383 …";
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/roomcaffe";

  // Lipjan coords (approx)
  const lat = 42.5236;
  const lng = 21.1273;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Room+Lounge+Lipjan`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=Room+Lounge+Lipjan&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="container-edge py-32">
      <header className="mb-16 max-w-3xl">
        <span className="text-eyebrow">Visit</span>
        <h1 className="text-display-lg mt-3 text-balance">
          Shihemi në <em className="text-gradient-ember">Lipjan</em>.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          Në qendër të qytetit. 5 minuta nga sheshi kryesor. Parkim përreth.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-4 md:gap-6">
        {/* Map */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[5/4] md:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[600px] rounded-3xl overflow-hidden border border-[color:var(--line-strong)]">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full grayscale-[0.6] contrast-110"
              style={{ filter: "invert(0.92) hue-rotate(180deg) brightness(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay pin */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 glass-strong rounded-2xl px-3 md:px-4 py-2 md:py-3 inline-flex items-center gap-2.5 md:gap-3">
              <span className="live-dot" />
              <div className="leading-tight">
                <div className="text-xs font-mono uppercase tracking-[0.2em]">
                  Room Lounge
                </div>
                <div className="text-[10px] text-[color:var(--cream-soft)]/60 mt-0.5">
                  Lipjan · Kosovë
                </div>
              </div>
            </div>
            {/* Directions button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 btn-primary !text-xs !py-2.5 !px-4 !min-h-0"
            >
              Drejtime <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Address */}
          <div className="glass rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--ember)]/15 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[color:var(--ember)]" />
              </div>
              <div>
                <div className="text-eyebrow">Adresa</div>
                <p className="font-display text-2xl mt-1 leading-tight">
                  Lipjan, Kosovë
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-[color:var(--ember)] hover:gap-2 transition-all"
                >
                  Hap në Google Maps <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="glass rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--ember)]/15 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[color:var(--ember)]" />
              </div>
              <div className="flex-1">
                <div className="text-eyebrow">Telefoni</div>
                <a
                  href={`tel:${phone}`}
                  className="font-display text-2xl mt-1 block leading-tight hover:text-[color:var(--ember)] transition-colors"
                >
                  {phone}
                </a>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`tel:${phone}`}
                    className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-[color:var(--line-strong)] hover:border-[color:var(--ember)] transition-colors"
                  >
                    Telefono
                  </a>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-[color:var(--line-strong)] hover:border-[color:var(--ember)] transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="glass rounded-3xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--ember)]/15 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[color:var(--ember)]" />
              </div>
              <div>
                <div className="text-eyebrow">Orari</div>
                <p className="text-sm text-[color:var(--cream-soft)]/60 mt-1">
                  7 ditë në javë
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {hours.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between text-sm py-1.5 transition-colors ${
                    today === i
                      ? "text-[color:var(--ember)]"
                      : "text-[color:var(--cream-soft)]/70"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {today === i && <span className="live-dot scale-75" />}
                    {h.day}
                    {today === i && (
                      <span className="text-[10px] font-mono uppercase ml-1">sot</span>
                    )}
                  </span>
                  <span className="font-mono tabular-nums">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / email */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <a
              href={ig}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-3xl p-5 hover:bg-[color:var(--cream)]/5 transition-colors"
            >
              <span className="text-[color:var(--ember)] inline-flex"><InstagramIcon size={20} /></span>
              <div className="text-eyebrow mt-3">Instagram</div>
              <div className="text-sm mt-1">@roomcaffe</div>
            </a>
            <a
              href="mailto:info@roomcaffe.com"
              className="glass rounded-3xl p-5 hover:bg-[color:var(--cream)]/5 transition-colors"
            >
              <Mail className="text-[color:var(--ember)]" size={20} />
              <div className="text-eyebrow mt-3">Email</div>
              <div className="text-sm mt-1 break-all">info@roomcaffe.com</div>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link href="/reserve" className="btn-primary inline-flex">
          Rezervo para se të vish <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
