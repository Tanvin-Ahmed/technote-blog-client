import React, { useEffect, useState } from "react";
import { getSubString } from "../../../../utils/getSubString";
import { pendingBlogsData } from "../../../../utils/pandingBlogData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Paginate from "../../../shared/paginate/Paginate";
import PendingBlogPreviewModal from "../pendingBlogPreviewModal/PendingBlogPreviewModal";

const PendingblogsTable = () => {
  const [blogsData, setBlogsData] = useState(pendingBlogsData || []);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleModalOpen = (blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  const handleApprove = (id) => {
    // approve api call
  };
  const handleRemove = (id) => {
    // remove api call
  };

  useEffect(() => {
    // setBlogsData(pendingBlogsData);
  }, []);
  return (
    <div>
      {/* table pagination */}
      {/* (rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map() */}

      <h3 className="text-center mb-5">Manage Pending Blogs</h3>
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
          {blogsData.length > 0 &&
            (rowsPerPage > 0
              ? blogsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : blogsData
            ).map((blog, index) => (
              <tr key={blog._id}>
                <th scope="row">{index + 1}</th>
                <td>{blog?.userId?.name}</td>
                <td title={blog.title}>{getSubString(blog.title, 15)}...</td>
                <td>{getSubString(blog.description, 15)}...</td>
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

      <Paginate
        pages={10}
        page={page + 1}
        isAdmin
        route="/admin/pending-blogs"
        setPage={setPage}
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
