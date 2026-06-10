"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ballina" },
  { href: "/about", label: "Rreth Nesh" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Eventet" },
  { href: "/gallery", label: "Galeria" },
  { href: "/contact", label: "Kontakti" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(10,8,7,0.85)] backdrop-blur-xl border-b border-[var(--line)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                  pathname === l.href
                    ? "text-[var(--gold)]"
                    : "text-[#cbbfa6] hover:text-[var(--gold)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/reservation" className="hidden md:inline-flex btn-gold !py-3 !px-5 !text-[11px]">
              Rezervo Tavolinë
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-[var(--gold)] p-2"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-30 bg-[var(--bg)] transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 px-8 flex flex-col gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-3xl text-[var(--beige)] hover:text-[var(--gold)]"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/reservation" className="btn-gold mt-6 justify-center">
            Rezervo Tavolinë
          </Link>
          <div className="mt-6 text-[var(--gold-deep)] text-sm tracking-widest uppercase">
            Lipjan · Kosovë
          </div>
        </div>
      </div>
    </>
  );
}
