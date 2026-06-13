"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/story", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          background: scrolled ? "rgba(13,10,8,0.55)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(244,234,216,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="container-edge flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 magnet">
            <div className="relative w-9 h-9 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center overflow-hidden">
              <span className="font-display text-xl text-[color:var(--ember)] leading-none">
                R
              </span>
              <span className="absolute inset-0 bg-[color:var(--ember)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-lg tracking-tight">Room</span>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[color:var(--cream-soft)]/60 mt-0.5">
                Lounge · Lipjan
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-300 magnet ${
                    isActive
                      ? "text-[color:var(--cream)]"
                      : "text-[color:var(--cream-soft)]/60 hover:text-[color:var(--cream)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-[color:var(--ember)] -translate-x-1/2" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/reserve"
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs"
            >
              Rezervo
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-[color:var(--cream)]"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[color:var(--obsidian)] transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative h-full flex flex-col justify-between p-8 transition-transform duration-700 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">Room</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-4 py-3 border-b border-[color:var(--line)]"
                style={{
                  transitionDelay: `${open ? i * 40 : 0}ms`,
                }}
              >
                <span className="font-mono text-xs text-[color:var(--ember)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-4xl group-hover:text-[color:var(--ember)] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <Link href="/reserve" className="btn-primary w-full justify-center">
            Rezervo Tavolinën
          </Link>
        </div>
      </div>
    </>
  );
}
