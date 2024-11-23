const API_BASE_URL = "http://localhost:4000/api";

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  },
};
