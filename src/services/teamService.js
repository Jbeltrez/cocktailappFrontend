import { apiService } from "./apiService";

export const teamService = {
  getAllTeams: async () => {
    try {
      const response = await fetch("http://localhost:8080/api/teams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }

      const data = await response.json();
      console.log("Teams fetched:", data); // Debug log
      return data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamUpdates: (teamId) => apiService.get(`/team-updates/team/${teamId}`),

  createTeamUpdate: async (updateData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/team-updates/team/${updateData.teamId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create team update");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating team update:", error);
      throw error;
    }
  },

  deleteTeamUpdate: (id) => apiService.delete(`/team-updates/${id}`),
};
