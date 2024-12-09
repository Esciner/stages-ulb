import { NextRequest, NextResponse } from "next/server";
import { Classement } from "@/types/api/Classement";
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

    const response = await apiFetch<Classement>(`/classements/${id}`);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response.data?.detail || error.response.statusText
      : error.message;

    return NextResponse.json(
      {
        error: "Failed to fetch classement from external API",
        details: errorMessage,
      },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
