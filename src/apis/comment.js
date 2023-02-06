import moment from "moment";
import { axiosInstance } from "./axiosInstance";

export const postComment = async (info) => {
  try {
    const commentInfo = {
      ...info,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    const { data } = await axiosInstance.post("/comments/create", commentInfo);

    return {
      comment: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      comment: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const getCommentCount = async (blog_id) => {
  try {
    const { data } = await axiosInstance.get(`/comments/get-count/${blog_id}`);

    return {
      count: data.count,
      errorMessage: null,
    };
  } catch (error) {
    return {
      count: 0,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const getCommentsByBlogId = async (blog_id, limit, offset) => {
  try {
    const { data } = await axiosInstance.get(
      `/comments/get?post_id=${blog_id}&limit=${limit}&offset=${offset}`
    );

    return {
      comments: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      comments: [],
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const updateComment = async (info) => {
  try {
    const commentInfo = {
      ...info,
      updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };
    const { data } = await axiosInstance.put(`/comments/update`, commentInfo);

    return {
      comment: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      comment: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};

export const deleteComment = async (id, userId, adminId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/comments/delete?id=${id}&user_id=${userId}&admin_id=${adminId}`
    );

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
