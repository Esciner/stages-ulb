import { Metadata } from "next";
import { fetchHopitalById } from "@/utils/apiUtils";

interface HopitalDetailsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: HopitalDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const hopital = await fetchHopitalById(parseInt(id));

  return {
    title: `Détails de l'Hôpital #${hopital.id} - ${hopital.nomcourt}`,
    description: `Découvrez les détails de l'Hôpital ${hopital.nomcourt}, incluant son adresse et ses spécifications.`,
  };
}

export default async function HopitalDetailsPage({
  params,
}: HopitalDetailsProps) {
  const { id } = await params;
  const hopital = await fetchHopitalById(parseInt(id));

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Détails de l&apos;Hôpital #{hopital.id}
      </h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <p className="text-lg">
          <strong>Nom de l&apos;Hôpital:</strong> {hopital.nomcourt}
        </p>
      </div>
      <div className="mt-6">
        <a href="/hopitals" className="text-blue-500 hover:underline">
          Retour à la liste des hôpitaux
        </a>
      </div>
    </div>
  );
}
