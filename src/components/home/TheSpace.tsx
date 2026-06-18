"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

/**
 * The Space — cinematic interior tour
 * Driven by the actual interior renders. Each row is a "scene".
 */

type Scene = {
  num: string;
  src: string;
  eyebrow: string;
  title: string;
  text: string;
  keynotes: string[];
};

const SCENES: Scene[] = [
  {
    num: "I",
    src: "/renders/render-3.jpg",
    eyebrow: "The Main Hall",
    title: "Brass arches, marble bar.",
    text: "Një vault prej brass-i sjell rrjedhën e dritës mbi mermerin e barit. Çdo cep është mendimisht orkestruar — një hyrje që ndalon kohën.",
    keynotes: ["Brass vault", "Carrara marble", "Crystal cascade"],
  },
  {
    num: "II",
    src: "/renders/render-2.jpg",
    eyebrow: "The Lounge",
    title: "Banquette jeshil. Floral. Intim.",
    text: "Kadife jeshil, kushinete florale, tavolina të vogla mermeri. Vendi ku bisedat zgjasin më shumë sesa duhet — dhe ti je i lumtur që zgjatën.",
    keynotes: ["Velvet green", "Botanical print", "Candlelit"],
  },
  {
    num: "III",
    src: "/renders/render-5.jpg",
    eyebrow: "Amber Glow",
    title: "Glassblock dhe shandelier.",
    text: "Kolona prej qelqi ambër që ndizen si fanarë në mbrëmje. Drita e kërcen mes brass-it dhe oxblood-it — kjo është ora kur lounge-i merr frymë thellë.",
    keynotes: ["Amber glassblock", "Tufted oxblood", "Brass column grid"],
  },
  {
    num: "IV",
    src: "/renders/render-8.jpg",
    eyebrow: "The Terrace",
    title: "Qielli i Lipjanit. Hapur.",
    text: "Lart, mbi qytet, terasa hapet me dritëza bistro dhe një pamje që na kujton pse fillimisht hapëm derën. Verës këtu nuk fle askush.",
    keynotes: ["Open air", "Bistro lights", "Summer nights"],
  },
];

function SceneRow({ scene, index }: { scene: Scene; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.4, 1, 1, 0.4]
  );
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const flipped = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative grid lg:grid-cols-12 gap-8 lg:gap-10 items-center py-14 lg:py-24"
    >
      {/* Image */}
      <div
        className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""} relative`}
      >
        <div className="deco-frame relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-sm">
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <Image
              src={scene.src}
              alt={scene.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={86}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          {/* Tonal overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,7,5,0.55)_100%)] pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--line-strong)] pointer-events-none" />
        </div>

        {/* Roman numeral floating */}
        <div
          className={`absolute -top-6 ${
            flipped ? "right-2 lg:right-4" : "left-2 lg:left-4"
          } font-display italic text-[clamp(3.5rem,8vw,7rem)] leading-none text-[color:var(--brass)]/30 pointer-events-none select-none`}
        >
          {scene.num}
        </div>
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
        <span className="text-eyebrow">{scene.eyebrow}</span>
        <h3 className="text-display-md mt-3 text-balance">
          {scene.title}
        </h3>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          {scene.text}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {scene.keynotes.map((k) => (
            <li
              key={k}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-[color:var(--brass-soft)] border border-[color:var(--brass)]/30 rounded-full"
            >
              {k}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function TheSpace() {
  return (
    <section className="relative section overflow-hidden bg-[color:var(--obsidian-soft)]">
      <div className="absolute inset-0 bg-brass-glow opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 brass-divider" />

      <div className="container-edge relative">
        {/* Section header */}
        <div className="max-w-2xl mb-10 md:mb-16">
          <span className="text-eyebrow">The Space</span>
          <h2 className="text-display-lg mt-2 md:mt-3 text-balance">
            Hapësira{" "}
            <em className="font-display italic brass-shimmer">flet</em> para se ti
            të porositësh.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[color:var(--cream-soft)]/70 max-w-xl text-pretty">
            Brass i thellë, mermer Carrara, kadife jeshil, oxblood të tufted, dhe
            shandelier kristali. Çdo material i përzgjedhur për të mbajtur
            dritën — dhe ty — më gjatë.
          </p>
        </div>

        <div>
          {SCENES.map((s, i) => (
            <SceneRow key={s.num} scene={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-14 flex flex-wrap gap-3 items-center">
          <Link href="/gallery" className="btn-primary">
            Hap galerinë <ArrowUpRight size={16} />
          </Link>
          <Link href="/reserve" className="btn-ghost">
            Rezervo një tavolinë
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 brass-divider" />
    </section>
  );
}
