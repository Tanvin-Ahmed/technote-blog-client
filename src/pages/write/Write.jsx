import React, { useState } from "react";
import "./write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form } from "react-bootstrap";

const categories = [
  "Web Development",
  "App Development",
  "React.js",
  "Next.js",
  "Angular",
  "Vue",
  "Node.js",
  "Express.js",
  "Database",
  "Electronics",
  "Artificial Intelligence",
  "Mechine Learning",
  "Data Mining",
  "DataStructures  & Algorithm",
  "Cloud Computing",
  "Technology",
];

const Write = () => {
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <section className="section-height pt-4 d-flex write">
      <div className="content">
        <Form.Control type="text" placeholder="Blog Title" />
        <div className="editorContainer h-75 mt-4 border-shadow">
          <ReactQuill
            className="h-100"
            theme="snow"
            value={text}
            onChange={setText}
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
          <Form.Control type="text" placeholder="Search Category" />
          <hr />
          <div className="categories">
            {categories.map((category, index) => (
              <Form.Check
                key={index}
                type={"radio"}
                value={category}
                label={category}
                checked={selectedCategory === category}
                onChange={handleSelectCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Write;
