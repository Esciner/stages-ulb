"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import { Place } from "@/types/api/Place";
import {
  fetchPlaces,
  fetchHopitalById,
  fetchServiceById,
} from "@/utils/apiUtils";

export default function PlacesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [placesData, setPlacesData] = React.useState<{
    items: (Place & { hopitalName: string; serviceName: string })[];
    totalPages: number;
  }>({
    items: [],
    totalPages: 1,
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPlaces(currentPage);

        // Fetch hospital and service names for each place
        const placesWithDetails = await Promise.all(
          data.items.map(async (place) => {
            const [hopital, service] = await Promise.all([
              fetchHopitalById(place.hopital),
              fetchServiceById(place.service),
            ]);
            return {
              ...place,
              hopitalName: hopital.nomcourt,
              serviceName: service.nom,
            };
          })
        );

        setPlacesData({
          items: placesWithDetails,
          totalPages: data.totalPages,
        });
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/places?page=${page}`);
  };

  const { items: places, totalPages } = placesData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Places Disponibles
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <li
                key={place.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  Hôpital: {place.hopitalName}
                </h2>
                <p className="text-gray-700">Service: {place.serviceName}</p>
                <p className="text-gray-500">
                  Places restantes: {place.places}
                </p>
                <Link
                  href={`/places/${place.id}`}
                  className="mt-3 inline-block text-blue-500 hover:underline"
                >
                  Voir les détails
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/places"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
