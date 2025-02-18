import { apiService } from "./apiService";

export const categoryService = {
  getAllCategories: () => apiService.get("/categories"),
};
