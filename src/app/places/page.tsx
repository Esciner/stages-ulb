import { Metadata } from "next";
import PlacesPageClient from "@/components/places/PlacesPageClient";

export const metadata: Metadata = {
  title: "Liste des Places Disponibles - ULB Stages",
  description:
    "Découvrez toutes les places disponibles pour les stages à l'ULB. Sélectionnez une place pour voir les détails.",
};

export default async function PlacesPage() {
  return <PlacesPageClient />;
}
