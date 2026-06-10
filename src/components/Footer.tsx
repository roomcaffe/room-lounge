import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./icons/Social";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="absolute top-0 inset-x-0 h-px shimmer-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Logo size="lg" />
          <p className="mt-6 text-[#a99c80] max-w-md leading-relaxed">
            Mbi 18 vite në Lipjan. Vendi ku gjeneratat takohen, miqësitë lindin
            dhe momentet bëhen kujtime. Coffee, cocktails dhe live music çdo
            javë.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_TIKTOK || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all"
            >
              <TikTokIcon size={14} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">
            Navigim
          </h4>
          <ul className="space-y-3 text-[#cbbfa6]">
            <li><Link href="/about" className="hover:text-[var(--gold)]">Rreth Nesh</Link></li>
            <li><Link href="/menu" className="hover:text-[var(--gold)]">Menu</Link></li>
            <li><Link href="/events" className="hover:text-[var(--gold)]">Eventet</Link></li>
            <li><Link href="/gallery" className="hover:text-[var(--gold)]">Galeria</Link></li>
            <li><Link href="/reservation" className="hover:text-[var(--gold)]">Rezervim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">
            Kontakti
          </h4>
          <ul className="space-y-4 text-[#cbbfa6] text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--gold)] mt-0.5 shrink-0" />
              <span>Lipjan, Kosovë</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-[var(--gold)] mt-0.5 shrink-0" />
              <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`} className="hover:text-[var(--gold)]">
                {process.env.NEXT_PUBLIC_BUSINESS_PHONE}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-[var(--gold)] mt-0.5 shrink-0" />
              <a href="mailto:info@roomloungecafe.com" className="hover:text-[var(--gold)]">
                info@roomloungecafe.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-6 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-3 text-xs text-[#7a705e] tracking-widest">
          <p>© {new Date().getFullYear()} ROOM LOUNGE CAFE · ALL RIGHTS RESERVED</p>
          <p>HANDCRAFTED IN LIPJAN · KOSOVË</p>
        </div>
      </div>
    </footer>
  );
}
