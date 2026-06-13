"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "38344000000";
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
    "Përshëndetje Room Lounge, dua të rezervoj një tavolinë."
  )}`;

  return (
    <>
      {/* Floating WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className={`fixed bottom-6 right-6 z-40 group transition-all duration-500 ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-14 h-14 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform duration-500">
          <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse-soft" />
          <svg
            width="22"
            height="22"
            viewBox="0 0 32 32"
            fill="#25D366"
            className="relative"
          >
            <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.16 8.02L0 32l8.18-2.14C10.54 31.26 13.22 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.34c-2.5 0-4.96-.7-7.08-1.98l-.5-.3-5.18 1.36 1.38-5.06-.32-.52A13.3 13.3 0 0 1 2.66 16C2.66 8.62 8.62 2.66 16 2.66S29.34 8.62 29.34 16 23.38 29.34 16 29.34zm7.3-9.96c-.4-.2-2.36-1.16-2.72-1.3-.36-.14-.62-.2-.88.2-.26.4-1.02 1.3-1.26 1.56-.22.26-.46.3-.86.1-.4-.2-1.7-.62-3.24-2-1.2-1.06-2-2.38-2.24-2.78-.22-.4-.02-.6.18-.8.18-.18.4-.46.6-.7.2-.24.26-.4.4-.66.14-.26.06-.5-.04-.7-.1-.2-.88-2.12-1.2-2.9-.32-.76-.64-.66-.88-.68-.22-.02-.5-.02-.76-.02-.26 0-.7.1-1.06.5-.36.4-1.4 1.36-1.4 3.32 0 1.96 1.42 3.84 1.62 4.1.2.26 2.8 4.28 6.78 6 .94.4 1.68.64 2.26.82.94.3 1.8.26 2.48.16.76-.12 2.36-.96 2.7-1.9.34-.94.34-1.74.24-1.9-.1-.18-.36-.28-.76-.48z" />
          </svg>
        </div>
      </a>

      {/* Sticky mobile reservation */}
      <div
        className={`fixed bottom-0 inset-x-0 z-30 md:hidden p-4 pb-6 bg-gradient-to-t from-[color:var(--obsidian)] via-[color:var(--obsidian)]/95 to-transparent transition-all duration-500 ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/reserve" className="btn-primary w-full justify-center">
          Rezervo Tavolinën
        </Link>
      </div>
    </>
  );
}
