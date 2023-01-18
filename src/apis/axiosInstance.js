import axios from "axios";
import { getDataFromLS } from "../utils/localStorage";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getDataFromLS("tech-note-user");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosInstance = instance;
