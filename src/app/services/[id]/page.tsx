import { Metadata } from "next";
import { fetchServiceById } from "@/utils/apiUtils";

interface ServiceDetailsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ServiceDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const service = await fetchServiceById(parseInt(id));

  return {
    title: `Détails du Service #${service.id} - ${service.nom}`,
    description: `Explorez les détails du service ${service.nom}.`,
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsProps) {
  const { id } = await params;
  const service = await fetchServiceById(parseInt(id));

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Détails du Service #{service.id}
      </h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <p className="text-lg">
          <strong>Nom du Service:</strong> {service.nom}
        </p>
        <p className="text-lg">
          <strong>Identifiant:</strong> {service.id}
        </p>
      </div>
      <div className="mt-6">
        <a href="/services" className="text-blue-500 hover:underline">
          Retour à la liste des services
        </a>
      </div>
    </div>
  );
}
