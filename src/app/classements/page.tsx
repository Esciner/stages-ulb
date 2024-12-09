import { Metadata } from "next";
import ClassementsPageClient from "@/components/classements/ClassementsPageClient";

export const metadata: Metadata = {
  title: "Liste des Classements - ULB Stages",
  description:
    "Découvrez le classement des étudiants pour les stages à l'ULB. Sélectionnez un étudiant pour voir les détails de son classement.",
};

export default function ClassementsPage() {
  return <ClassementsPageClient />;
}
