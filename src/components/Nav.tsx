"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(150%)" : "blur(8px)",
          background: scrolled
            ? "linear-gradient(180deg, rgba(10,7,5,0.92), rgba(10,7,5,0.78))"
            : "linear-gradient(180deg, rgba(10,7,5,0.38), rgba(10,7,5,0.08))",
          borderBottom: scrolled
            ? "1px solid rgba(244,234,216,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="container-edge flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3 magnet">
            <div className="relative w-9 h-9 rounded-full border border-[color:var(--brass)]/40 bg-[radial-gradient(circle_at_30%_30%,rgba(212,174,107,0.28),rgba(28,22,18,0.6))] flex items-center justify-center overflow-hidden shrink-0">
              <span className="font-display italic text-lg leading-none brass-shimmer" style={{ fontWeight: 500 }}>
                R
              </span>
              <span className="absolute inset-0 ring-1 ring-inset ring-[color:var(--brass)]/40 rounded-full pointer-events-none" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base md:text-lg tracking-tight">Room</span>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[color:var(--cream-soft)]/60 mt-0.5 hidden sm:block">
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
                    <span className="absolute left-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-[color:var(--brass)] -translate-x-1/2" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/reserve"
              className="btn-primary !py-2 !px-3.5 md:!py-2.5 md:!px-5 !text-[10px] md:!text-xs !min-h-0 !tracking-[0.08em] md:!tracking-[0.12em] !shadow-[0_8px_24px_-14px_rgba(198,155,84,0.7)]"
            >
              Rezervo
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 -mr-2 text-[color:var(--cream)]"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          open
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-[color:var(--obsidian)]"
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative h-full max-h-[100svh] flex flex-col justify-between p-6 md:p-8 transition-transform duration-700 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
          style={{
            paddingTop: "calc(1.25rem + env(safe-area-inset-top))",
            paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">Room</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 -mr-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-0 my-6">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-4 py-2.5 border-b border-[color:var(--line)]"
                style={{
                  transitionDelay: `${open ? i * 40 : 0}ms`,
                }}
              >
                <span className="font-mono text-xs text-[color:var(--brass)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl group-hover:text-[color:var(--brass)] transition-colors">
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
