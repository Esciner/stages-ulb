"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/types/api/Stage";

interface StageDetailsClientProps {
  stage: Stage;
  hopitalName: string;
  serviceName: string;
}

export default function StageDetailsClient({
  stage,
  hopitalName,
  serviceName,
}: StageDetailsClientProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce stage ?"
    );

    if (!confirmation) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stages/${stage.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la suppression du stage");
      }

      alert("Stage supprimé avec succès");
      router.push("/stages");
    } catch (error) {
      console.error("Erreur lors de la suppression du stage :", error);
      alert("Une erreur est survenue lors de la suppression du stage");
    }
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Détails du Stage #{stage.id}
      </h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <p className="text-lg">
          <strong>Étudiant (Matricule):</strong> {stage.matricule}
        </p>
        <p className="text-lg">
          <strong>Hôpital:</strong> {hopitalName}
        </p>
        <p className="text-lg">
          <strong>Service:</strong> {serviceName}
        </p>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/stages")}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Retour à la liste des stages
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-300"
        >
          Supprimer ce stage
        </button>
      </div>
    </div>
  );
}
