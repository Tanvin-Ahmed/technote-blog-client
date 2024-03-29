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
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getAllBlogs = async (
  category = "",
  status = "approved",
  limit,
  offset,
  search = ""
) => {
  console.log(
    "category: " + category,
    "status: " + status,
    "limit: " + limit,
    "offset: " + offset,
    "search: " + search
  );
  try {
    const { data } = await axiosInstance.get(
      `/post?cat=${category}&status=${status}&limit=${limit}&offset=${offset}&search=${search}`
    );
    console.log(data);

    return {
      blogs: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      blogs: [],
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getTotalBlogCount = async (status) => {
  try {
    const { data } = await axiosInstance.get(`/post/get-count/${status}`);

    return {
      count: data.count,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getTotalSearchedBlogCount = async (status, search) => {
  try {
    const { data } = await axiosInstance.get(
      `/post/get-searched-count?status=${status}&search=${search}`
    );

    return {
      count: data.count,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getTotalSearchedCategoryWiseBlogCount = async (status, search) => {
  try {
    const { data } = await axiosInstance.get(
      `/post/get-searched-category-wise-blog-count?status=${status}&search=${search}`
    );

    return {
      count: data.count,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getTotalBlogCountByCategory = async (category) => {
  try {
    const { data } = await axiosInstance.get(
      `/post/get-count-by-category/${category}`
    );

    return {
      count: data.count,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getMyBlogsCount = async (status) => {
  try {
    const { data } = await axiosInstance.get(
      `post/get-posts-count-by-user?status=${status}`
    );

    return {
      count: data.count || 0,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getMyBlogs = async (status, limit, offset) => {
  try {
    const { data } = await axiosInstance.get(
      `post/get-posts-by-user?status=${status}&limit=${limit}&offset=${offset}`
    );

    return {
      blogs: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      blogs: [],
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const getSingleBlog = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/post/single/${id}`);

    return {
      blog: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      blog: {},
      errorMessage: error?.response?.data?.message || error.message,
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
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};

export const approveBlog = async (updateInfo) => {
  try {
    const { data } = await axiosInstance.put("/post/approve-blog", updateInfo);
    return {
      message: data.message,
      errorMessage: null,
    };
  } catch (error) {
    return {
      message: null,
      errorMessage: error?.response?.data?.message || error.message,
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
      errorMessage: error?.response?.data?.message || error.message,
    };
  }
};
