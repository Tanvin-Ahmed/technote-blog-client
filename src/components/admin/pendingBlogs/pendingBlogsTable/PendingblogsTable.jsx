import {
  faCheckSquare,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllBlogs } from "../../../../apis/blog";
import { getSubString } from "../../../../utils/getSubString";
import { textToHtml } from "../../../../utils/textToHtml";
import { blogContext } from "../../../context/BlogContext";
import CustomAlert from "../../../shared/customAlert/CustomAlert";
import Loader from "../../../shared/loader/Loader";
import Paginate from "../../../shared/paginate/Paginate";
import PendingBlogPreviewModal from "../pendingBlogPreviewModal/PendingBlogPreviewModal";

const PendingblogsTable = () => {
  const { pageNumber } = useParams();
  const {
    pendingBlogs,
    setPendingBlogs,
    pendingBlogsTotalPage,
    pendingBlogsCurrentPage,
    setPendingBlogsCurrentPage,
    rowsPerPage,
  } = useContext(blogContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});

  const handleModalOpen = (blog) => {
    setSelectedBlog({
      ...blog,
      img: blog?.img && JSON.parse(blog?.img),
      authorImg: blog?.authorImg && JSON.parse(blog?.authorImg),
    });
    setIsOpen(true);
  };

  const handleApprove = (id) => {
    // approve api call
  };
  const handleRemove = (id) => {
    // remove api call
  };

  useEffect(() => {
    setPendingBlogsCurrentPage(pageNumber);
  }, [setPendingBlogsCurrentPage, pageNumber]);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const { blogs, errorMessage } = await getAllBlogs(
        "",
        "pending",
        rowsPerPage,
        (pendingBlogsCurrentPage - 1) * rowsPerPage
      );
      if (blogs.length) {
        setPendingBlogs((prev) => [...prev, ...blogs]);
      }
      setError(errorMessage);
      setLoading(false);
    };
    get();
  }, [setPendingBlogs, pendingBlogsCurrentPage, rowsPerPage]);

  return (
    <div>
      {/* table pagination */}
      {/* (rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map() */}

      <h3 className="text-center mb-5">Manage Pending Blogs</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert variant={"danger"} message={error} />
      ) : (
        <table className="table table-hover text-center border-shadow rounded">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">User Name</th>
              <th scope="col">Blog Title</th>
              <th scope="col">Blog description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingBlogs.length > 0 &&
              (rowsPerPage > 0
                ? pendingBlogs.slice(
                    (pendingBlogsCurrentPage - 1) * rowsPerPage,
                    (pendingBlogsCurrentPage - 1) * rowsPerPage + rowsPerPage
                  )
                : pendingBlogs
              ).map((blog, index) => (
                <tr key={blog.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{getSubString(blog?.authorName, 15)}</td>
                  <td title={blog.title}>{getSubString(blog.title, 15)}...</td>
                  <td>{textToHtml(getSubString(blog.description, 15))}...</td>
                  <td className="d-flex justify-content-around align-items-center gap-1">
                    <span
                      className="border-shadow py-1 px-2 rounded bg-info text-light"
                      style={{ cursor: "pointer" }}
                      title="Preview"
                      onClick={() => handleModalOpen(blog)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </span>
                    <span
                      className="border-shadow py-1 px-2 rounded bg-success text-light"
                      style={{ cursor: "pointer" }}
                      title="Approve"
                      onClick={() => handleApprove(blog._id)}
                    >
                      <FontAwesomeIcon icon={faCheckSquare} />
                    </span>
                    <span
                      className="border-shadow py-1 px-2 rounded bg-danger text-light"
                      style={{ cursor: "pointer" }}
                      title="Remove"
                      onClick={() => handleRemove(blog._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <Paginate
        pages={pendingBlogsTotalPage}
        page={pendingBlogsCurrentPage}
        isAdmin
        route="/admin/pending-blogs"
        setPage={setPendingBlogsCurrentPage}
      />

      <PendingBlogPreviewModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        blog={selectedBlog}
      />
    </div>
  );
};

export default PendingblogsTable;
