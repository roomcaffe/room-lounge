"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Music, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  artist: string | null;
  date: string;
  time: string;
  coverImage: string | null;
  description: string | null;
};

function Countdown({ date, time }: { date: string; time: string }) {
  const [diff, setDiff] = useState<{
    d: number;
    h: number;
    m: number;
  } | null>(null);

  useEffect(() => {
    const compute = () => {
      const [hh, mm] = time.split(":").map(Number);
      const target = new Date(date);
      target.setHours(hh, mm, 0, 0);
      const now = Date.now();
      const ms = target.getTime() - now;
      if (ms <= 0) {
        setDiff(null);
        return;
      }
      const totalMin = Math.floor(ms / 60000);
      const d = Math.floor(totalMin / (60 * 24));
      const h = Math.floor((totalMin / 60) % 24);
      const m = totalMin % 60;
      setDiff({ d, h, m });
    };
    compute();
    const id = setInterval(compute, 30000);
    return () => clearInterval(id);
  }, [date, time]);

  if (!diff) return null;
  return (
    <div className="font-mono text-xs uppercase tracking-wider text-[color:var(--ember)] flex gap-3">
      {diff.d > 0 && <span>{diff.d}d</span>}
      <span>{diff.h.toString().padStart(2, "0")}h</span>
      <span>{diff.m.toString().padStart(2, "0")}m</span>
    </div>
  );
}

export function EventsView({ events }: { events: Event[] }) {
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="container-edge py-32">
      <header className="mb-16 max-w-3xl">
        <span className="text-eyebrow">Events</span>
        <h1 className="text-display-lg mt-3 text-balance">
          Netë që <em className="text-gradient-ember">nuk harrohen</em>.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          Live music çdo të premte. DJ nights të shtunën. Match days. Festime private.
        </p>
      </header>

      {upcoming.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center">
          <Sparkles size={32} className="mx-auto text-[color:var(--ember)] mb-4" />
          <h3 className="font-display text-2xl mb-2">Eventet po vijnë</h3>
          <p className="text-[color:var(--cream-soft)]/60 max-w-md mx-auto">
            Ndiqi @roomcaffe në Instagram për lajme në kohë reale për live nights, DJ sets dhe ngjarje speciale.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((ev, i) => {
            const d = new Date(ev.date);
            return (
              <motion.article
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-3xl overflow-hidden border border-[color:var(--line)] hover:border-[color:var(--ember)] transition-colors duration-500"
              >
                <div className="relative grid md:grid-cols-12 gap-4 md:gap-6 p-5 md:p-8">
                  {/* Date column */}
                  <div className="md:col-span-2">
                    <div className="glass-strong rounded-2xl p-3 md:p-4 text-center inline-flex flex-col items-center">
                      <span className="text-eyebrow !text-[color:var(--ember)]">
                        {d.toLocaleString("sq-AL", { month: "short" })}
                      </span>
                      <span className="font-display text-5xl leading-none mt-1">
                        {d.getDate()}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider mt-2 opacity-60">
                        {d.toLocaleString("sq-AL", { weekday: "short" })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7">
                    <h3 className="font-display text-2xl md:text-4xl leading-tight text-balance group-hover:text-[color:var(--cream)] transition-colors">
                      {ev.title}
                    </h3>
                    {ev.artist && (
                      <p className="mt-2 text-sm text-[color:var(--cream-soft)]/70 flex items-center gap-2">
                        <Music size={14} className="text-[color:var(--ember)]" />
                        {ev.artist}
                      </p>
                    )}
                    {ev.description && (
                      <p className="mt-3 text-[color:var(--cream-soft)]/60 text-pretty line-clamp-2">
                        {ev.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-2 text-[color:var(--cream-soft)]/70">
                        <Clock size={14} className="text-[color:var(--ember)]" /> {ev.time}
                      </span>
                      <Countdown date={ev.date} time={ev.time} />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-3 flex md:justify-end md:items-center">
                    <Link href="/reserve" className="btn-primary !text-xs !py-2.5 !px-5 !min-h-0">
                      Rezervo <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(217,121,66,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-32">
          <h2 className="text-display-md mb-8 text-[color:var(--cream-soft)]/40">
            Past nights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {past.slice(0, 6).map((ev) => {
              const d = new Date(ev.date);
              return (
                <div
                  key={ev.id}
                  className="glass rounded-2xl p-5 opacity-60"
                >
                  <div className="text-eyebrow">
                    {d.toLocaleDateString("sq-AL", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                  <h3 className="font-display text-xl mt-2">{ev.title}</h3>
                  {ev.artist && (
                    <p className="text-xs text-[color:var(--cream-soft)]/60 mt-1">
                      {ev.artist}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
