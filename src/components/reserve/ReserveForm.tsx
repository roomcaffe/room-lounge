"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Check, ArrowRight, ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { FloorPlan, FloorTable, TABLES } from "./FloorPlan";

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
  const [table, setTable] = useState<FloorTable | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [note, setNote] = useState("");
  const [eventNight, setEventNight] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(() => generateDays(14), []);

  const canNext = (() => {
    if (step === 0) return date && time;
    if (step === 1) return guests >= 1 && guests <= 20;
    if (step === 2) return table !== null;
    if (step === 3) return name.length > 1 && phone.length > 5;
    return false;
  })();

  async function submit() {
    if (!date || !time || !table) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          phone,
          whatsapp: whatsapp || phone,
          date: date.toISOString().slice(0, 10),
          time,
          guests,
          area: table.area,
          specialRequest: note,
          eventNight,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gabim në server");
      setDone({ id: data.id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gabim");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong rounded-3xl p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[color:var(--brass)]/15 border border-[color:var(--brass)] flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[color:var(--brass)]" />
        </div>
        <h3 className="text-display-md mb-3">Rezervimi u dërgua.</h3>
        <p className="text-[color:var(--cream-soft)]/70 max-w-md mx-auto text-pretty">
          Stafi ynë do ta konfirmojë në WhatsApp brenda pak minutash. Faleminderit që zgjodhët Room.
        </p>
        <div className="mt-8 text-xs font-mono text-[color:var(--cream-soft)]/40">
          Ref: #{done.id.slice(-8).toUpperCase()}
        </div>
      </motion.div>
    );
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
            <div className="space-y-6">
              <div>
                <h3 className="text-display-md mb-1 flex items-center gap-3">
                  <MapPin className="text-[color:var(--brass)]" size={28} />
                  Zgjedh tavolinën
                </h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">
                  Tap mbi tavolinat. Numri tregon kapacitetin.
                </p>
              </div>

              <FloorPlan
                selected={table?.id}
                onSelect={(t) => setTable(t)}
                guests={guests}
              />

              {table && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-eyebrow !text-[color:var(--brass)]">E zgjedhur</div>
                    <div className="font-display text-xl md:text-2xl mt-1 truncate">
                      {table.name} · {table.area.toUpperCase()} · {table.capacity} pers.
                    </div>
                  </div>
                  <Sparkles className="text-[color:var(--brass)] shrink-0" />
                </motion.div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-display-md mb-1">Të dhënat e tua</h3>
                <p className="text-sm text-[color:var(--cream-soft)]/60">
                  Konfirmim me WhatsApp brenda pak minutash.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-eyebrow block mb-2">Emri</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Emri i plotë"
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-eyebrow block mb-2">Telefoni</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (!whatsapp) setWhatsapp(e.target.value);
                    }}
                    placeholder="+383 ..."
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-eyebrow block mb-2">WhatsApp (opsional)</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Nëse ndryshe nga telefoni"
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-eyebrow block mb-2">Kërkesë speciale</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Birthday cake, alergji, etj. (opsional)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[color:var(--brass)] transition-colors resize-none"
                  />
                </div>
                <label className="md:col-span-2 flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventNight}
                    onChange={(e) => setEventNight(e.target.checked)}
                    className="w-5 h-5 accent-[color:var(--brass)]"
                  />
                  <span className="text-sm">Po vij për event live (live music / DJ night)</span>
                </label>
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
                  <div className="text-eyebrow">Tavolina</div>
                  <div className="mt-1">{table?.name}</div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300 text-sm">
                  {error}
                </div>
              )}
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
            disabled={!canNext || submitting}
            className="btn-primary !px-5 !py-2.5 md:!px-7 md:!py-3 !text-[11px] md:!text-xs flex-1 max-w-[14rem] justify-center disabled:opacity-30 disabled:pointer-events-none"
          >
            {submitting ? "Po dërgohet..." : "Konfirmo"} <Check size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
