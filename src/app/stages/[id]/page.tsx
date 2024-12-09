import { Metadata } from "next";
import StageDetailsLoader from "@/components/stages/StageDetailsLoader";

interface StageDetailsPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: StageDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Détails du Stage #${id}`,
    description: `Explorez les détails du stage sélectionné.`,
  };
}

export default function StageDetailsPage({ params }: StageDetailsPageProps) {
  return <StageDetailsLoader id={params.id} />;
}
