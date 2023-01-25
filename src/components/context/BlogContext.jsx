import React, { createContext, useEffect, useRef, useState } from "react";
import { getTotalBlogCount } from "../../apis/blog";
import { getCategories } from "../../apis/categories";

export const blogContext = createContext();

const BlogContext = ({ children }) => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [pendingBlogsTotalPage, setPendingBlogsTotalPage] = useState(0);
  const [pendingBlogsCurrentPage, setPendingBlogsCurrentPage] = useState(0);
  const pendingBlogPageTracker = useRef(-1);

  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [approvedBlogsTotalPage, setApprovedBlogsTotalPage] = useState(0);
  const [approvedBlogsCurrentPage, setApprovedBlogsCurrentPage] = useState(0);
  const blogPageTracker = useRef(-1);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const get = async () => {
      const { count: approveCount } = await getTotalBlogCount("approved");
      const { count: pendingCount } = await getTotalBlogCount("pending");

      setApprovedBlogsTotalPage(Math.ceil(approveCount / rowsPerPage));
      setPendingBlogsTotalPage(Math.ceil(pendingCount / rowsPerPage));
    };
    get();
  }, [rowsPerPage]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  const values = {
    pendingBlogs,
    setPendingBlogs,
    pendingBlogsTotalPage,
    setPendingBlogsTotalPage,
    pendingBlogsCurrentPage,
    setPendingBlogsCurrentPage,
    approvedBlogs,
    setApprovedBlogs,
    approvedBlogsTotalPage,
    setApprovedBlogsTotalPage,
    approvedBlogsCurrentPage,
    setApprovedBlogsCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    categories,
    setCategories,
    pendingBlogPageTracker,
    blogPageTracker,
  };

  return <blogContext.Provider value={values}>{children}</blogContext.Provider>;
};

export default BlogContext;
