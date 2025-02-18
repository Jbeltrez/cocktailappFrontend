const API_URL = "http://localhost:8080/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Auto logout if 401 response returned from api
      localStorage.removeItem("token");
      window.location.reload();
    }
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiService = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    return handleResponse(response);
  },
};
