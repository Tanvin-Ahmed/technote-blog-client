import React, { useContext, useState } from "react";
import { approveBlog, deleteBlog } from "../../../../apis/blog";
import { blogContext } from "../../../context/BlogContext";
import Avatar from "../../../shared/avatar/Avatar";
import CustomAlert from "../../../shared/customAlert/CustomAlert";
import Loader from "../../../shared/loader/Loader";
import Modal from "../../../shared/modal/Modal";
import TimeStamp from "../../../shared/timeStapm/TimeStamp";

const PendingBlogPreviewModal = ({ modalIsOpen, setIsOpen, blog }) => {
  const { setPendingBlogs } = useContext(blogContext);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeletePendingBlog = async () => {
    setLoading(true);
    const { message, errorMessage } = await deleteBlog(blog.id);

    if (message) {
      setPendingBlogs((prev) => prev.filter((b) => b.id === blog.id));
    }

    const success = { message, status: "success" };
    const error = {
      message: errorMessage,
      status: "danger",
    };
    setLoading(false);
    setStatus(message ? success : error);

    setTimeout(() => {
      setIsOpen(false);
      setStatus(null);
    }, 3000);
  };

  const handleApporvePendingBlog = async () => {
    setLoading(true);
    const { message, errorMessage } = await approveBlog({
      user_id: blog.authorId,
      id: blog.id,
      status: "approved",
    });

    if (message) {
      setPendingBlogs((prev) => prev.filter((b) => b.id === blog.id));
    }

    const success = { message, status: "success" };
    const error = {
      message: errorMessage,
      status: "danger",
    };
    setLoading(false);
    setStatus(message ? success : error);

    setTimeout(() => {
      setIsOpen(false);
      setStatus(null);
    }, 3000);
  };

  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      modalTitle="Pending Blog Preview"
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <img src={blog?.img?.display_url} className="w-50 rounded" alt="" />
        <div className="mt-3"></div>
        <Avatar src={blog?.authorImg?.display_url} />
        <h6>{blog?.authorName}</h6>
        <h2 className="mt-3">{blog.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: blog.description }} />
        <small>
          <TimeStamp createAt={blog?.createAt} updateAt={blog?.updateAt} />
        </small>
        <div class="btn-group mt-4" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn btn-success"
            onClick={handleApporvePendingBlog}
          >
            Approve
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={handleDeletePendingBlog}
          >
            Remove
          </button>
        </div>

        <div className="mt-3">
          {loading && (
            <div className="text-center">
              <Loader />
            </div>
          )}
          {status && (
            <CustomAlert
              message={status.message}
              variant={status.status}
              setState={setStatus}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PendingBlogPreviewModal;
