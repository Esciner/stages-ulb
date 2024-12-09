import { NextRequest, NextResponse } from "next/server";
import { Place } from "@/types/api/Place";
import { HydraResponse } from "@/types/api/Hydra";
import apiFetch from "@/libs/apiFetch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await apiFetch<HydraResponse<Place>>(
      `/places?page=${page}`
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
        error: "Failed to fetch places from external API",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}
