import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-noise">
      <div className="absolute inset-0 bg-radial-gold opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex"><Logo size="lg" /></div>
          <div className="mt-6 text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Admin Panel</div>
          <h1 className="font-display text-4xl mt-3 text-[#f5ede0]">Mirë se vini</h1>
          <div className="divider-gold" />
        </div>
        <div className="card-luxe p-8">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-[#7a705e] mt-6 tracking-widest">
          ROOM LOUNGE CAFE · ADMIN ACCESS
        </p>
      </div>
    </div>
  );
}
