"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { fetchServices } from "@/utils/apiUtils";
import Pagination from "@/components/pagination/Pagination";
import { Service } from "@/types/api/Service";

export default function ServicesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [servicesData, setServicesData] = React.useState<{
    items: Service[];
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
        const data = await fetchServices(currentPage);
        setServicesData(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/services?page=${page}`);
  };

  const { items: services, totalPages } = servicesData;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Liste des Services
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <li
                key={service.id}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  Service: {service.nom}
                </h2>
                <Link
                  href={`/services/${service.id}`}
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
            baseUrl="/services"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
