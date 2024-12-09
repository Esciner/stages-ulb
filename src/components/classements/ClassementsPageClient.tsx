"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import { Classement } from "@/types/api/Classement";
import { fetchClassements } from "@/utils/apiUtils";
import Link from "next/link";

export default function ClassementsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [classementsData, setClassementsData] = useState<{
    items: Classement[];
    totalPages: number;
  }>({ items: [], totalPages: 1 });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchClassements(currentPage);
        setClassementsData(data);
      } catch (error) {
        console.error("Error fetching classements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/classements?page=${page}`);
  };

  const { items: classements, totalPages } = classementsData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Classements
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classements.map((classement) => (
              <li
                key={classement.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  Matricule: {classement.matricule}
                </h2>
                <p className="text-gray-700">Rang: {classement.rang}</p>
                <Link
                  href={`/classements/${classement.id}`}
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
            baseUrl="/classements"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
