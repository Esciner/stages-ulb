import { Metadata } from "next";
import HopitalsPageClient from "@/components/hospitals/HopitalsPageClient";

export const metadata: Metadata = {
  title: "Liste des Hôpitaux - ULB Stages",
  description:
    "Découvrez tous les hôpitaux disponibles pour les stages à l'ULB. Sélectionnez un hôpital pour voir les détails.",
};

export default function HopitalsPage() {
  return <HopitalsPageClient />;
}
