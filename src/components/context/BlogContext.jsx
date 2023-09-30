import { createContext, useEffect, useRef, useState } from "react";
import { getTotalBlogCount } from "../../apis/blog";
import { getCategories, getCategoryCount } from "../../apis/categories";
import { pageCounter } from "../../utils/pageCounter";

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

  const [categories, setCategories] = useState([]);
  const [totalCategoryPage, setTotalCategoryPage] = useState(0);
  const [categoryCurrentPage, setCategoryCurrentPage] = useState(-1);
  const categoryPageTracker = useRef(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loadCategory, setLoadCategory] = useState(false);
  const [loadAllCounts, setAllCounts] = useState(false);

  // for home page
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchArea, setSearchArea] = useState("general");

  useEffect(() => {
    const get = async () => {
      const { count: approveCount } = await getTotalBlogCount("approved");
      const { count: pendingCount } = await getTotalBlogCount("pending");
      const { count: categoryCount } = await getCategoryCount();

      console.log(approveCount, pendingCount, categoryCount);

      setApprovedBlogsTotalPage(pageCounter(approveCount, rowsPerPage));
      setPendingBlogsTotalPage(pageCounter(pendingCount, rowsPerPage));
      setTotalCategoryPage(pageCounter(categoryCount, rowsPerPage));
    };
    // if (loadAllCounts)
    get();

    // return () => {
    //   setAllCounts(true);
    // };
  }, [rowsPerPage]);

  useEffect(() => {
    // if (loadCategory) {
    getCategories(rowsPerPage, 0).then((data) => {
      setCategories(data.categories);
      console.log(data.categories);
      setCategoryCurrentPage((prev) => prev + 1);
    });
    // }

    // return () => {
    //   setLoadCategory(true);
    // };
  }, [rowsPerPage]);

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
    totalCategoryPage,
    setTotalCategoryPage,
    categoryCurrentPage,
    setCategoryCurrentPage,
    categoryPageTracker,
    searchTerm,
    setSearchTerm,
    searchArea,
    setSearchArea,
  };

  return <blogContext.Provider value={values}>{children}</blogContext.Provider>;
};

export default BlogContext;
