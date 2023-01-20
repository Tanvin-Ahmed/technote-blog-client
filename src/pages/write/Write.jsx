import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { getSingleBlog, updateBlog, uploadBlog } from "../../apis/blog";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import "./write.scss";

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
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);

  const [uploadStatus, setUploadStatus] = useState({});

  useEffect(() => {
    if (!searchParams.get("edit")) return;

    const get = async () => {
      const { blog, errorMessage } = await getSingleBlog(
        searchParams.get("edit")
      );
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
      setSelectedBlog(blog);
      setSelectedCategory(blog.category);
    };

    get();
  }, [searchParams]);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCreate = async () => {
    const blogForm = new FormData();
    blogForm.append("file", img);
    blogForm.append("title", title);
    blogForm.append("category", selectedCategory);
    blogForm.append("description", text);
    blogForm.append("date", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

    const { blog, errorMessage } = await uploadBlog(blogForm);
    const successMessage =
      "Thank you to post a blog. Please wait for publish your blog by authority of Tech Blog";
    if (blog) setUploadStatus({ message: successMessage, status: "success" });
    else setUploadStatus({ message: errorMessage, status: "danger" });
  };

  const handleUpdate = async () => {
    const updateBlogForm = new FormData();
    updateBlogForm.append("file", img);
    updateBlogForm.append("title", title);
    updateBlogForm.append("category", selectedCategory);
    updateBlogForm.append("description", text);

    const { message, errorMessage } = await updateBlog(updateBlogForm);
    if (message) setUploadStatus({ message, status: "success" });
    else setUploadStatus({ message: errorMessage, status: "danger" });
  };

  return error ? (
    <CustomAlert message={error} variant={"danger"} />
  ) : (
    <section className="section-height pt-4 d-flex write">
      <div className="content">
        <Form.Control
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer h-75 mt-4 border-shadow">
          <ReactQuill
            className="h-100"
            theme="snow"
            value={text}
            onChange={setText}
          />
        </div>
        <div className="mt-4">
          {uploadStatus?.status && (
            <CustomAlert
              variant={uploadStatus?.status}
              message={uploadStatus?.message}
              setState={setUploadStatus}
            />
          )}
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
            id="img-selection"
            accept="image/png, image/gif, image/jpeg, image/*"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <Form.Label
            htmlFor="img-selection"
            className="btn btn-outline-primary"
            style={{ width: "100%", padding: "4px" }}
          >
            Upload Image
          </Form.Label>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <Button className="btn-outline-warning" size="sm">
              Save as a draft
            </Button>
            {selectedBlog ? (
              <Button
                className="btn-outline-info"
                size="sm"
                onClick={handleUpdate}
              >
                Update
              </Button>
            ) : (
              <Button
                className="btn-outline-info"
                size="sm"
                onClick={handleCreate}
              >
                Publish
              </Button>
            )}
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
