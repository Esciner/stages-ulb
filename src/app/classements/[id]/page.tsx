import { Metadata } from "next";
import { fetchClassementById } from "@/utils/apiUtils";

interface ClassementDetailsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ClassementDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const classement = await fetchClassementById(parseInt(id));

  return {
    title: `Détails du Classement #${classement.id} - Matricule: ${classement.matricule}`,
    description: `Explorez les détails du classement de l'étudiant avec le matricule ${classement.matricule}. Rang: ${classement.rang}.`,
  };
}

export default async function ClassementDetailsPage({
  params,
}: ClassementDetailsProps) {
  const { id } = await params;
  const classement = await fetchClassementById(parseInt(id));

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Détails du Classement #{classement.id}
      </h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <p className="text-lg">
          <strong>Matricule:</strong> {classement.matricule}
        </p>
        <p className="text-lg">
          <strong>Rang:</strong> {classement.rang}
        </p>
      </div>
      <div className="mt-6">
        <a href="/classements" className="text-blue-500 hover:underline">
          Retour à la liste des classements
        </a>
      </div>
    </div>
  );
}
