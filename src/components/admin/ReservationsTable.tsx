"use client";

import { useState, useMemo } from "react";
import { Reservation } from "@prisma/client";
import {
  Check,
  X,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  MapPin,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  StickyNote,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { buildConfirmedMessage, buildRejectedMessage, buildWhatsAppLink } from "@/lib/whatsapp";

type Status = "all" | "pending" | "confirmed" | "rejected" | "completed" | "no_show";

const STATUSES: { key: Status; label: string }[] = [
  { key: "all", label: "Të Gjitha" },
  { key: "pending", label: "Pritje" },
  { key: "confirmed", label: "Konfirmuar" },
  { key: "rejected", label: "Refuzuar" },
  { key: "completed", label: "Përfunduar" },
  { key: "no_show", label: "S'erdhi" },
];

export function ReservationsTable({ initial }: { initial: Reservation[] }) {
  const [reservations, setReservations] = useState(initial);
  const [filter, setFilter] = useState<Status>("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [activeRes, setActiveRes] = useState<Reservation | null>(null);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (search && !r.fullName.toLowerCase().includes(search.toLowerCase()) && !r.phone.includes(search)) return false;
      if (dateFilter) {
        const d = new Date(r.date).toISOString().split("T")[0];
        if (d !== dateFilter) return false;
      }
      return true;
    });
  }, [reservations, filter, search, dateFilter]);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const j = await res.json();
      setReservations((prev) => prev.map((r) => (r.id === id ? j.reservation : r)));
      if (activeRes?.id === id) setActiveRes(j.reservation);
    }
  }

  async function updateNote(id: string, note: string) {
    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNote: note }),
    });
    if (res.ok) {
      const j = await res.json();
      setReservations((prev) => prev.map((r) => (r.id === id ? j.reservation : r)));
      if (activeRes?.id === id) setActiveRes(j.reservation);
    }
  }

  async function remove(id: string) {
    if (!confirm("Të fshihet ky rezervim?")) return;
    const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      if (activeRes?.id === id) setActiveRes(null);
    }
  }

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: reservations.length };
    for (const r of reservations) m[r.status] = (m[r.status] || 0) + 1;
    return m;
  }, [reservations]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
              filter === s.key
                ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,168,106,0.08)]"
                : "border-[var(--line)] text-[#a99c80] hover:border-[var(--line-strong)]"
            }`}
          >
            {s.label} <span className="ml-1.5 opacity-60">{counts[s.key] || 0}</span>
          </button>
        ))}
      </div>

      <div className="mb-6 grid md:grid-cols-2 gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold-deep)]" />
          <input
            type="text"
            placeholder="Kërko emër ose telefon..."
            className="input-luxe pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <input
          type="date"
          className="input-luxe"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="card-luxe p-8 text-center text-[#7a705e]">Asnjë rezervim.</div>
          ) : (
            filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRes(r)}
                className={`w-full text-left card-luxe p-5 transition-all ${
                  activeRes?.id === r.id ? "!border-[var(--gold)]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl text-[#f5ede0]">{r.fullName}</h3>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs text-[#a99c80]">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[var(--gold-deep)]" /> {formatDate(r.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-[var(--gold-deep)]" /> {r.time}</span>
                      <span className="flex items-center gap-1.5"><Users size={12} className="text-[var(--gold-deep)]" /> {r.guests}p</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[var(--gold-deep)]" /> {areaLabel(r.area)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-[#7a705e]">
                      <span className="flex items-center gap-1"><Phone size={11} /> {r.phone}</span>
                      {r.eventNight && <span className="text-[var(--gold)]">★ Event Night</span>}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {activeRes ? (
            <DetailPanel
              r={activeRes}
              onClose={() => setActiveRes(null)}
              onStatus={updateStatus}
              onNote={updateNote}
              onDelete={remove}
            />
          ) : (
            <div className="card-luxe p-8 text-center text-[#7a705e]">
              <Calendar size={32} className="mx-auto mb-3 text-[var(--gold-deep)]" />
              Zgjidh një rezervim për detajet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({
  r,
  onClose,
  onStatus,
  onNote,
  onDelete,
}: {
  r: Reservation;
  onClose: () => void;
  onStatus: (id: string, status: string) => void;
  onNote: (id: string, note: string) => void;
  onDelete: (id: string) => void;
}) {
  const [note, setNote] = useState(r.adminNote || "");
  const waConfirm = buildWhatsAppLink(r.whatsapp, buildConfirmedMessage(r));
  const waReject = buildWhatsAppLink(r.whatsapp, buildRejectedMessage(r));

  return (
    <div className="card-luxe p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">Rezervim</div>
          <h3 className="font-display text-2xl text-[#f5ede0] mt-1">{r.fullName}</h3>
        </div>
        <button onClick={onClose} className="text-[#7a705e] hover:text-[var(--gold)]">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3 text-sm border-y border-[var(--line)] py-4 mb-5">
        <Row label="Data"><span className="text-[#f5ede0]">{formatDate(r.date)}</span></Row>
        <Row label="Ora"><span className="text-[#f5ede0]">{r.time}</span></Row>
        <Row label="Persona"><span className="text-[#f5ede0]">{r.guests}</span></Row>
        <Row label="Zona"><span className="text-[#f5ede0]">{areaLabel(r.area)}</span></Row>
        <Row label="Telefoni">
          <a href={`tel:${r.phone}`} className="text-[var(--gold)]">{r.phone}</a>
        </Row>
        <Row label="WhatsApp"><span className="text-[#f5ede0]">{r.whatsapp}</span></Row>
        <Row label="Statusi"><StatusBadge status={r.status} /></Row>
        {r.eventNight && <Row label="Event"><span className="text-[var(--gold)]">★ Event Night</span></Row>}
        {r.specialRequest && (
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)] mb-1">Kërkesë</div>
            <div className="text-[#cbbfa6] text-sm">{r.specialRequest}</div>
          </div>
        )}
      </div>

      {/* WhatsApp actions */}
      <div className="space-y-2 mb-5">
        <a
          href={waConfirm}
          target="_blank"
          rel="noreferrer"
          onClick={() => onStatus(r.id, "confirmed")}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white text-sm tracking-wide font-medium hover:opacity-90 transition-opacity"
        >
          <MessageCircle size={16} /> Konfirmo + Dërgo WhatsApp
        </a>
        <a
          href={waReject}
          target="_blank"
          rel="noreferrer"
          onClick={() => onStatus(r.id, "rejected")}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-red-500/40 bg-red-500/5 text-red-300 text-sm tracking-wide hover:bg-red-500/10 transition-colors"
        >
          <X size={16} /> Refuzo + Njofto në WhatsApp
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          onClick={() => onStatus(r.id, "completed")}
          className="px-3 py-2 text-xs tracking-widest uppercase border border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
        >
          <Check size={12} className="inline mr-1" /> Përfunduar
        </button>
        <button
          onClick={() => onStatus(r.id, "no_show")}
          className="px-3 py-2 text-xs tracking-widest uppercase border border-gray-500/30 text-gray-300 hover:bg-gray-500/10"
        >
          <XCircle size={12} className="inline mr-1" /> S'erdhi
        </button>
      </div>

      <div className="mb-5">
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2 flex items-center gap-2">
          <StickyNote size={11} /> Shënim Admin
        </label>
        <textarea
          className="input-luxe resize-none text-sm"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => onNote(r.id, note)}
          placeholder="Shënim privat..."
        />
      </div>

      <button
        onClick={() => onDelete(r.id)}
        className="w-full px-3 py-2 text-xs tracking-widest uppercase border border-red-500/20 text-red-400/70 hover:bg-red-500/10 hover:text-red-300 inline-flex items-center justify-center gap-2"
      >
        <Trash2 size={12} /> Fshi Rezervimin
      </button>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

function areaLabel(a: string) {
  return { indoor: "Indoor", outdoor: "Outdoor", vip: "VIP", stage: "Pranë Skenës" }[a] || a;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: "Pritje", cls: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30" },
    confirmed: { label: "Konfirmuar", cls: "bg-green-500/10 text-green-300 border-green-500/30" },
    rejected: { label: "Refuzuar", cls: "bg-red-500/10 text-red-300 border-red-500/30" },
    completed: { label: "Përfunduar", cls: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
    no_show: { label: "S'erdhi", cls: "bg-gray-500/10 text-gray-300 border-gray-500/30" },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] tracking-widest uppercase border ${s.cls}`}>
      {s.label}
    </span>
  );
}
