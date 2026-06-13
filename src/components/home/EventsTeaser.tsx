"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Music } from "lucide-react";

type Event = {
  id: string;
  title: string;
  artist?: string | null;
  date: string;
  time: string;
};

export function EventsTeaser({ events }: { events: Event[] }) {
  return (
    <section className="relative section bg-[color:var(--obsidian-soft)] overflow-hidden">
      <div className="absolute inset-0 bg-ember-glow pointer-events-none" />

      <div className="container-edge relative">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-xl">
            <span className="text-eyebrow">Çfarë po vjen</span>
            <h2 className="text-display-lg mt-3 text-balance">
              Netë që <em className="text-gradient-ember">do t'i mbash mend</em>.
            </h2>
          </div>
          <Link href="/events" className="btn-ghost">
            Të gjitha eventet <ArrowUpRight size={14} />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <Music size={32} className="mx-auto text-[color:var(--ember)] mb-4" />
            <p className="text-[color:var(--cream-soft)]/70">
              Eventet e ardhshme do shfaqen këtu së shpejti.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {events.slice(0, 3).map((ev, i) => {
              const d = new Date(ev.date);
              const day = d.getDate();
              const month = d.toLocaleString("sq-AL", { month: "short" });
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href="/events"
                    className="group relative block rounded-3xl overflow-hidden border border-[color:var(--line)] hover:border-[color:var(--ember)] transition-all duration-500 aspect-[4/5]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--obsidian-card)] to-[color:var(--obsidian)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,121,66,0.3),transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="glass rounded-2xl p-3 text-center min-w-[64px]">
                          <div className="font-display text-3xl leading-none">
                            {day}
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.2em] mt-1 text-[color:var(--ember)]">
                            {month}
                          </div>
                        </div>
                        <Calendar
                          size={16}
                          className="text-[color:var(--cream-soft)]/40 group-hover:text-[color:var(--ember)] transition-colors"
                        />
                      </div>

                      <div>
                        <h3 className="font-display text-2xl leading-tight mb-2 text-balance">
                          {ev.title}
                        </h3>
                        {ev.artist && (
                          <p className="text-sm text-[color:var(--cream-soft)]/70 flex items-center gap-2">
                            <Music size={12} className="text-[color:var(--ember)]" />
                            {ev.artist}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[color:var(--cream-soft)]/60">
                          <span>{ev.time}</span>
                          <ArrowUpRight
                            size={14}
                            className="text-[color:var(--ember)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
