import { SectionHeading } from "./SectionHeading";
import Link from "next/link";

const drinks = [
  {
    name: "Espresso",
    price: "1.20 €",
    desc: "Single shot · italian roast",
    cat: "Coffee",
  },
  {
    name: "Cappuccino",
    price: "1.80 €",
    desc: "Espresso · milk foam · cocoa dust",
    cat: "Coffee",
  },
  {
    name: "Aperol Spritz",
    price: "4.50 €",
    desc: "Aperol · prosecco · soda · orange",
    cat: "Cocktail",
  },
  {
    name: "Old Fashioned",
    price: "6.00 €",
    desc: "Bourbon · sugar · angostura · orange",
    cat: "Cocktail",
  },
  {
    name: "Mojito Royale",
    price: "5.00 €",
    desc: "Rum · mint · lime · prosecco",
    cat: "Cocktail",
  },
  {
    name: "Fresh Lemonade",
    price: "2.50 €",
    desc: "Lemon · mint · house syrup",
    cat: "Fresh",
  },
];

export function FeaturedDrinks() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Menu Selection"
          title="Të preferuarat e Room-it"
          subtitle="Nga espresso italiane deri te cocktail-et e shtëpisë. Çdo gotë, e bërë me dashuri për Lipjanin."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {drinks.map((d, i) => (
            <div
              key={i}
              className="bg-[var(--bg)] p-8 group hover:bg-[var(--bg-soft)] transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)] mb-2">
                    {d.cat}
                  </div>
                  <h3 className="font-display text-2xl text-[#f5ede0] group-hover:text-[var(--gold)] transition-colors">
                    {d.name}
                  </h3>
                </div>
                <div className="font-display text-xl text-gradient-gold whitespace-nowrap">
                  {d.price}
                </div>
              </div>
              <p className="text-sm text-[#a99c80] leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/menu" className="btn-outline">
            Menu i Plotë
          </Link>
        </div>
      </div>
    </section>
  );
}
