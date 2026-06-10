"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Music,
  Coffee,
  ImageIcon,
  Table as TableIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Rezervimet", icon: CalendarCheck },
  { href: "/admin/events", label: "Eventet", icon: Music },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/tables", label: "Tavolinat", icon: TableIcon },
  { href: "/admin/gallery", label: "Galeria", icon: ImageIcon },
];

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--line-strong)] flex items-center justify-center text-[var(--gold)]"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[var(--bg-soft)] border-r border-[var(--line)] z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[var(--line)]">
          <Logo size="md" />
          <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">
            Admin Panel
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/admin" && pathname?.startsWith(n.href));
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                  active
                    ? "bg-[rgba(201,168,106,0.1)] text-[var(--gold)] border-l-2 border-[var(--gold)]"
                    : "text-[#a99c80] hover:text-[var(--gold)] hover:bg-[rgba(201,168,106,0.05)]"
                }`}
              >
                <Icon size={16} />
                <span className="tracking-wide">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-[var(--line)]">
          <div className="px-4 py-3 mb-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">Kyçur si</div>
            <div className="text-[#f5ede0] text-sm mt-1">{userName}</div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm text-[#a99c80] hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={16} />
            <span>Dil</span>
          </button>
        </div>
      </aside>
    </>
  );
}
