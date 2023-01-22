import React from "react";
import { Alert } from "react-bootstrap";

const status = {
  warning: "Warning",
  success: "Success",
  danger: "Error",
  info: "Information",
};

const CustomAlert = ({ variant, message, setState }) => {
  return (
    <Alert variant={variant} className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div style={{ textAlign: "left" }}>
          <h4>
            <strong>{status[variant]}!</strong>
          </h4>
          {message}
        </div>
        {setState && (
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setState(null)}
          ></button>
        )}
      </div>
    </Alert>
  );
};

export default CustomAlert;
