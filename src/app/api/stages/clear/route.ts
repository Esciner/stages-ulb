import { NextResponse } from "next/server";
import apiFetch from "@/libs/apiFetch";
import { Stage } from "@/types/api/Stage";
import { fetchAllPages } from "@/utils/stageAllocation";

/**
 * Supprime tous les stages.
 */
export async function DELETE(): Promise<NextResponse> {
  try {
    // Récupérer tous les stages à supprimer
    const allStages = await fetchAllPages<Stage>("/resultats");

    if (allStages.length === 0) {
      return NextResponse.json(
        { message: "No stages to delete." },
        { status: 200 }
      );
    }

    // Extraire les IDs des stages
    const idsToDelete = allStages.map((stage) => stage.id);

    // Supprimer les stages en parallèle
    const deletePromises = idsToDelete.map((id) =>
      apiFetch(`/resultats/${id}`, { method: "DELETE" })
    );
    await Promise.all(deletePromises);

    return NextResponse.json(
      {
        message: "All stages deleted successfully.",
        deletedCount: `${idsToDelete.length} stage(s) deleted`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    const errorMessage = error.response?.data || {
      title: "Unknown Error",
      detail: error.message,
      status: error.response?.status || 500,
    };

    return NextResponse.json(
      {
        error: "Failed to clear all stages",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}
