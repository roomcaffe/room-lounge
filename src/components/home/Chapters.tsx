"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const chapters = [
  {
    num: "01",
    title: "Hapëm derën në 2007",
    text: "Filluam si një coffee shop i thjeshtë. Pa stuhi. Vetëm kafe e mirë, miq, dhe një vendi që doje ta thirresh.",
    keyword: "Origjina",
  },
  {
    num: "02",
    title: "U bëmë pikë takimi",
    text: "Gjeneratat takoheshin këtu. Bizneset mbylleshin këtu. Festohej, qahej, dhe planifikohej e ardhmja — gjithçka mes një kafeje.",
    keyword: "Komuniteti",
  },
  {
    num: "03",
    title: "Evoluuam në lounge",
    text: "Cocktails. Live music. DJ nights. Pa harruar kurrë kafenë që na lindi.",
    keyword: "Evolucioni",
  },
  {
    num: "04",
    title: "18 vite më vonë",
    text: "Ende këtu. Ende ku po rritet gjenerata e re. Ende vendi ku Lipjani vjen për tu ndjerë në shtëpi.",
    keyword: "Sot",
  },
];

function Chapter({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.2, 1, 1, 0.2]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-10 items-end py-12 md:py-20 lg:py-32 ${
        index % 2 === 1 ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div className="lg:col-span-2 [direction:ltr]">
        <span className="chapter-num">Chapter {chapter.num}</span>
      </div>
      <div className="lg:col-span-6 [direction:ltr]">
        <h3 className="text-display-lg text-balance">{chapter.title}</h3>
      </div>
      <div className="lg:col-span-4 [direction:ltr]">
        <p className="text-base md:text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          {chapter.text}
        </p>
        <div className="mt-4 md:mt-6 inline-flex items-center gap-2 text-eyebrow">
          <span className="w-6 h-px bg-[color:var(--ember)]" />
          {chapter.keyword}
        </div>
      </div>
    </motion.div>
  );
}

export function Chapters() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gold-glow pointer-events-none opacity-50" />
      <div className="container-edge relative">
        <div className="max-w-2xl mb-12 md:mb-20">
          <span className="text-eyebrow">Story</span>
          <h2 className="text-display-lg mt-2 md:mt-3 text-balance">
            Një kafene. Katër epoka.
            <span className="text-gradient-ember"> Një bashkësi.</span>
          </h2>
        </div>

        <div className="divide-y divide-[color:var(--line)] lg:divide-y-0">
          {chapters.map((ch, i) => (
            <Chapter key={ch.num} chapter={ch} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
