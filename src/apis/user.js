import { axiosInstance } from "./axiosInstance";

export const register = async (info) => {
  try {
    const user = await axiosInstance.post("/users/register", info);

    return { user, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: error.response.data.message,
      user: null,
    };
  }
};

export const login = async (info) => {
  try {
    const user = await axiosInstance.post("/users/login", info);

    return { user, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: error.response.data.message,
      user: null,
    };
  }
};
