import { Metadata } from "next";
import {
  fetchHopitalById,
  fetchPlaceById,
  fetchServiceById,
} from "@/utils/apiUtils";

interface PlaceDetailsProps {
  params: { id: string };
}
export async function generateMetadata({
  params,
}: PlaceDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const place = await fetchPlaceById(id);
  const hopital = await fetchHopitalById(place.hopital);
  const service = await fetchServiceById(place.service);

  return {
    title: `Détails de la Place #${place.id} - ${hopital.nomcourt} - ${service.nom}`,
    description: `Découvrez les détails de la place disponible à l'Hôpital ${hopital.nomcourt}, Service ${service.nom}.`,
  };
}

export default async function PlaceDetailsPage({ params }: PlaceDetailsProps) {
  const { id } = await params;
  const place = await fetchPlaceById(id);
  const hopital = await fetchHopitalById(place.hopital);
  const service = await fetchServiceById(place.service);

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Détails de la Place #{place.id}
      </h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <p className="text-lg">
          <strong>Hôpital:</strong> {hopital.nomcourt}
        </p>
        <p className="text-lg">
          <strong>Service:</strong> {service.nom}
        </p>
        <p className="text-lg">
          <strong>Places restantes:</strong> {place.places}
        </p>
      </div>
      <div className="mt-6">
        <a href="/places" className="text-blue-500 hover:underline">
          Retour à la liste des places
        </a>
      </div>
    </div>
  );
}
