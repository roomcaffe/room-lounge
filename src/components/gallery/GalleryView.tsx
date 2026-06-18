"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

type Img = { id: string; url: string; caption: string | null; category: string };

const INTERIOR_RENDERS: Img[] = [
  { id: "r-3", url: "/renders/render-3.jpg", caption: "The Main Hall — Brass arches, marble bar.", category: "interior" },
  { id: "r-1", url: "/renders/render-1.jpg", caption: "Cocktail Lounge — cascading crystal under deep espresso.", category: "interior" },
  { id: "r-5", url: "/renders/render-5.jpg", caption: "Amber Glow — glassblock columns x velvet banquettes.", category: "interior" },
  { id: "r-2", url: "/renders/render-2.jpg", caption: "The Banquette — botanical print, candle warmth.", category: "interior" },
  { id: "r-4", url: "/renders/render-4.jpg", caption: "The Bar — tufted oxblood and brass grid.", category: "interior" },
  { id: "r-7", url: "/renders/render-7.jpg", caption: "Window Side — onyx counter on the avenue.", category: "interior" },
  { id: "r-6", url: "/renders/render-6.jpg", caption: "Powder Room — Calacatta Viola, dark florals.", category: "interior" },
  { id: "r-8", url: "/renders/render-8.jpg", caption: "Rooftop Terrace — Lipjan under bistro lights.", category: "interior" },
  { id: "r-9", url: "/renders/render-9.jpg", caption: "Entry view — step in, slow down.", category: "interior" },
];

export function GalleryView({ images: dbImages }: { images: Img[] }) {
  const images = dbImages.length > 0 ? [...INTERIOR_RENDERS, ...dbImages] : INTERIOR_RENDERS;
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const prev = () =>
    setActive((a) => (a === null ? null : (a - 1 + images.length) % images.length));
  const next = () =>
    setActive((a) => (a === null ? null : (a + 1) % images.length));

  return (
    <div className="container-edge py-32">
      <header className="mb-16 max-w-3xl">
        <span className="text-eyebrow">Gallery</span>
        <h1 className="text-display-lg mt-3 text-balance">
          Brenda <em className="font-display italic brass-shimmer">Room</em>.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          Brass, mermer, kadife, kristal — një shije e ambientit që të pret në Lipjan.
        </p>
      </header>

      {images.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center">
          <ImageIcon size={32} className="mx-auto text-[color:var(--brass)] mb-4" />
          <h3 className="font-display text-2xl mb-2">Galeria po freskohet</h3>
          <p className="text-[color:var(--cream-soft)]/60 max-w-md mx-auto">
            Foto të reja po vijnë së shpejti. Ndërkohë na ndiq në Instagram për pamje live.
          </p>
        </div>
      ) : (
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          style={{ columnFill: "balance" }}
        >
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid border border-[color:var(--line)] hover:border-[color:var(--brass)] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption || "Room Lounge"}
                loading="lazy"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--obsidian)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm text-[color:var(--cream)]">{img.caption}</p>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-[color:var(--obsidian)]/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-[color:var(--cream)]/10 transition-colors"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-[color:var(--cream)]/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-[color:var(--cream)]/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[active].url}
                alt={images[active].caption || "Room Lounge"}
                className="max-h-[80vh] w-auto rounded-2xl"
              />
              {images[active].caption && (
                <p className="text-sm text-[color:var(--cream-soft)]/80 text-center max-w-2xl">
                  {images[active].caption}
                </p>
              )}
              <div className="text-[10px] font-mono uppercase tracking-wider text-[color:var(--cream-soft)]/40">
                {active + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
