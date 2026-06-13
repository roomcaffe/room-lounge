"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const chapters = [
  {
    year: "2007",
    title: "Hapëm derën në Lipjan",
    body:
      "Nuk kishim ide se po fillonim diçka që do zgjaste 18+ vite. Donim vetëm një vend ku kafja ishte e mirë, drita ishte e ngrohtë, dhe miqtë ndalonin për një orë e ktheheshin për tri.",
    keyword: "Origjina",
  },
  {
    year: "2011",
    title: "U bëmë pikë takimi",
    body:
      "Lipjani filloi të na thoshte 'shihemi te Room'. Bizneset bëheshin këtu. Marrëveshjet mbylleshin këtu. Daljet e para e dasmat e mëdha — nisnin këtu.",
    keyword: "Komuniteti",
  },
  {
    year: "2016",
    title: "Lindi lounge-i",
    body:
      "Mbërriti cocktail-i i parë. Pastaj live music. Pastaj DJ në fundjavë. Nuk e harruam kafenë që na lindi — vetëm e zgjeruam orarin.",
    keyword: "Evolucioni",
  },
  {
    year: "2020",
    title: "Mbijetuam pandeminë",
    body:
      "Stafi nuk u largua. Klientët nuk harruan. Hapëm përsëri më të fortë, me veranda të zgjeruara dhe sistem ajrimi premium. Komuniteti na mbajti gjallë.",
    keyword: "Rezistenca",
  },
  {
    year: "2025",
    title: "18 vite. Akoma këtu.",
    body:
      "Gjenerata e parë e klientëve tani sjell fëmijët e tyre. Brezi i ri vjen për DJ nights. Diaspora kthehet veçanërisht për Room. Ne jemi këtu — për 18 vitet e ardhshme.",
    keyword: "Sot",
  },
];

const stats = [
  { value: "18+", label: "Vite në Lipjan" },
  { value: "1M+", label: "Kafe të servuara" },
  { value: "200+", label: "Live music nights" },
  { value: "∞", label: "Kujtime" },
];

function Chapter({ ch, i }: { ch: typeof chapters[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.15, 1, 1, 0.15]
  );
  const yearY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start py-16 md:py-24 lg:py-40 border-b border-[color:var(--line)]"
    >
      <motion.div
        style={{ y: yearY }}
        className="lg:col-span-5 lg:sticky lg:top-32"
      >
        <div className="chapter-num mb-2 md:mb-4">
          Chapter {String(i + 1).padStart(2, "0")}
        </div>
        <div className="font-display text-[clamp(4rem,16vw,10rem)] leading-[0.85] text-gradient-ember">
          {ch.year}
        </div>
      </motion.div>

      <div className="lg:col-span-7">
        <span className="text-eyebrow">{ch.keyword}</span>
        <h3 className="text-display-md mt-2 md:mt-3 mb-4 md:mb-6 text-balance">{ch.title}</h3>
        <p className="text-base md:text-lg text-[color:var(--cream-soft)]/70 text-pretty leading-relaxed max-w-xl">
          {ch.body}
        </p>
      </div>
    </motion.div>
  );
}

export function StoryView() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="container-edge pt-28 md:pt-32 pb-16 md:pb-20 relative">
        <div className="absolute inset-0 bg-gold-glow opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl">
          <span className="text-eyebrow">Story</span>
          <h1 className="text-display-xl mt-4 text-balance leading-[0.9]">
            18 vite.<br />
            Një vend. <em className="text-gradient-ember">Pa lëvizur.</em>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-xl text-[color:var(--cream-soft)]/70 text-pretty max-w-2xl">
            Disa e quajnë konsistencë. Ne i themi besnikëri ndaj qytetit që na zgjodhi.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-edge py-10 md:py-12 border-y border-[color:var(--line)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-4xl md:text-6xl text-gradient-ember leading-none">
                {s.value}
              </div>
              <div className="text-eyebrow mt-2 md:mt-3 !text-[color:var(--cream-soft)]/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="container-edge">
        {chapters.map((ch, i) => (
          <Chapter key={ch.year} ch={ch} i={i} />
        ))}
      </section>

      {/* CTA */}
      <section className="container-edge section">
        <div className="glass-strong rounded-3xl p-8 md:p-12 lg:p-16 text-center bg-noise">
          <span className="text-eyebrow">Ti je kapitulli i radhës</span>
          <h2 className="text-display-md mt-4 max-w-2xl mx-auto text-balance">
            Sjell historinë <em className="text-gradient-ember">tënde</em> në Room.
          </h2>
          <Link href="/reserve" className="btn-primary mt-8 inline-flex">
            Rezervo Tavolinën <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
