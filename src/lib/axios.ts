import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
//   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use(
  (config) => {
    // If later you add authentication
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common backend errors globally

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized - Redirect to login");
        // Optional: window.location.href = "/login";
      }

      if (status === 500) {
        console.error("Server error");
      }
    }

    return Promise.reject(error);
  }
);

export default api;