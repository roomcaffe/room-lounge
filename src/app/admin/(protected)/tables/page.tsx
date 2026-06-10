import { prisma } from "@/lib/prisma";
import { TablesManager } from "@/components/admin/TablesManager";

export const dynamic = "force-dynamic";

export default async function AdminTablesPage() {
  const tables = await prisma.table.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Menaxho</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Tavolinat</h1>
        <p className="text-[#a99c80] mt-3">Kapaciteti, zonat, dhe disponueshmëria.</p>
      </div>
      <TablesManager initial={tables} />
    </div>
  );
}
