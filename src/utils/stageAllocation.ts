import { Classement } from "@/types/api/Classement";
import { HydraResponse } from "@/types/api/Hydra";
import { Preference } from "@/types/api/Preference";
import { Place } from "@/types/api/Place";
import { StageRequest } from "@/types/api/Stage";
import apiFetch from "@/libs/apiFetch";
import { calculTotalPage } from "./apiUtils";

/**
 * Fetch all pages of a Hydra API endpoint.
 */
export async function fetchAllPages<T>(endpoint: string): Promise<T[]> {
  // Récupérer la première page
  const response = await apiFetch<HydraResponse<T>>(`${endpoint}?page=1`);

  // Calculer le nombre total de pages
  const totalPages = calculTotalPage(response);

  // Si une seule page, retourner directement les résultats
  if (totalPages === 1) {
    return response["hydra:member"];
  }

  // Préparer les requêtes pour les pages supplémentaires
  const additionalPageRequests = Array.from(
    { length: totalPages - 1 },
    (_, i) => apiFetch<HydraResponse<T>>(`${endpoint}?page=${i + 2}`)
  );

  // Résoudre toutes les requêtes supplémentaires
  const additionalResponses = await Promise.all(additionalPageRequests);

  // Combiner la première page avec les pages suivantes
  return response["hydra:member"].concat(
    additionalResponses.flatMap((res) => res["hydra:member"])
  );
}

/**
 * Find a matching place based on preferences and available places, excluding forbidden places.
 */
function findMatchingPlace(
  preferences: Preference[],
  places: Place[],
  allocatedPlaces: Set<number>,
  excludedPlaces: Set<string>
): Place | undefined {
  for (const preference of preferences) {
    const matchingPlace = places.find(
      (place) =>
        place.hopital === preference.hopital &&
        place.service === preference.service &&
        place.places > 0 &&
        !allocatedPlaces.has(place.id) &&
        !excludedPlaces.has(`${place.hopital}-${place.service}`)
    );

    if (matchingPlace) {
      return matchingPlace;
    }
  }

  return undefined;
}

/**
 * Allocate places for students based on their preferences and ranking.
 */
export async function allocateStages(): Promise<StageRequest[]> {
  const allocatedPlaces = new Set<number>();
  const results: StageRequest[] = [];

  // Fetch data in parallel
  const [classements, preferences, places] = await Promise.all([
    fetchAllPages<Classement>("/classements"),
    fetchAllPages<Preference>("/preferences"),
    fetchAllPages<Place>("/places"),
  ]);

  // Sort students by rank
  classements.sort((a, b) => a.rang - b.rang);

  for (const classement of classements) {
    const studentPreferences = preferences
      .filter((pref) => pref.matricule === classement.matricule)
      .sort((a, b) => a.ordre - b.ordre);

    // Separate preferences and exclusions
    const preferredPlaces = studentPreferences.filter(
      (pref) => pref.typepref === 1
    );
    const excludedPlaces = new Set(
      studentPreferences
        .filter((pref) => pref.typepref === 2)
        .map((pref) => `${pref.hopital}-${pref.service}`)
    );

    // Attempt to find a preferred place
    let placeAllocated = findMatchingPlace(
      preferredPlaces,
      places,
      allocatedPlaces,
      excludedPlaces
    );

    // If no preferred place is available, allocate a non-preferred one
    if (!placeAllocated) {
      placeAllocated = places.find(
        (place) =>
          place.places > 0 &&
          !allocatedPlaces.has(place.id) &&
          !excludedPlaces.has(`${place.hopital}-${place.service}`)
      );
    }

    // As a last resort, allocate an excluded place if no other options exist
    if (!placeAllocated) {
      placeAllocated = places.find(
        (place) => place.places > 0 && !allocatedPlaces.has(place.id)
      );
    }

    if (placeAllocated) {
      results.push({
        matricule: classement.matricule,
        hopital: placeAllocated.hopital,
        service: placeAllocated.service,
      });
      allocatedPlaces.add(placeAllocated.id);
    }
  }

  return results;
}
