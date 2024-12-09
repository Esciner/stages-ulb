// Fonction pour simuler un délai
export const simulateLatency = async (ms: number) => {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
};
