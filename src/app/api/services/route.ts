import { NextRequest, NextResponse } from "next/server";
import apiFetch from "@/libs/apiFetch";
import { Service } from "@/types/api/Service";
import { HydraResponse } from "@/types/api/Hydra";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await apiFetch<HydraResponse<Service>>(
      `/services?page=${page}`
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    return NextResponse.json(
      {
        error: "Failed to fetch services from external API",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
