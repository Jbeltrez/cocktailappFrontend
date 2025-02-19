import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to handle auth
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle the data property
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the data property of the response
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response);
    return Promise.reject(error);
  }
);

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

// Remove the import at the top and just export directly
export const apiService = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};
