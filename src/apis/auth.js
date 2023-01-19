import { setDataInLS } from "../utils/localStorage";
import { axiosInstance } from "./axiosInstance";

export const register = async (info) => {
  try {
    const { data } = await axiosInstance.post("/users/register", info);

    setDataInLS(data?.token, "access-token");
    return { user: data.message, error: null };
  } catch (error) {
    return {
      error: {
        message: error.response.data.message || error.message,
        status: error.response.status,
      },
      user: null,
    };
  }
};

export const login = async (info) => {
  try {
    const { data } = await axiosInstance.post("/users/login", info);

    setDataInLS(data?.token, "access-token");
    return { user: data.message, error: null };
  } catch (error) {
    return {
      error: {
        message: error.response.data.message || error.message,
        status: error.response.status,
      },
      user: null,
    };
  }
};
