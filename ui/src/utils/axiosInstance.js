import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

// Attach the JWT (if we have one) to every outgoing request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is missing/expired, the server responds 401 — clear stale auth
// and send the user back to login instead of leaving them stuck on a broken page.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("info");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
