import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    if (err.response?.status === 401 && !url.includes("/auth/")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// Auth
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

// Bikes
export const getBikes = () => api.get("/bikes");
export const getBike = (id) => api.get(`/bikes/${id}`);
export const createBike = (data) => api.post("/bikes", data);
export const updateBike = (id, data) => api.put(`/bikes/${id}`, data);
export const deleteBike = (id) => api.delete(`/bikes/${id}`);

// Rentals
export const rentBike = (bikeId) => api.post("/rentals/rent", { bikeId });
export const returnBike = (rentalId, totalKm) =>
  api.post("/rentals/return", { rentalId, totalKm });
export const getRentalHistory = () => api.get("/rentals/history");
export const getActiveRental = () => api.get("/rentals/active");

export default api;
