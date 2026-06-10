import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      <AdminSidebar userName={session.name} />
      <div className="flex-1 lg:pl-72">
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
