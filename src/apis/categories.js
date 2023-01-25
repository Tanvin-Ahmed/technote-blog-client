import { axiosInstance } from "./axiosInstance";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get(`/categories`);
    return {
      categories: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      categories: [],
      errorMessage: "Categories not found",
    };
  }
};

export const getCategoriesBySearch = async (search = "") => {
  try {
    const { data } = await axiosInstance.get(`/categories/search/${search}`);
    return {
      categories: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      categories: [],
      errorMessage: "Categories not found",
    };
  }
};

export const createNewCategory = async (category) => {
  try {
    const { data } = await axiosInstance.post("/categories/create", {
      category,
    });

    return {
      category: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      category: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/categories/delete/${id}`);

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

export const updateCategory = async (info) => {
  try {
    const { data } = await axiosInstance.put("/categories/update", info);

    return {
      category: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      category: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};
