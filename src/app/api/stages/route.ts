import { NextRequest, NextResponse } from "next/server";
import { Stage } from "@/types/api/Stage";
import { HydraResponse } from "@/types/api/Hydra";
import { allocateStages } from "@/utils/stageAllocation";
import apiFetch from "@/libs/apiFetch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await apiFetch<HydraResponse<Stage>>(
      `/resultats?page=${page}`
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || {
      title: "Unknown Error",
      detail: error.message,
      status: error.response?.status || 500,
    };

    return NextResponse.json(
      {
        error: "Failed to fetch resultats from external API",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}

export async function POST(): Promise<NextResponse> {
  try {
    const results = await allocateStages();

    for (const result of results) {
      await apiFetch("/resultats", {
        method: "POST",
        body: JSON.stringify(result),
      });
    }

    return NextResponse.json(
      { message: "Attributions completed successfully", results },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error.response?.data || {
      title: "Unknown Error",
      detail: error.message,
      status: error.response?.status || 500,
    };

    console.error("Error during attributions:", errorMessage);

    return NextResponse.json(
      {
        error: "Failed to complete attributions",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    if (!Array.isArray(body) || body.some((id) => isNaN(Number(id)))) {
      return NextResponse.json(
        { error: "Invalid input. Provide an array of numeric IDs." },
        { status: 400 }
      );
    }

    const deletePromises = body.map((id) =>
      apiFetch(`/resultats/${id}`, { method: "DELETE" })
    );

    await Promise.all(deletePromises);

    return NextResponse.json(
      { message: "Stages deleted successfully", deletedIds: body },
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
        error: "Failed to delete stages in bulk",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}
