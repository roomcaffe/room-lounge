import { SectionHeading } from "@/components/site/SectionHeading";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@prisma/client";

export const metadata = { title: "Menu" };
export const dynamic = "force-dynamic";

const FALLBACK: Record<string, { name: string; price: number; description: string }[]> = {
  coffee: [
    { name: "Espresso", price: 1.2, description: "Single shot · italian roast" },
    { name: "Espresso Doppio", price: 1.8, description: "Double shot · më shumë intensitet" },
    { name: "Cappuccino", price: 1.8, description: "Espresso · milk foam · cocoa dust" },
    { name: "Caffè Latte", price: 2.0, description: "Smooth · creamy · perfekt për mëngjes" },
    { name: "Macchiato", price: 1.5, description: "Espresso me njolla qumështi" },
    { name: "Iced Coffee", price: 2.2, description: "Cold brew · ice · syrup i shtëpisë" },
  ],
  cocktails: [
    { name: "Aperol Spritz", price: 4.5, description: "Aperol · prosecco · soda · orange" },
    { name: "Old Fashioned", price: 6.0, description: "Bourbon · sugar · angostura · orange" },
    { name: "Mojito Royale", price: 5.0, description: "Rum · mint · lime · prosecco" },
    { name: "Negroni", price: 5.5, description: "Gin · campari · vermut" },
    { name: "Espresso Martini", price: 6.0, description: "Vodka · espresso · kahlua" },
    { name: "Whiskey Sour", price: 5.5, description: "Bourbon · lemon · sugar · egg white" },
  ],
  drinks: [
    { name: "Glass of Wine", price: 3.5, description: "Red · white · rosé" },
    { name: "Bottle Beer", price: 2.5, description: "Peja · Heineken · Corona" },
    { name: "Draft Beer", price: 2.0, description: "Peja e freskët" },
    { name: "Premium Whiskey", price: 7.0, description: "Single malt · 12 vjeçar" },
  ],
  soft: [
    { name: "Fresh Lemonade", price: 2.5, description: "Lemon · mint · house syrup" },
    { name: "Orange Juice", price: 2.5, description: "Squeezed fresh" },
    { name: "Coca-Cola", price: 1.5, description: "Original · klasik" },
    { name: "Sparkling Water", price: 1.5, description: "San Pellegrino" },
  ],
  food: [
    { name: "Sallatë Cesar", price: 4.5, description: "Pulë · parmezan · krutone" },
    { name: "Bruschetta", price: 3.5, description: "Domate · borzilok · vaj ulliri" },
    { name: "Plato Antipasti", price: 7.0, description: "Djathra · proshutë · ullinj" },
    { name: "Tiramisu", price: 3.5, description: "Klasik italian" },
  ],
};

const CATEGORIES = [
  { key: "coffee", label: "Kafja", subtitle: "Italian roast · cold brew · classics" },
  { key: "cocktails", label: "Cocktails", subtitle: "Klasike dhe specialë të shtëpisë" },
  { key: "drinks", label: "Pije Premium", subtitle: "Vera · birra · whiskey" },
  { key: "soft", label: "Pije Freskuese", subtitle: "Fresh juices · soft drinks" },
  { key: "food", label: "Snacks", subtitle: "Pak për oreks, pak për shije" },
];

export default async function MenuPage() {
  let items: MenuItem[] = [];
  try {
    items = await prisma.menuItem.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    items = [];
  }

  const byCategory: Record<string, MenuItem[]> = {};
  for (const c of CATEGORIES) byCategory[c.key] = [];
  for (const it of items) {
    if (!byCategory[it.category]) byCategory[it.category] = [];
    byCategory[it.category].push(it);
  }

  return (
    <>
      <section className="pt-32 pb-16 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">
            — La Carte
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Menu
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-2xl mx-auto">
            Nga espresso italian i klasik deri te cocktail-et signature.
            Çmime në Euro · Shërbim 24/7 në Room.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-24">
          {CATEGORIES.map((cat) => {
            const dbItems = byCategory[cat.key] || [];
            const data = dbItems.length > 0
              ? dbItems.map((d) => ({ name: d.name, price: d.price, description: d.description || "" }))
              : FALLBACK[cat.key] || [];
            if (data.length === 0) return null;
            return (
              <div key={cat.key}>
                <SectionHeading eyebrow={cat.subtitle} title={cat.label} />
                <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {data.map((it, i) => (
                    <div key={i} className="py-6 flex items-start justify-between gap-6 group">
                      <div className="flex-1">
                        <h3 className="font-display text-2xl text-[#f5ede0] group-hover:text-[var(--gold)] transition-colors">
                          {it.name}
                        </h3>
                        {it.description && (
                          <p className="text-sm text-[#a99c80] mt-1">{it.description}</p>
                        )}
                      </div>
                      <div className="font-display text-xl text-gradient-gold whitespace-nowrap pt-1">
                        {formatPrice(it.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
