import { NextRequest, NextResponse } from "next/server";
import { Classement } from "@/types/api/Classement";
import { HydraResponse } from "@/types/api/Hydra";
import apiFetch from "@/libs/apiFetch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await apiFetch<HydraResponse<Classement>>(
      `/classements?page=${page}`
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response.data?.detail || error.response.statusText
      : error.message;

    return NextResponse.json(
      {
        error: "Failed to fetch classements from external API",
        details: errorMessage,
      },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
