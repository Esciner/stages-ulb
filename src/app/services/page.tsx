import { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Liste des Services - ULB Stages",
  description:
    "Découvrez tous les services disponibles pour les stages à l'ULB. Sélectionnez un service pour voir les détails.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
