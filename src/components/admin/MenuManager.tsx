"use client";

import { useState } from "react";
import { MenuItem } from "@prisma/client";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const CATS = [
  { value: "coffee", label: "Kafe" },
  { value: "cocktails", label: "Cocktails" },
  { value: "drinks", label: "Premium" },
  { value: "soft", label: "Freskuese" },
  { value: "food", label: "Food" },
];

export function MenuManager({ initial }: { initial: MenuItem[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  async function save(data: Record<string, unknown>) {
    if (editing) {
      const res = await fetch(`/api/admin/menu/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setItems((p) => p.map((x) => (x.id === editing.id ? j.item : x)));
        setEditing(null);
      }
    } else {
      const res = await fetch("/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const j = await res.json();
        setItems((p) => [...p, j.item]);
        setCreating(false);
      }
    }
  }

  async function remove(id: string) {
    if (!confirm("Fshi?")) return;
    const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    if (res.ok) setItems((p) => p.filter((x) => x.id !== id));
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter("all")} className={`px-3 py-2 text-xs uppercase tracking-widest border ${filter === "all" ? "border-[var(--gold)] text-[var(--gold)]" : "border-[var(--line)] text-[#a99c80]"}`}>Të Gjitha</button>
          {CATS.map((c) => (
            <button key={c.value} onClick={() => setFilter(c.value)} className={`px-3 py-2 text-xs uppercase tracking-widest border ${filter === c.value ? "border-[var(--gold)] text-[var(--gold)]" : "border-[var(--line)] text-[#a99c80]"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <button onClick={() => setCreating(true)} className="btn-gold">
          <Plus size={16} /> Artikull i Ri
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => (
          <div key={it.id} className="card-luxe p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[var(--gold-deep)]">{CATS.find(c => c.value === it.category)?.label || it.category}</div>
                <h3 className="font-display text-xl text-[#f5ede0] mt-1">{it.name}</h3>
              </div>
              <div className="font-display text-lg text-gradient-gold">{formatPrice(it.price)}</div>
            </div>
            {it.description && <p className="text-xs text-[#a99c80] mb-3">{it.description}</p>}
            <div className="flex gap-2 pt-3 border-t border-[var(--line)] items-center">
              <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 border ${it.active ? "border-green-500/30 text-green-300" : "border-gray-500/30 text-gray-400"}`}>
                {it.active ? "Aktiv" : "Joaktiv"}
              </span>
              <div className="ml-auto flex gap-2">
                <button onClick={() => setEditing(it)} className="px-3 py-1.5 border border-[var(--line)] hover:border-[var(--gold)] text-[var(--gold)]">
                  <Edit2 size={11} />
                </button>
                <button onClick={() => remove(it.id)} className="px-3 py-1.5 border border-red-500/20 hover:border-red-500/60 text-red-400">
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <ItemForm
          initial={editing}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={save}
        />
      )}
    </>
  );
}

function ItemForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: MenuItem | null;
  onCancel: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || "coffee",
    price: initial?.price?.toString() || "",
    description: initial?.description || "",
    image: initial?.image || "",
    active: initial?.active ?? true,
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-luxe max-w-lg w-full p-8">
        <h3 className="font-display text-2xl text-[#f5ede0] mb-6">{initial ? "Edito" : "Artikull i Ri"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Emri</label>
            <input className="input-luxe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Kategoria</label>
              <select className="input-luxe" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Çmimi (€)</label>
              <input type="number" step="0.10" className="input-luxe" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Përshkrimi</label>
            <textarea rows={2} className="input-luxe resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[var(--gold)]" />
            <span className="text-sm text-[#cbbfa6]">Aktiv (shfaqet në website)</span>
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
