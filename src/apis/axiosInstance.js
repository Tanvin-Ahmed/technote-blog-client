import axios from "axios";
import { getDataFromLS } from "../utils/localStorage";
// https://technote-blog-server.vercel.app/
const instance = axios.create({
  baseURL: "https://technote-blog-server.vercel.app/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getDataFromLS("access-token");

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
