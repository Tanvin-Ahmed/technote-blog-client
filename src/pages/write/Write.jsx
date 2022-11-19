import React, { useState } from "react";
import "./write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form } from "react-bootstrap";

const Write = () => {
  const [value, setValue] = useState("");

  console.log(value);

  return (
    <section className="section-height pt-4 d-flex write">
      <div className="content">
        <Form.Control type="text" placeholder="Blog Title" />
        <div className="editorContainer h-75 mt-4 border-shadow">
          <ReactQuill
            className="h-100"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu d-flex flex-column">
        <div className="item border-shadow p-3">
          <h3>Publish</h3>
          <span>
            <b>Status: </b> Draft
          </span>
          <span className="d-block pb-2">
            <b>Visibility: </b> Public
          </span>
          <Form.Control
            type="file"
            id="img"
            accept="image/png, image/gif, image/jpeg, image/*"
            style={{ display: "none" }}
          />
          <Form.Label htmlFor="img">
            <Button className="btn btn-outline-primary" size="sm">
              Upload Image
            </Button>
          </Form.Label>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <Button className="btn-outline-warning" size="sm">
              Save as a draft
            </Button>
            <Button className="btn-outline-info" size="sm">
              Update
            </Button>
          </div>
        </div>
        <div className="item border-shadow p-3 category-container">
          <h3>Category</h3>
          <Form.Check type={"radio"} label={"Web Development"} />
          <Form.Check type={"radio"} label={"App Development"} />
          <Form.Check type={"radio"} label={"React.js"} />
          <Form.Check type={"radio"} label={"Node.js"} />
          <Form.Check type={"radio"} label={"Next.js"} />
          <Form.Check type={"radio"} label={"React Native"} />
          <Form.Check type={"radio"} label={"MongoDB"} />
          <Form.Check type={"radio"} label={"Mongoose"} />
        </div>
      </div>
    </section>
  );
};

export default Write;
