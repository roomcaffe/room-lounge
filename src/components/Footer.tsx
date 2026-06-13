import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./icons/Social";

const socialLinks = [
  { href: process.env.NEXT_PUBLIC_INSTAGRAM || "#", label: "Instagram", Icon: InstagramIcon },
  { href: process.env.NEXT_PUBLIC_FACEBOOK || "#", label: "Facebook", Icon: FacebookIcon },
  { href: process.env.NEXT_PUBLIC_TIKTOK || "#", label: "TikTok", Icon: TikTokIcon },
];

const navColumns = [
  {
    title: "Eksploro",
    links: [
      { href: "/", label: "Home" },
      { href: "/menu", label: "Menu" },
      { href: "/events", label: "Events" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Vizito",
    links: [
      { href: "/story", label: "Story" },
      { href: "/visit", label: "Visit" },
      { href: "/reserve", label: "Rezervo" },
      { href: "/admin/login", label: "Admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--line)] bg-[color:var(--obsidian-soft)] overflow-hidden">
      <div className="absolute inset-0 bg-ember-glow pointer-events-none opacity-60" />

      <div className="container-edge relative">
        {/* Big wordmark */}
        <div className="pt-20 pb-16">
          <h2 className="text-display-xl text-gradient leading-none mask-fade-bottom">
            Room
            <span className="block text-[color:var(--cream-soft)]/30">Lounge</span>
          </h2>
          <p className="mt-6 text-[color:var(--cream-soft)]/60 max-w-md text-pretty">
            Mbi 18 vite në Lipjan. Vendi ku gjeneratat takohen, miqësitë lindin
            dhe momentet bëhen kujtime.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16">
          {/* CTA card */}
          <div className="lg:col-span-5">
            <div className="glass rounded-3xl p-8">
              <span className="text-eyebrow">Rezervo</span>
              <h3 className="font-display text-3xl mt-3 leading-tight">
                Tavolina jote të pret.
              </h3>
              <p className="mt-3 text-sm text-[color:var(--cream-soft)]/60">
                Zgjedh datën, orën, dhe tavolinën. Konfirmim me WhatsApp brenda
                pak minutash.
              </p>
              <Link
                href="/reserve"
                className="btn-primary mt-6 !py-3"
              >
                Rezervo tani <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-eyebrow mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[color:var(--cream-soft)]/70 hover:text-[color:var(--cream)] transition-colors text-sm"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-eyebrow mb-5">Kontakti</h4>
            <ul className="space-y-3 text-sm text-[color:var(--cream-soft)]/80">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[color:var(--ember)] mt-1 shrink-0" />
                <span>Lipjan, Kosovë</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[color:var(--ember)] mt-1 shrink-0" />
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || ""}`}
                  className="hover:text-[color:var(--cream)] transition-colors"
                >
                  {process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+383 …"}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[color:var(--ember)] mt-1 shrink-0" />
                <a
                  href="mailto:info@roomcaffe.com"
                  className="hover:text-[color:var(--cream)] transition-colors"
                >
                  info@roomcaffe.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-[color:var(--cream-soft)] hover:bg-[color:var(--ember)] hover:text-[color:var(--obsidian)] hover:border-[color:var(--ember)] transition-all duration-500"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[color:var(--line)] py-6 flex flex-col md:flex-row gap-3 justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-[color:var(--cream-soft)]/40">
          <p>© {new Date().getFullYear()} Room Lounge · Të gjitha të drejtat</p>
          <p>Handcrafted in Lipjan · Kosovë</p>
        </div>
      </div>
    </footer>
  );
}
