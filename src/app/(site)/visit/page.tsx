import { Metadata } from "next";
import { VisitView } from "@/components/visit/VisitView";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Room Lounge në Lipjan. Adresa, orari, dhe si të mbërrish. Hapur 7 ditë në javë.",
};

export default function VisitPage() {
  return <VisitView />;
}
