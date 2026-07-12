"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Check, ArrowRight, ArrowLeft, MapPin, MessageCircle } from "lucide-react";

const ZONES = [
  { id: "brenda", label: "Brenda", desc: "Ambiente e brendshme, klimatizuar" },
  { id: "jashte", label: "Jashtë", desc: "Tarracë, ajër i pastër" },
] as const;

type ZoneId = (typeof ZONES)[number]["id"];

const TIMES = [
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const STEPS = ["Kur", "Sa", "Ku", "Ti"] as const;

function todayLocal() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

function generateDays(count = 14) {
  const days: Date[] = [];
  const start = todayLocal();
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export function ReserveForm() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState<ZoneId | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => generateDays(14), []);

  const canNext = (() => {
    if (step === 0) return date && time;
    if (step === 1) return guests >= 1 && guests <= 20;
    if (step === 2) return zone !== null;
    if (step === 3) return name.length > 1 && phone.length > 5;
    return false;
  })();

  function submit() {
    if (!date || !time || !zone || !name || !phone) return;
    
    const dateStr = date.toLocaleDateString("sq-AL", { weekday: "long", day: "numeric", month: "long" });
    const zoneLabel = ZONES.find(z => z.id === zone)?.label || zone;
    
    const message = `Përshëndetje! Dua të rezervoj:\n\n` +
      `📅 ${dateStr}\n` +
      `🕐 Ora ${time}\n` +
      `👥 ${guests} persona\n` +
      `📍 ${zoneLabel}\n\n` +
      `Emri: ${name}\n` +
      `Tel: ${phone}`;
    
    const waNumber = "38344123456"; // Room Lounge WhatsApp
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, "_blank");
  }

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between gap-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none min-w-0">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex items-center gap-2 md:gap-3 transition-opacity min-w-0 ${
                i > step ? "opacity-30" : "opacity-100"
              }`}
            >
              <span
                className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center font-mono text-[10px] md:text-xs transition-all ${
                  i === step
                    ? "bg-[color:var(--brass)] border-[color:var(--brass)] text-[color:var(--obsidian)]"
                    : i < step
                      ? "border-[color:var(--brass)] text-[color:var(--brass)]"
                      : "border-[color:var(--line-strong)] text-[color:var(--cream-soft)]/40"
                }`}
              >
                {i < step ? <Check size={14} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-eyebrow !text-[10px] md:!text-xs hidden sm:inline ${i === step ? "!text-[color:var(--cream)]" : ""}`}>
                {s}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4 h-px bg-[color:var(--line-strong)] min-w-2" />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-[400px]"
        >
          {step === 0 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-display-md mb-1 flex items-center gap-3">
                  <Calendar className="text-[color:var(--brass)]" size={28} />
                  Zgjedh datën
                </h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">14 ditët e ardhshme</p>
              </div>

              <div className="hscroll md:hscroll-none flex md:grid md:grid-cols-7 gap-2 -mx-4 px-4 md:mx-0 md:px-0 pb-2">
                {days.map((d) => {
                  const isSelected = date?.getTime() === d.getTime();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDate(d)}
                      className={`shrink-0 w-16 md:w-auto rounded-2xl p-3 text-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                          : "glass hover:bg-[color:var(--cream)]/8"
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                        {d.toLocaleDateString("sq-AL", { weekday: "short" })}
                      </div>
                      <div className="font-display text-2xl mt-1 leading-none">
                        {d.getDate()}
                      </div>
                      <div className="text-[10px] opacity-60 mt-1">
                        {d.toLocaleDateString("sq-AL", { month: "short" })}
                      </div>
                    </button>
                  );
                })}
              </div>

              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-display-md mb-4 flex items-center gap-3">
                    <Clock className="text-[color:var(--brass)]" size={26} />
                    Ora
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-full py-3 text-sm font-mono transition-all duration-300 ${
                          time === t
                            ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                            : "glass hover:bg-[color:var(--cream)]/8"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-10">
              <div className="text-center">
                <h3 className="text-display-md mb-1 flex items-center gap-3 justify-center">
                  <Users className="text-[color:var(--brass)]" size={28} />
                  Sa persona?
                </h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">Përfshirë ty</p>
              </div>

              <div className="flex items-center gap-4 sm:gap-8">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass flex items-center justify-center text-2xl font-display hover:bg-[color:var(--cream)]/10 transition-all"
                >
                  −
                </button>
                <div className="font-display text-7xl sm:text-8xl md:text-9xl font-display italic brass-shimmer leading-none w-24 sm:w-32 text-center tabular-nums">
                  {guests}
                </div>
                <button
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass flex items-center justify-center text-2xl font-display hover:bg-[color:var(--cream)]/10 transition-all"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[2, 4, 6, 8, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGuests(n)}
                    className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
                      guests === n
                        ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                        : "glass"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
              <div className="text-center">
                <h3 className="text-display-md mb-1 flex items-center gap-3 justify-center">
                  <MapPin className="text-[color:var(--brass)]" size={28} />
                  Ku dëshiron të ulesh?
                </h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">Zgjedh zonën</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                {ZONES.map((z) => {
                  const isSelected = zone === z.id;
                  return (
                    <button
                      key={z.id}
                      onClick={() => setZone(z.id)}
                      className={`relative rounded-2xl p-6 text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                          : "glass hover:bg-[color:var(--cream)]/8"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <Check size={20} />
                        </div>
                      )}
                      <div className="font-display text-2xl mb-2">{z.label}</div>
                      <div className={`text-sm ${isSelected ? "opacity-70" : "text-[color:var(--cream-soft)]/60"}`}>
                        {z.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-display-md mb-1">Të dhënat e tua</h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">
                  Konfirmim direkt në WhatsApp.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-eyebrow block mb-2">Emri</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Emri yt"
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-eyebrow block mb-2">Numri</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+383 ..."
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="glass-strong rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-eyebrow">Data</div>
                  <div className="mt-1">
                    {date?.toLocaleDateString("sq-AL", { day: "2-digit", month: "short" })}
                  </div>
                </div>
                <div>
                  <div className="text-eyebrow">Ora</div>
                  <div className="mt-1 font-mono">{time}</div>
                </div>
                <div>
                  <div className="text-eyebrow">Persona</div>
                  <div className="mt-1 font-mono">{guests}</div>
                </div>
                <div>
                  <div className="text-eyebrow">Zona</div>
                  <div className="mt-1">{ZONES.find(z => z.id === zone)?.label}</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[color:var(--line)]">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-ghost !px-4 !py-2.5 md:!px-6 md:!py-3 !text-[10px] md:!text-xs shrink-0 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft size={14} /> <span className="hidden xs:inline">Mbrapa</span>
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={!canNext}
            className="btn-primary !px-5 !py-2.5 md:!px-7 md:!py-3 !text-[11px] md:!text-xs flex-1 max-w-[12rem] justify-center disabled:opacity-30 disabled:pointer-events-none"
          >
            Vazhdo <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canNext}
            className="btn-primary !px-5 !py-2.5 md:!px-7 md:!py-3 !text-[11px] md:!text-xs flex-1 max-w-[14rem] justify-center disabled:opacity-30 disabled:pointer-events-none"
          >
            Dërgo në WhatsApp <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
