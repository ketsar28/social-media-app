import axios from "axios";

// Konfigurasi axios untuk mengatasi respon JSON
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const API_BASE_URL = "http://localhost:8181/api";
const jwtToken = localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});
