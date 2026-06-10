"use client";

import { useState, useRef } from "react";
import { GalleryImage } from "@prisma/client";
import { Upload, Trash2, Loader2 } from "lucide-react";

export function GalleryManager({ initial }: { initial: GalleryImage[] }) {
  const [images, setImages] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("general");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("caption", caption);
    fd.append("category", category);
    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      if (res.ok) {
        const j = await res.json();
        setImages((p) => [j.image, ...p]);
        setCaption("");
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(id: string) {
    if (!confirm("Fshi këtë foto?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) setImages((p) => p.filter((x) => x.id !== id));
  }

  return (
    <>
      <div className="card-luxe p-6 mb-8">
        <h2 className="font-display text-xl text-[#f5ede0] mb-4">Upload Foto e Re</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Caption</label>
            <input className="input-luxe" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Opsional" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Kategoria</label>
            <select className="input-luxe" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="general">General</option>
              <option value="lounge">Atmosferë</option>
              <option value="drinks">Drinks</option>
              <option value="music">Music</option>
              <option value="community">Community</option>
              <option value="events">Events</option>
            </select>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-gold disabled:opacity-50"
        >
          {uploading ? <><Loader2 size={16} className="animate-spin" /> Duke ngarkuar...</> : <><Upload size={16} /> Zgjidh Foto</>}
        </button>
      </div>

      {images.length === 0 ? (
        <div className="card-luxe p-12 text-center text-[#7a705e]">
          Asnjë foto ende. Ngarko të parën më lart.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square overflow-hidden border border-[var(--line)]">
              <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                  {img.caption && <div className="text-xs text-[var(--beige)] mb-2">{img.caption}</div>}
                  <button
                    onClick={() => remove(img.id)}
                    className="w-full px-3 py-2 bg-red-500/80 text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Trash2 size={11} /> Fshi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
