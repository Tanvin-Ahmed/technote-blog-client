import React from "react";
import Modal from "../../../shared/modal/Modal";

const PendingBlogPreviewModal = ({ modalIsOpen, setIsOpen, blog }) => {
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      modalTitle="Pending Blog Preview"
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <img src={blog.imgURL} className="w-50 rounded" alt="" />
        <h2>{blog.title}</h2>
        <h6>{blog?.userId?.name}</h6>
        <p>{blog.description}</p>
        <small>{new Date(blog.time).toLocaleString()}</small>
        <div class="btn-group mt-4" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success">
            Approve
          </button>
          <button type="button" class="btn btn-danger">
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PendingBlogPreviewModal;
