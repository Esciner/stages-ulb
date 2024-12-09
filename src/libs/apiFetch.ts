const BASE_URL = process.env.API_URL || "";
const API_TOKEN = process.env.API_AUTH_TOKEN || "";
const IS_DEV = process.env.NODE_ENV === "development";

function logRequest(url: string, config: RequestInit) {
  if (IS_DEV) {
    console.log(
      "Full Request Config:",
      JSON.stringify({ url, ...config }, null, 2)
    );
  }
}

function logResponse(url: string, response: Response, data: any) {
  if (IS_DEV) {
    console.log("Response for:", url);
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(data, null, 2));
  }
}

function logError(url: string, error: any) {
  if (IS_DEV) {
    console.error("Error for:", url);
    console.error("Details:", error);
  }
}

/**
 * Fonction générique pour effectuer des requêtes HTTP
 * @param endpoint - URL relative de l'API
 * @param options - Options de la requête (méthode, headers, body, etc.)
 * @returns La réponse sous forme JSON
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    Authorization: API_TOKEN,
    "Content-Type": "application/ld+json",
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  logRequest(url, config);

  try {
    const response = await fetch(url, config);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      logError(url, data || response.statusText);
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText} - ${
          data?.detail || "No additional error details"
        }`
      );
    }

    logResponse(url, response, data);

    return data;
  } catch (error) {
    logError(url, error);
    throw error;
  }
}

export default apiFetch;
