import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function DragAndDropImg({ setImage }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/*": [],
    },
  });

  useEffect(() => {
    console.log(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
  }, [acceptedFiles, setImage]);

  return (
    <div
      className="rounded"
      style={{
        padding: "0.5rem",
        border: "1px dotted gray",
        backgroundColor: "whitesmoke",
      }}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="text-center" style={{ position: "relative" }}>
          <FontAwesomeIcon size="3x" icon={faImages} color="#dbd9d9" />
          <p>Only image accepted</p>
        </div>
      </div>
    </div>
  );
}
