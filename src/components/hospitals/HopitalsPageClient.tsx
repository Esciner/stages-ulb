"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import { Hopital } from "@/types/api/Hospital";
import { fetchHopitals } from "@/utils/apiUtils";

export default function HopitalsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [hopitalsData, setHopitalsData] = React.useState<{
    items: Hopital[];
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
        const data = await fetchHopitals(currentPage);
        setHopitalsData(data);
      } catch (error) {
        console.error("Error fetching hopitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/hopitals?page=${page}`);
  };

  const { items: hopitals, totalPages } = hopitalsData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Hôpitaux
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hopitals.map((hopital) => (
              <li
                key={hopital.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  Hôpital: {hopital.nomcourt}
                </h2>
                <Link
                  href={`/hopitals/${hopital.id}`}
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
            baseUrl="/hopitals"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
