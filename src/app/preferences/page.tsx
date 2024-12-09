import { Metadata } from "next";
import PreferencesPageClient from "@/components/preferences/PreferencesPageClient";

export const metadata: Metadata = {
  title: "Liste des Préférences - ULB Stages",
  description:
    "Découvrez les préférences et exclusions des étudiants pour leurs stages. Sélectionnez une préférence pour voir ses détails.",
};

export default function PreferencesPage() {
  return <PreferencesPageClient />;
}
