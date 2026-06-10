import { ReservationForm } from "@/components/site/ReservationForm";

export const metadata = { title: "Rezervim Tavoline" };

export default function ReservationPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">
            — Rezervim Tavoline
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Tavolina <span className="italic text-gradient-gold">juaj</span><br />
            ju pret.
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-2xl mx-auto">
            Plotësoni formularin më poshtë. Stafi ynë do të konfirmojë rezervimin
            tuaj përmes WhatsApp brenda 30 minutash.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
