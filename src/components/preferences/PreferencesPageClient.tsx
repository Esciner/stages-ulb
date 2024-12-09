"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import { Preference } from "@/types/api/Preference";
import {
  fetchPreferences,
  fetchHopitalById,
  fetchServiceById,
} from "@/utils/apiUtils";

export default function PreferencesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [preferencesData, setPreferencesData] = React.useState<{
    items: (Preference & {
      hopitalName: string;
      serviceName: string;
    })[];
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
        const data = await fetchPreferences(currentPage);

        // Fetch hospital and service names for each preference
        const preferencesWithDetails = await Promise.all(
          data.items.map(async (preference) => {
            const [hopital, service] = await Promise.all([
              fetchHopitalById(preference.hopital),
              fetchServiceById(preference.service),
            ]);
            return {
              ...preference,
              hopitalName: hopital.nomcourt,
              serviceName: service.nom,
            };
          })
        );

        setPreferencesData({
          items: preferencesWithDetails,
          totalPages: data.totalPages,
        });
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/preferences?page=${page}`);
  };

  const { items: preferences, totalPages } = preferencesData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Préférences et Exclusions
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preferences.map((preference) => (
              <li
                key={preference.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {preference.typepref === 1 ? "Préférence" : "Exclusion"}
                </h2>
                <p className="text-gray-700">
                  <strong>Hôpital:</strong> {preference.hopitalName}
                </p>
                <p className="text-gray-700">
                  <strong>Service:</strong> {preference.serviceName}
                </p>
                <p className="text-gray-500">
                  <strong>Ordre:</strong> {preference.ordre}
                </p>
                <p className="text-gray-500">
                  <strong>Matricule:</strong> {preference.matricule}
                </p>
                <Link
                  href={`/preferences/${preference.id}`}
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
            baseUrl="/preferences"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
