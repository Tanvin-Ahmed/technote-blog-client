import { axiosInstance } from "./axiosInstance";

export const register = async (info) => {
  try {
    const { data } = await axiosInstance.post("/users/register", info);

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
