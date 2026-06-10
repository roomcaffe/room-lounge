import { prisma } from "@/lib/prisma";
import { EventsManager } from "@/components/admin/EventsManager";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });
  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Menaxho</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Eventet</h1>
        <p className="text-[#a99c80] mt-3">Krijo, edito, publiko net live music dhe events.</p>
      </div>
      <EventsManager initial={events} />
    </div>
  );
}
