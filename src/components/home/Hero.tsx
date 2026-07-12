"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LiveVibe } from "./LiveVibe";

/**
 * Hero V3 — "Deco Speakeasy"
 * Cinematic full-bleed render carousel with parallax, ken-burns motion,
 * and brass deco framing. Photography drives the mood.
 */

const HERO_FRAMES = [
  {
    src: "/renders/render-3.jpg",
    eyebrow: "The Main Hall",
    caption: "Brass arches · Crystal chandeliers · Marble bar",
    focal: "50% 50%",
  },
  {
    src: "/renders/render-5.jpg",
    eyebrow: "The Glow",
    caption: "Amber glassblock · Velvet banquettes · Live nights",
    focal: "55% 45%",
  },
  {
    src: "/renders/render-1.jpg",
    eyebrow: "The Lounge",
    caption: "Cocktail tables under cascading light",
    focal: "50% 55%",
  },
  {
    src: "/renders/render-4.jpg",
    eyebrow: "The Bar",
    caption: "Backlit columns · Tufted oxblood · Pour & repeat",
    focal: "50% 50%",
  },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_FRAMES.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const active = HERO_FRAMES[idx];

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Image stack — cross-fading with ken-burns */}
      <div className="absolute inset-0">
        {HERO_FRAMES.map((f, i) => (
          <div
            key={f.src}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 animate-ken-burns"
              style={{ filter: "saturate(1.08) contrast(1.05)" }}
            >
              <Image
                src={f.src}
                alt={f.caption}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={95}
                style={{ objectFit: "cover", objectPosition: f.focal }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Soft film grain (lighter than global bg-noise) */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Tonal grading veils — lighter for clearer photography */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(180deg,rgba(10,7,5,0.42)_0%,rgba(10,7,5,0.08)_38%,rgba(10,7,5,0.46)_78%,var(--obsidian)_100%)]" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_70%_30%,rgba(198,155,84,0.12)_0%,transparent_55%)]" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_15%_85%,rgba(107,31,36,0.18)_0%,transparent_50%)]" />
      {/* Soft scrim only under the text block (left side, bottom) so copy stays readable on bright frames */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(90deg,rgba(10,7,5,0.68)_0%,rgba(10,7,5,0.26)_48%,rgba(10,7,5,0.04)_82%,transparent_100%)]" />

      {/* Subtle brass grille at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1 z-20 brass-divider opacity-80" />

      {/* Top live vibe */}
      <div className="absolute top-[5rem] md:top-24 inset-x-4 md:inset-x-auto md:right-10 z-30 flex justify-center md:justify-end pointer-events-none">
        <div className="pointer-events-auto max-w-full">
          <LiveVibe />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-20 container-edge min-h-[100svh] flex flex-col justify-end pt-44 md:pt-40 pb-24 md:pb-28">
        <span
          className="text-eyebrow mb-6 opacity-0"
          style={{ animation: "fadeUp 1s var(--ease-expo) 0.2s forwards" }}
        >
          Lipjan · Est. 2007 · 19 vite
        </span>

        <h1
          className="text-display-xl text-balance opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-expo) 0.4s forwards" }}
        >
          Hyr në një{" "}
          <em className="font-display italic brass-shimmer">orë</em><br />
          që nuk e harron.
        </h1>

        <p
          className="mt-5 md:mt-6 max-w-lg text-base md:text-lg text-[color:var(--cream-soft)]/86 text-pretty opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-expo) 0.7s forwards" }}
        >
          Speakeasy lounge në zemër të Lipjanit. Brass, mermer, kadife —
          dhe netë që janë treguar 19 vite me radhë.
        </p>

        <div
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-expo) 0.9s forwards" }}
        >
          <Link href="/reserve" className="btn-primary">
            Rezervo Tavolinën <ArrowUpRight size={16} />
          </Link>
          <Link href="/gallery" className="btn-ghost">
            Shiko hapësirën
          </Link>
        </div>

        {/* Bottom slide indicator + caption */}
        <div className="mt-12 hidden md:flex items-end justify-between gap-6">
          <div
            key={active.src}
            className="opacity-0"
            style={{ animation: "fadeUp 0.8s var(--ease-expo) 0.1s forwards" }}
          >
            <div className="text-eyebrow opacity-80">{active.eyebrow}</div>
            <div className="mt-1 text-sm text-[color:var(--cream-soft)]/65">
              {active.caption}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {HERO_FRAMES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Frame ${i + 1}`}
                className="group relative h-[3px] w-10 overflow-hidden rounded-full bg-[color:var(--line-strong)]"
              >
                <span
                  className="absolute inset-0 origin-left bg-[color:var(--brass)] transition-transform duration-500"
                  style={{
                    transform: `scaleX(${i === idx ? 1 : 0})`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3 opacity-0"
        style={{ animation: "fadeIn 1s var(--ease-expo) 1.4s forwards" }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[color:var(--cream-soft)]/40">
          Scroll
        </span>
        <ArrowDown size={14} className="text-[color:var(--brass)] animate-pulse-soft" />
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </section>
  );
}
