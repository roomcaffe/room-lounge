"use client";

import { useState } from "react";
import { Event } from "@prisma/client";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function EventsManager({ initial }: { initial: Event[] }) {
  const [events, setEvents] = useState(initial);
  const [editing, setEditing] = useState<Event | null>(null);
  const [creating, setCreating] = useState(false);

  async function save(data: Record<string, unknown>) {
    if (editing) {
      const res = await fetch(`/api/admin/events/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setEvents((p) => p.map((e) => (e.id === editing.id ? j.event : e)));
        setEditing(null);
      }
    } else {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setEvents((p) => [j.event, ...p]);
        setCreating(false);
      }
    }
  }

  async function remove(id: string) {
    if (!confirm("Fshi këtë event?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (res.ok) setEvents((p) => p.filter((e) => e.id !== id));
  }

  async function toggleStatus(e: Event) {
    const newStatus = e.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/admin/events/${e.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const j = await res.json();
      setEvents((p) => p.map((x) => (x.id === e.id ? j.event : x)));
    }
  }

  return (
    <>
      <div className="mb-6">
        <button onClick={() => setCreating(true)} className="btn-gold">
          <Plus size={16} /> Event i Ri
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((e) => (
          <div key={e.id} className="card-luxe p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-display text-xl text-[#f5ede0]">{e.title}</h3>
                {e.artist && <p className="text-[var(--gold-soft)] text-sm italic mt-1">{e.artist}</p>}
              </div>
              <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 border ${
                e.status === "published"
                  ? "border-green-500/30 text-green-300 bg-green-500/10"
                  : "border-gray-500/30 text-gray-300 bg-gray-500/10"
              }`}>
                {e.status === "published" ? "Publik" : "Draft"}
              </span>
            </div>
            <div className="text-xs text-[#a99c80] mb-4">{formatDate(e.date)} · {e.time}</div>
            {e.description && <p className="text-sm text-[#a99c80] mb-4 line-clamp-2">{e.description}</p>}
            <div className="flex gap-2 pt-4 border-t border-[var(--line)]">
              <button onClick={() => toggleStatus(e)} className="flex-1 px-3 py-2 text-xs uppercase tracking-widest border border-[var(--line)] hover:border-[var(--gold)] text-[var(--gold)]">
                {e.status === "published" ? <><EyeOff size={11} className="inline mr-1" /> Hiq</> : <><Eye size={11} className="inline mr-1" /> Publiko</>}
              </button>
              <button onClick={() => setEditing(e)} className="px-3 py-2 border border-[var(--line)] hover:border-[var(--gold)] text-[var(--gold)]">
                <Edit2 size={12} />
              </button>
              <button onClick={() => remove(e.id)} className="px-3 py-2 border border-red-500/20 hover:border-red-500/60 text-red-400">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <EventForm
          initial={editing}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={save}
        />
      )}
    </>
  );
}

function EventForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Event | null;
  onCancel: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    artist: initial?.artist || "",
    date: initial ? new Date(initial.date).toISOString().split("T")[0] : "",
    time: initial?.time || "20:00",
    coverImage: initial?.coverImage || "",
    description: initial?.description || "",
    status: initial?.status || "draft",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto">
      <div className="card-luxe max-w-xl w-full p-8 my-8">
        <h3 className="font-display text-2xl text-[#f5ede0] mb-6">
          {initial ? "Edito Event" : "Event i Ri"}
        </h3>
        <div className="space-y-4">
          <Field label="Titulli">
            <input className="input-luxe" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Artisti">
            <input className="input-luxe" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Data">
              <input type="date" className="input-luxe" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Field>
            <Field label="Ora">
              <input type="time" className="input-luxe" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </Field>
          </div>
          <Field label="Cover Image URL">
            <input className="input-luxe" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="https://... ose /uploads/..." />
          </Field>
          <Field label="Përshkrimi">
            <textarea rows={3} className="input-luxe resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Statusi">
            <select className="input-luxe" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Publik</option>
            </select>
          </Field>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={onCancel} className="btn-outline flex-1">Anulo</button>
          <button onClick={() => onSave(form)} className="btn-gold flex-1">Ruaj</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">{label}</label>
      {children}
    </div>
  );
}
