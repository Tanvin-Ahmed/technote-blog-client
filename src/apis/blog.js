import { axiosInstance } from "./axiosInstance";

export const uploadBlog = async (info) => {
  try {
    const { data } = await axiosInstance.post("/post/create", info);

    return {
      blog: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      blog: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const getAllBlogs = (category = "") => {
  try {
    const { data } = axiosInstance.get(`/post?cat=${category}`);

    return {
      blogs: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      blogs: [],
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const getSingleBlog = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/post/${id}`);
    return {
      blog: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      blog: {},
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const updateBlog = async (updateInfo) => {
  try {
    const { data } = await axiosInstance.put("/post/update", updateInfo);
    return {
      message: data.message,
      errorMessage: null,
    };
  } catch (error) {
    return {
      message: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const deleteBlog = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/post/delete/${id}`);

    return {
      message: data.message,
      errorMessage: null,
    };
  } catch (error) {
    return {
      message: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};
