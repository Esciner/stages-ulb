import { Metadata } from "next";
import StagePageClient from "@/components/stages/StagePageClient";

export const metadata: Metadata = {
  title: "Liste des Stages - ULB Stages",
  description:
    "Découvrez tous les stages attribués à l'ULB. Consultez les détails des stages avec les noms des hôpitaux et services.",
};

export default function StagePage() {
  return <StagePageClient />;
}
