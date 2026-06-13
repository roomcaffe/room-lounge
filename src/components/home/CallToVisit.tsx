"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export function CallToVisit() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-ember-glow opacity-80 pointer-events-none" />
      <div className="container-edge relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden border border-[color:var(--line-strong)] bg-noise"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--obsidian-card)] via-[color:var(--obsidian)] to-[color:var(--obsidian-card)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(217,121,66,0.25),transparent_50%)]" />

          <div className="relative p-6 md:p-12 lg:p-20 grid lg:grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-eyebrow">Bëje natën të jotën</span>
              <h2 className="text-display-lg mt-4 text-balance leading-[0.95]">
                Tavolina <em className="text-gradient-ember">të pret</em>.
                <br />
                Shihemi në Lipjan.
              </h2>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-[color:var(--cream-soft)]/70 text-pretty max-w-md">
                Rezervo në më pak se një minutë. Konfirmim me WhatsApp, pa
                stres, pa pritje.
              </p>
              <div className="mt-6 md:mt-10 flex flex-wrap gap-3">
                <Link href="/reserve" className="btn-primary">
                  Rezervo Tavolinën <ArrowUpRight size={16} />
                </Link>
                <Link href="/visit" className="btn-ghost">
                  <MapPin size={14} /> Si të mbërrish
                </Link>
              </div>
            </div>

            {/* Big "R" decoration */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative">
                <span
                  className="font-display text-[clamp(12rem,30vw,24rem)] leading-none text-[color:var(--ember)]/10 select-none pointer-events-none"
                  style={{ fontWeight: 300 }}
                >
                  R
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-strong rounded-full px-6 py-3 inline-flex items-center gap-3">
                    <span className="live-dot" />
                    <span className="text-eyebrow !text-[color:var(--cream)]">
                      Lipjan · Kosovë
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
