"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Emri i plotë i nevojshëm"),
  phone: z.string().min(6, "Numri i telefonit i nevojshëm"),
  whatsapp: z.string().min(6, "Numri WhatsApp i nevojshëm"),
  date: z.string().min(1, "Data e nevojshme"),
  time: z.string().min(1, "Ora e nevojshme"),
  guests: z.number().min(1).max(50),
  area: z.enum(["indoor", "outdoor", "vip", "stage"]),
  specialRequest: z.string().optional(),
  eventNight: z.boolean().optional(),
  agreement: z.literal(true, { message: "Ju lutem pranoni termat" }),
});

type FormData = z.infer<typeof schema>;

const TIMES = [
  "11:00","12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","19:30","20:00","20:30","21:00","21:30",
  "22:00","22:30","23:00",
];

const AREAS = [
  { value: "indoor", label: "Indoor — Brenda" },
  { value: "outdoor", label: "Outdoor — Jashtë" },
  { value: "vip", label: "VIP Lounge" },
  { value: "stage", label: "Pranë Skenës" },
];

export function ReservationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { area: "indoor", guests: 2 },
  });

  async function onSubmit(data: FormData) {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Diçka shkoi keq");
      }
      setStatus("success");
      reset();
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Gabim");
    }
  }

  if (status === "success") {
    return (
      <div className="card-luxe p-10 md:p-14 text-center">
        <div className="w-16 h-16 mx-auto rounded-full border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] mb-6">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="font-display text-3xl text-gradient-gold">Faleminderit!</h2>
        <div className="divider-gold" />
        <p className="text-[#cbbfa6] leading-relaxed max-w-lg mx-auto">
          Kërkesa juaj për rezervim është pranuar. Ekipi ynë do ta konfirmojë
          shpejt përmes WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline mt-8"
        >
          Bëj Rezervim Tjetër
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-luxe p-8 md:p-12 space-y-6"
    >
      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            Emri i Plotë
          </label>
          <input className="input-luxe" {...register("fullName")} placeholder="Emri Mbiemri" />
          {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            Numër Telefoni
          </label>
          <input className="input-luxe" {...register("phone")} placeholder="+383 44 ..." />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            WhatsApp (për konfirmim)
          </label>
          <input className="input-luxe" {...register("whatsapp")} placeholder="+383 44 ..." />
          {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp.message}</p>}
        </div>
      </div>

      <div className="h-px bg-[var(--line)]" />

      {/* Reservation details */}
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            Data
          </label>
          <input type="date" className="input-luxe" min={today} {...register("date")} />
          {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            Ora
          </label>
          <select className="input-luxe" {...register("time")}>
            <option value="">Zgjidh orën</option>
            {TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="text-xs text-red-400 mt-1">{errors.time.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
            Numri i Personave
          </label>
          <input type="number" min="1" max="50" className="input-luxe" {...register("guests", { valueAsNumber: true })} />
          {errors.guests && <p className="text-xs text-red-400 mt-1">{errors.guests.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
          Zona e Preferuar
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AREAS.map((a) => (
            <label key={a.value} className="relative cursor-pointer group">
              <input type="radio" value={a.value} {...register("area")} className="peer absolute opacity-0" />
              <div className="px-4 py-4 text-center text-sm border border-[var(--line)] peer-checked:border-[var(--gold)] peer-checked:bg-[rgba(201,168,106,0.08)] peer-checked:text-[var(--gold)] text-[#cbbfa6] transition-all">
                {a.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
          Kërkesa Speciale (opsionale)
        </label>
        <textarea
          rows={3}
          className="input-luxe resize-none"
          {...register("specialRequest")}
          placeholder="Ditëlindje, alergji ushqimore, preferenca tjera..."
        />
      </div>

      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" {...register("eventNight")} className="mt-1 accent-[var(--gold)]" />
          <span className="text-sm text-[#cbbfa6]">Po vij për event/live music — më rezervo afër skenës nëse mundet</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register("agreement")} className="mt-1 accent-[var(--gold)]" />
          <span className="text-sm text-[#cbbfa6]">
            Pranoj që Room Lounge Cafe të më kontaktojë në WhatsApp për të
            konfirmuar rezervimin. *
          </span>
        </label>
        {errors.agreement && <p className="text-xs text-red-400">{errors.agreement.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 border border-red-500/40 bg-red-500/10 text-red-300 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Duke dërguar..." : "Dërgo Kërkesën"}
        </button>
        <p className="text-xs text-[#7a705e] text-center mt-4 tracking-wide">
          Pas dërgimit do të konfirmohet brenda 30 minutash në WhatsApp.
        </p>
      </div>
    </form>
  );
}
