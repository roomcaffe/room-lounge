import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CalendarCheck, Clock, CheckCircle2, XCircle, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [total, pending, confirmed, todayReservations, recent] = await Promise.all([
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.reservation.count({ where: { status: "confirmed" } }),
    prisma.reservation.findMany({
      where: { date: { gte: today, lt: tomorrow } },
      orderBy: { time: "asc" },
    }),
    prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const stats = [
    { label: "Të Reja", value: pending, icon: Clock, color: "text-yellow-400" },
    { label: "Konfirmuara", value: confirmed, icon: CheckCircle2, color: "text-green-400" },
    { label: "Sot", value: todayReservations.length, icon: CalendarCheck, color: "text-[var(--gold)]" },
    { label: "Total", value: total, icon: Users, color: "text-blue-400" },
  ];

  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Përmbledhje</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card-luxe p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">
                  {s.label}
                </span>
                <Icon size={18} className={s.color} />
              </div>
              <div className="font-display text-4xl text-[#f5ede0]">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-luxe p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-[#f5ede0]">Rezervime për Sot</h2>
            <Link href="/admin/reservations" className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] hover:text-[var(--gold-soft)]">
              Të Gjitha →
            </Link>
          </div>
          {todayReservations.length === 0 ? (
            <div className="text-[#7a705e] text-sm">Asnjë rezervim për sot.</div>
          ) : (
            <div className="space-y-3">
              {todayReservations.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors">
                  <div>
                    <div className="text-[#f5ede0] text-sm">{r.fullName}</div>
                    <div className="text-xs text-[#a99c80] mt-1">{r.time} · {r.guests} persona · {r.area}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-luxe p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-[#f5ede0]">Më të Fundit</h2>
            <Link href="/admin/reservations" className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] hover:text-[var(--gold-soft)]">
              Të Gjitha →
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-[#7a705e] text-sm">Asnjë rezervim ende.</div>
          ) : (
            <div className="space-y-3">
              {recent.map((r) => (
                <Link
                  key={r.id}
                  href="/admin/reservations"
                  className="flex items-center justify-between p-3 border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors"
                >
                  <div>
                    <div className="text-[#f5ede0] text-sm">{r.fullName}</div>
                    <div className="text-xs text-[#a99c80] mt-1">
                      {formatDate(r.date)} · {r.time} · {r.guests}p
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: typeof Clock }> = {
    pending: { label: "Pritje", cls: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30", Icon: Clock },
    confirmed: { label: "Konfirmuar", cls: "bg-green-500/10 text-green-300 border-green-500/30", Icon: CheckCircle2 },
    rejected: { label: "Refuzuar", cls: "bg-red-500/10 text-red-300 border-red-500/30", Icon: XCircle },
    completed: { label: "Përfunduar", cls: "bg-blue-500/10 text-blue-300 border-blue-500/30", Icon: CheckCircle2 },
    no_show: { label: "S'erdhi", cls: "bg-gray-500/10 text-gray-300 border-gray-500/30", Icon: XCircle },
  };
  const s = map[status] || map.pending;
  const Icon = s.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-widest uppercase border ${s.cls}`}>
      <Icon size={10} /> {s.label}
    </span>
  );
}
