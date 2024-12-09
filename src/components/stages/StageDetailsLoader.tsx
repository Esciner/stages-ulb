"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/types/api/Stage";
import {
  fetchStageById,
  fetchHopitalById,
  fetchServiceById,
} from "@/utils/apiUtils";
import StageDetailsClient from "@/components/stages/StageDetailsClient";

interface StageDetailsLoaderProps {
  id: string;
}

export default function StageDetailsLoader({ id }: StageDetailsLoaderProps) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage | null>(null);
  const [hopitalName, setHopitalName] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const stageData = await fetchStageById(id);
        setStage(stageData);

        const [hopital, service] = await Promise.all([
          fetchHopitalById(stageData.hopital),
          fetchServiceById(stageData.service),
        ]);

        setHopitalName(hopital.nomcourt);
        setServiceName(service.nom);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError("Une erreur est survenue lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-700">{error}</h2>
        <button
          onClick={() => router.push("/stages")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Retour à la liste des stages
        </button>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-700">
          Aucun stage trouvé
        </h2>
        <button
          onClick={() => router.push("/stages")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Retour à la liste des stages
        </button>
      </div>
    );
  }

  return (
    <StageDetailsClient
      stage={stage}
      hopitalName={hopitalName}
      serviceName={serviceName}
    />
  );
}
