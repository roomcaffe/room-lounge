"use client";

import { useState } from "react";
import { Table } from "@prisma/client";
import { Plus, Trash2, Edit2, Users } from "lucide-react";

const AREAS = [
  { value: "main", label: "Salla Kryesore" },
  { value: "bar", label: "Bar Lounge" },
  { value: "vip", label: "VIP Lounge" },
  { value: "terrace", label: "Terrace" },
  // legacy (mbështetje për rezervime të vjetra)
  { value: "indoor", label: "Indoor (legacy)" },
  { value: "outdoor", label: "Outdoor (legacy)" },
  { value: "stage", label: "Stage (legacy)" },
];

export function TablesManager({ initial }: { initial: Table[] }) {
  const [tables, setTables] = useState(initial);
  const [editing, setEditing] = useState<Table | null>(null);
  const [creating, setCreating] = useState(false);

  async function save(data: Record<string, unknown>) {
    if (editing) {
      const res = await fetch(`/api/admin/tables/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setTables((p) => p.map((x) => (x.id === editing.id ? j.table : x)));
        setEditing(null);
      }
    } else {
      const res = await fetch("/api/admin/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setTables((p) => [...p, j.table]);
        setCreating(false);
      }
    }
  }

  async function remove(id: string) {
    if (!confirm("Fshi tavolinën?")) return;
    const res = await fetch(`/api/admin/tables/${id}`, { method: "DELETE" });
    if (res.ok) setTables((p) => p.filter((t) => t.id !== id));
  }

  const byArea = AREAS.map((a) => ({ ...a, items: tables.filter((t) => t.area === a.value) }));

  return (
    <>
      <div className="mb-6">
        <button onClick={() => setCreating(true)} className="btn-gold">
          <Plus size={16} /> Tavolinë e Re
        </button>
      </div>

      <div className="space-y-8">
        {byArea.map((a) => (
          <div key={a.value}>
            <h2 className="font-display text-2xl text-[#f5ede0] mb-4">{a.label} <span className="text-sm text-[var(--gold-deep)]">· {a.items.length}</span></h2>
            {a.items.length === 0 ? (
              <div className="card-luxe p-6 text-[#7a705e] text-sm">Asnjë tavolinë në këtë zonë.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {a.items.map((t) => (
                  <div key={t.id} className="card-luxe p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-display text-xl text-[#f5ede0]">{t.name}</div>
                        <div className="text-xs text-[#a99c80] mt-1 flex items-center gap-1"><Users size={11} /> {t.capacity} persona</div>
                      </div>
                      <span className={`w-2 h-2 rounded-full mt-2 ${t.available ? "bg-green-400" : "bg-red-400"}`} />
                    </div>
                    {t.notes && <p className="text-xs text-[#7a705e] mt-2">{t.notes}</p>}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--line)]">
                      <button onClick={() => setEditing(t)} className="flex-1 px-2 py-1.5 text-[10px] uppercase tracking-widest border border-[var(--line)] hover:border-[var(--gold)] text-[var(--gold)]">
                        <Edit2 size={10} className="inline mr-1" /> Edito
                      </button>
                      <button onClick={() => remove(t.id)} className="px-2 py-1.5 border border-red-500/20 hover:border-red-500/60 text-red-400">
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <TableForm initial={editing} onCancel={() => { setCreating(false); setEditing(null); }} onSave={save} />
      )}
    </>
  );
}

function TableForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Table | null;
  onCancel: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    capacity: initial?.capacity?.toString() || "4",
    area: initial?.area || "main",
    available: initial?.available ?? true,
    notes: initial?.notes || "",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-luxe max-w-md w-full p-8">
        <h3 className="font-display text-2xl text-[#f5ede0] mb-6">{initial ? "Edito Tavolinë" : "Tavolinë e Re"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Emri/Numri</label>
            <input className="input-luxe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="T-01" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Kapaciteti</label>
              <input type="number" min="1" className="input-luxe" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Zona</label>
              <select className="input-luxe" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
                {AREAS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Shënime</label>
            <input className="input-luxe" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-[var(--gold)]" />
            <span className="text-sm text-[#cbbfa6]">Disponueshme</span>
          </label>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={onCancel} className="btn-outline flex-1">Anulo</button>
          <button onClick={() => onSave(form)} className="btn-gold flex-1">Ruaj</button>
        </div>
      </div>
    </div>
  );
}
