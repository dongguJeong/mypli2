import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
