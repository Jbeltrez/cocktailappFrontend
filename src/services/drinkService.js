import { apiService } from "./apiService";

export const drinkService = {
  getAllDrinks: () => apiService.get("/drinks"),

  getDrinkById: (id) => apiService.get(`/drinks/${id}`),

  createDrink: (drinkData) => apiService.post("/drinks", drinkData),

  updateDrink: (id, drinkData) => apiService.put(`/drinks/${id}`, drinkData),

  deleteDrink: (id) => apiService.delete(`/drinks/${id}`),
};
