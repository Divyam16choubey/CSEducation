import axios from "axios";

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler
API.interceptors.response.use(
  (response) => {
    // If server returned an HTML document instead of JSON (e.g. Vite SPA fallback when backend proxy is missing)
    const contentType = response.headers?.["content-type"] || "";
    if (
      typeof response.data === "string" &&
      (contentType.includes("text/html") ||
        response.data.trim().startsWith("<!DOCTYPE") ||
        response.data.trim().startsWith("<html"))
    ) {
      return Promise.reject({
        message: "Invalid API response: received HTML document instead of expected JSON data",
        status: response.status,
      });
    }
    return response;
  },
  (error) => {
    const status = error.response?.status || error.status;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    // Auto-clear invalid or expired token on 401
    if (status === 401 && localStorage.getItem("adminToken")) {
      localStorage.removeItem("adminToken");
    }

    return Promise.reject({ message, status });
  }
);

export default API;
