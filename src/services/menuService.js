import { apiService } from "./apiService";

export const menuService = {
  getAllMenus: () => apiService.get("/menus"),

  getMenuById: (id) => apiService.get(`/menus/${id}`),

  createMenu: (menuData) => apiService.post("/menus", menuData),

  updateMenu: (id, menuData) => apiService.put(`/menus/${id}`, menuData),

  deleteMenu: (id) => apiService.delete(`/menus/${id}`),

  addDrinkToMenu: (menuId, drinkData) =>
    apiService.post(`/menus/${menuId}/drinks`, drinkData),

  removeDrinkFromMenu: (menuId, drinkId) =>
    apiService.delete(`/menus/${menuId}/drinks/${drinkId}`),

  updateDrinkInMenu: (menuId, drinkId, drinkData) =>
    apiService.put(`/menus/${menuId}/drinks/${drinkId}`, drinkData),
};
