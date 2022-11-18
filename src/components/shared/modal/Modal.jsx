import React from "react";
import { Button } from "react-bootstrap";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
    width: "80%",
    backgroundColor: "#d9e3f1",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ modalIsOpen, setIsOpen, modalTitle = "", children }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{modalTitle}</h2>
        <Button onClick={closeModal} className="btn btn-danger">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
