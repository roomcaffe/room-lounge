"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
};

const CATEGORY_LABELS: Record<string, { label: string; description: string }> = {
  coffee: {
    label: "Coffee",
    description: "Espresso italian. Beans premium. Pa kompromis.",
  },
  cocktails: {
    label: "Cocktails",
    description: "Klasikë dhe sinjatura të shtëpisë.",
  },
  soft: {
    label: "Fresh & Soft",
    description: "Lëngje natyrale, limonadë, çaj.",
  },
  food: {
    label: "Food",
    description: "Snacks dhe pjata të lehta.",
  },
};

export function MenuView({ items }: { items: Item[] }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState<string | null>(categories[0] ?? null);

  const filtered = items.filter((i) => i.category === active);

  return (
    <div className="container-edge py-32">
      <header className="mb-16 max-w-3xl">
        <span className="text-eyebrow">Menu</span>
        <h1 className="text-display-lg mt-3 text-balance">
          Çfarë <em className="font-display italic brass-shimmer">do të pijmë</em> sonte?
        </h1>
        <p className="mt-4 text-lg text-[color:var(--cream-soft)]/70 text-pretty">
          Coffee italian, cocktails me kujdes, lëngje fresh. Çdo gotë ka një histori.
        </p>
      </header>

      {/* Categories — horizontal scroll on mobile */}
      <div className="sticky top-16 md:top-20 z-30 py-3 -mx-4 md:-mx-6 lg:-mx-12 px-4 md:px-6 lg:px-12 bg-[color:var(--obsidian)]/85 backdrop-blur-md mb-10">
        <div className="hscroll md:flex md:flex-wrap flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-500 ${
                active === cat
                  ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                  : "glass hover:bg-[color:var(--cream)]/8"
              }`}
            >
              {CATEGORY_LABELS[cat]?.label || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Section header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {active && (
            <div className="mb-10">
              <h2 className="text-display-md mb-2">
                {CATEGORY_LABELS[active]?.label}
              </h2>
              <p className="text-[color:var(--cream-soft)]/60 max-w-md">
                {CATEGORY_LABELS[active]?.description}
              </p>
            </div>
          )}

          {/* Items grid */}
          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 md:gap-y-8">
            {filtered.length === 0 && (
              <p className="col-span-2 text-[color:var(--cream-soft)]/60 italic">
                Asnjë artikull në këtë kategori për momentin.
              </p>
            )}
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative py-5 border-b border-[color:var(--line)] hover:border-[color:var(--brass)] transition-colors"
              >
                <div className="flex items-baseline gap-3 md:gap-4">
                  <h3 className="font-display text-xl md:text-2xl flex-1 min-w-0 group-hover:text-[color:var(--cream)] transition-colors">
                    {item.name}
                  </h3>
                </div>
                {item.description && (
                  <p className="mt-2 text-sm text-[color:var(--cream-soft)]/60 text-pretty">
                    {item.description}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom note */}
      <div className="mt-20 glass-strong rounded-3xl p-8 text-center">
        <p className="text-[color:var(--cream-soft)]/70">
          Cash & card. Tips welcome.
        </p>
      </div>
    </div>
  );
}
