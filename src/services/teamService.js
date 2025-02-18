import { apiService } from "./apiService";

export const teamService = {
  getAllTeams: () => apiService.get("/teams"),

  getTeamUpdates: (teamId) => apiService.get(`/team-updates/team/${teamId}`),

  createTeamUpdate: (updateData) =>
    apiService.post("/team-updates", updateData),

  deleteTeamUpdate: (id) => apiService.delete(`/team-updates/${id}`),
};
