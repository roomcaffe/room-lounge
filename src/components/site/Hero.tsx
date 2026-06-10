"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-noise">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-radial-gold" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(201,168,106,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(58,36,25,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,106,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,106,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating gold orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.2),transparent_70%)] blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(143,115,68,0.18),transparent_70%)] blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--line-strong)] bg-[rgba(201,168,106,0.05)] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
              Lipjan · Kosovë · Që Nga 2007
            </span>
          </div>
        </div>

        <h1 className="fade-up-d1 mt-10 font-display text-[15vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] leading-[0.95] font-light tracking-tight">
          <span className="block text-gradient-gold italic">Room</span>
          <span className="block text-[#f5ede0] font-light text-[6vw] sm:text-[4vw] md:text-5xl lg:text-6xl tracking-[0.4em] uppercase mt-2">
            Lounge Cafe
          </span>
        </h1>

        <div className="divider-gold fade-up-d2" />

        <p className="fade-up-d2 max-w-2xl mx-auto text-[#cbbfa6] text-base md:text-lg leading-relaxed font-light">
          18 vite, mijëra kafe, miqësi që u krijuan rreth një tavoline.
          <br className="hidden md:block" />
          Vendi ku Lipjani takohet, festohet, dhe ndalon për një moment.
        </p>

        <div className="fade-up-d3 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/reservation" className="btn-gold glow">
            Rezervo Tavolinë
          </Link>
          <Link href="/events" className="btn-outline">
            Shiko Eventet
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--gold-deep)] animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase">Zbulo</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
