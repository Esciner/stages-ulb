import { NextRequest, NextResponse } from "next/server";
import { Service } from "@/types/api/Service";
import apiFetch from "@/libs/apiFetch";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const response = await apiFetch<Service>(`/services/${id}`, {
      next: { revalidate: 300 },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || {
      title: "Unknown Error",
      detail: error.message,
      status: error.response?.status || 500,
    };

    return NextResponse.json(
      {
        error: "Failed to fetch service from external API",
        details: errorMessage,
      },
      { status: errorMessage.status || 500 }
    );
  }
}
