"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const drinks = [
  {
    name: "Espresso",
    desc: "Italiane klasike. Kremoz, intens, pa kompromis.",
    price: "1.50",
    accent: "from-[#3a2419] to-[#1c1814]",
  },
  {
    name: "Aperol Spritz",
    desc: "Aperol, prosecco, soda. Verandë + perëndim diellor.",
    price: "4.50",
    accent: "from-[#d97942] to-[#a85a2e]",
  },
  {
    name: "Macchiato",
    desc: "Espresso e veshur me qumësht të shkumëzuar mëndafshi.",
    price: "1.80",
    accent: "from-[#8f7344] to-[#3a2419]",
  },
  {
    name: "Old Fashioned",
    desc: "Whiskey, sheqer, bitter. Klasiku që s'plaket kurrë.",
    price: "6.00",
    accent: "from-[#a85a2e] to-[#1c1814]",
  },
];

export function Drinks() {
  return (
    <section className="relative section">
      <div className="container-edge">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-xl">
            <span className="text-eyebrow">Menu Highlights</span>
            <h2 className="text-display-lg mt-3 text-balance">
              Pijet që na bënë <em className="text-gradient-ember">Room</em>.
            </h2>
          </div>
          <Link href="/menu" className="btn-ghost">
            Menu e plotë <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {drinks.map((drink, i) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${drink.accent} opacity-90`}
              />
              <div className="absolute inset-0 bg-noise opacity-40" />

              {/* Glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,121,66,0.4),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-eyebrow !text-[color:var(--cream)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs glass px-2.5 md:px-3 py-1 rounded-full">
                    €{drink.price}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl md:text-3xl leading-tight">{drink.name}</h3>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-[color:var(--cream-soft)]/80 leading-relaxed line-clamp-2 group-hover:text-[color:var(--cream)] transition-colors">
                    {drink.desc}
                  </p>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass-strong flex items-center justify-center translate-x-2 -translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
