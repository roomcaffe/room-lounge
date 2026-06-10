import { prisma } from "@/lib/prisma";
import { ReservationsTable } from "@/components/admin/ReservationsTable";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ status: "asc" }, { date: "asc" }, { time: "asc" }],
  });

  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Menaxho</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Rezervimet</h1>
        <p className="text-[#a99c80] mt-3">
          Të gjitha kërkesat e rezervimit. Konfirmo, refuzo, ose dërgo mesazh WhatsApp.
        </p>
      </div>
      <ReservationsTable initial={reservations} />
    </div>
  );
}
