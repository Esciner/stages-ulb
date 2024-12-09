import { Classement } from "@/types/api/Classement";
import { Hopital } from "@/types/api/Hospital";
import { HydraResponse } from "@/types/api/Hydra";
import { Place } from "@/types/api/Place";
import { Preference } from "@/types/api/Preference";
import { Service } from "@/types/api/Service";
import { Stage } from "@/types/api/Stage";

export const calculTotalPage = <T>(data: HydraResponse<T>): number => {
  if (!data["hydra:view"]) {
    return 0; // Pas de pagination, retourne 0
  }

  if (data["hydra:view"]["hydra:last"]) {
    const match = data["hydra:view"]["hydra:last"].match(/page=(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }

  return 1; //retourne 1 s'il y a pagination mais pas d'information sur la dernière page
};

/**
 * Fetch the list of places from the API.
 */
export async function fetchPlaces(page: number): Promise<{
  items: Place[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a place by ID.
 */
export async function fetchPlaceById(id: string): Promise<Place> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch place details");
  }

  return response.json();
}

/**
 * Fetch the list of hospitals from the API.
 */
export async function fetchHopitals(page: number): Promise<{
  items: Hopital[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hopitals?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hopitals");
  }

  const data: HydraResponse<Hopital> = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a hospital by ID.
 */
export async function fetchHopitalById(id: number): Promise<Hopital> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hopitals/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch hospital details for ID: ${id}`);
  }

  return response.json();
}

/**
 * Fetch the list of services from the API.
 */
export async function fetchServices(page: number): Promise<{
  items: Service[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data: HydraResponse<Service> = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a service by ID.
 */
export async function fetchServiceById(id: number): Promise<Service> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch service details for ID: ${id}`);
  }

  return response.json();
}

/**
 * Fetch the list of stages from the API.
 */
export async function fetchStages(page: number): Promise<{
  items: Stage[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stages?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch stages");
  }
  const data = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a stage by ID.
 */
export async function fetchStageById(id: string): Promise<Stage> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stages/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch stage with id ${id}`);
  }
  return response.json();
}

/**
 * Fetch the list of classements from the API.
 */
export async function fetchClassements(page: number): Promise<{
  items: Classement[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classements?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch classements");
  }
  const data = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a classement by ID.
 */
export async function fetchClassementById(id: number): Promise<Classement> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classements/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch classement with id ${id}`);
  }
  return response.json();
}

/**
 * Fetch the list of preferences from the API.
 */
export async function fetchPreferences(page: number): Promise<{
  items: Preference[];
  totalPages: number;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/preferences?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch preferences");
  }
  const data = await response.json();
  const totalPages = calculTotalPage(data);

  return {
    items: data["hydra:member"],
    totalPages,
  };
}

/**
 * Fetch details of a preference by ID.
 */
export async function fetchPreferenceById(id: number): Promise<Preference> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/preferences/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch preference with id ${id}`);
  }
  return response.json();
}
