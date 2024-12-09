"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { Stage } from "@/types/api/Stage";
import {
  fetchStages,
  fetchHopitalById,
  fetchServiceById,
} from "@/utils/apiUtils";

export default function StagePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [stagesData, setStagesData] = React.useState<{
    items: (Stage & { hopitalName: string; serviceName: string })[];
    totalPages: number;
  }>({
    items: [],
    totalPages: 1,
  });

  const [loading, setLoading] = React.useState(false);
  const [allocating, setAllocating] = React.useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchStages(page);

      // Fetch hospital and service names for each stage
      const stagesWithDetails = await Promise.all(
        data.items.map(async (stage) => {
          const [hopital, service] = await Promise.all([
            fetchHopitalById(stage.hopital),
            fetchServiceById(stage.service),
          ]);
          return {
            ...stage,
            hopitalName: hopital.nomcourt,
            serviceName: service.nom,
          };
        })
      );

      setStagesData({
        items: stagesWithDetails,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching stages:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleAllocateStages = async () => {
    setAllocating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stages`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Failed to allocate stages");
      }

      await fetchData(1);
      router.push(`/stages?page=1`);
    } catch (error) {
      console.error("Error allocating stages:", error);
    } finally {
      setAllocating(false);
    }
  };

  const handlePageChange = (page: number) => {
    router.push(`/stages?page=${page}`);
  };

  const { items: stages, totalPages } = stagesData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Stages
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : stages.length === 0 ? (
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-700">
            Aucun stage n&apos;est disponible
          </h2>
          <p className="text-gray-600 mt-2">
            Aucun stage n&apos;a été trouvé pour le moment. Cliquez sur le
            bouton ci-dessous pour attribuer des stages.
          </p>
          <button
            onClick={handleAllocateStages}
            disabled={allocating}
            className={`mt-4 px-6 py-2 text-white font-semibold rounded-md shadow-md ${
              allocating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition duration-300"
            }`}
          >
            {allocating ? "Attribution en cours..." : "Attribuer les stages"}
          </button>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <li
                key={stage.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  Étudiant : {stage.matricule}
                </h2>
                <p className="text-gray-700">Hôpital : {stage.hopitalName}</p>
                <p className="text-gray-700">Service : {stage.serviceName}</p>
                <Link
                  href={`/stages/${stage.id}`}
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
            baseUrl="/stages"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
