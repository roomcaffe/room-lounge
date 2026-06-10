import { prisma } from "@/lib/prisma";
import { MenuManager } from "@/components/admin/MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Menaxho</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Menu</h1>
        <p className="text-[#a99c80] mt-3">Kafja, cocktails, drinks, food — gjithçka në një vend.</p>
      </div>
      <MenuManager initial={items} />
    </div>
  );
}
