import { Metadata } from "next";
import { ReserveForm } from "@/components/reserve/ReserveForm";

export const metadata: Metadata = {
  title: "Rezervo Tavolinën",
  description:
    "Rezervo tavolinën tënde në Room Lounge me floor plan interaktiv. Konfirmim me WhatsApp brenda pak minutash.",
};

export default function ReservePage() {
  return (
    <div className="container-edge pt-24 md:pt-32 pb-16 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <span className="text-eyebrow">Rezervo</span>
          <h1 className="text-display-lg mt-3 text-balance">
            Zgjedh tavolinën <em className="text-gradient-ember">tënde</em>.
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-[color:var(--cream-soft)]/70 max-w-xl mx-auto text-pretty">
            4 hapa. Më pak se 60 sekonda. Tavolina jote të pret.
          </p>
        </header>

        <ReserveForm />
      </div>
    </div>
  );
}
