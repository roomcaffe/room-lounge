"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LiveVibe } from "./LiveVibe";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-noise">
      {/* 3D scene */}
      {mounted && <HeroScene />}

      {/* Gradient veil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--obsidian)_85%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--obsidian)]/40 via-transparent to-[color:var(--obsidian)] z-10 pointer-events-none" />

      {/* Top live vibe */}
      <div className="absolute top-24 right-6 md:right-10 z-30">
        <LiveVibe />
      </div>

      {/* Hero content */}
      <div className="relative z-20 container-edge h-full flex flex-col justify-end pb-28 md:pb-32">
        <span
          className="text-eyebrow mb-6 opacity-0"
          style={{
            animation: "fadeUp 1s var(--ease-expo) 0.2s forwards",
          }}
        >
          Lipjan · Est. 2007 · 18 vite
        </span>

        <h1
          className="text-display-xl text-balance opacity-0"
          style={{
            animation: "fadeUp 1.2s var(--ease-expo) 0.4s forwards",
          }}
        >
          Më shumë se<br />
          një <em className="font-display italic text-gradient-ember">kafene</em>.
        </h1>

        <p
          className="mt-6 max-w-md text-lg text-[color:var(--cream-soft)]/70 text-pretty opacity-0"
          style={{
            animation: "fadeUp 1.2s var(--ease-expo) 0.7s forwards",
          }}
        >
          Pikë takimi për gjenerata. Coffee, cocktails, live music dhe netë që
          nuk harrohen — në zemër të Lipjanit.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4 opacity-0"
          style={{
            animation: "fadeUp 1.2s var(--ease-expo) 0.9s forwards",
          }}
        >
          <Link href="/reserve" className="btn-primary">
            Rezervo Tavolinën <ArrowUpRight size={16} />
          </Link>
          <Link href="/story" className="btn-ghost">
            Historia jonë
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-0"
        style={{ animation: "fadeIn 1s var(--ease-expo) 1.4s forwards" }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[color:var(--cream-soft)]/40">
          Scroll
        </span>
        <ArrowDown
          size={14}
          className="text-[color:var(--ember)] animate-pulse-soft"
        />
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
