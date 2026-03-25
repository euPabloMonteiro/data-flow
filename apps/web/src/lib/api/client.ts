import axios from "axios";
import { env } from "../../env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login?session_expired=true";
        }
      }
    }
    return Promise.reject(error);
  },
);
