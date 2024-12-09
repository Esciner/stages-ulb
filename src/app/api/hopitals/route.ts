import { NextRequest, NextResponse } from "next/server";
import { Hopital } from "@/types/api/Hospital";
import { HydraResponse } from "@/types/api/Hydra";
import apiFetch from "@/libs/apiFetch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await apiFetch<HydraResponse<Hopital>>(
      `/hopitals?page=${page}`
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response.data?.detail || error.response.statusText
      : error.message;

    return NextResponse.json(
      {
        error: "Failed to fetch hopitals from external API",
        details: errorMessage,
      },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
