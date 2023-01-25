import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { getSingleBlog, updateBlog, uploadBlog } from "../../apis/blog";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import DragAndDropImg from "../../components/shared/dragAndDrop/DragAndDropImg";
import Loader from "../../components/shared/loader/Loader";
import { compressImage } from "../../utils/handleImages/compressImage";
import { uploadImageInImageBB } from "../../utils/handleImages/uploadImage";
import "./write.scss";

const categories = [
  "Web Development",
  "App Development",
  "React.js",
  "Next.js",
  "Angular",
  "Vuejs",
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
  "Programming language",
];

const Write = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
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
      const blogData = { ...blog, img: JSON.parse(blog.img) };
      setSelectedBlog(blogData);
      setText(blogData.description);
      setTitle(blogData.title);
      setSelectedCategory(blog.category);
    };

    get();
  }, [searchParams]);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCreate = async () => {
    if (!img) {
      alert("User photo is required");
      return;
    }

    const { compressedImage, errorMessage: compressError } =
      await compressImage(img);

    if (compressError) return;

    const { img: image, errorMessage: imgUploadError } =
      await uploadImageInImageBB(compressedImage, "user");

    if (imgUploadError) {
      console.log(imgUploadError);
      return;
    }

    const blogForm = {
      img: image,
      title,
      selectedCategory,
      description: text,
      createAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      updateAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      category: selectedCategory,
    };

    const { blog, errorMessage } = await uploadBlog(blogForm);
    const successMessage =
      "Thank you to post a blog. Please wait for publish your blog by authority of Tech Blog";
    if (blog) setUploadStatus({ message: successMessage, status: "success" });
    else setUploadStatus({ message: errorMessage, status: "danger" });
  };

  const handleUpdate = async () => {
    let updateBlogForm = {};
    if (img) {
      // const { message: deleteImgMessage, errorMessage: deleteImgError } =
      //   await deleteImageFromImageBB(selectedBlog?.img?.delete_url);

      // if (deleteImgError) return console.log(deleteImgError);

      const { compressedImage, errorMessage: compressError } =
        await compressImage(img);

      if (compressError) return console.log(compressError);

      const { img: image, errorMessage: imgUploadError } =
        await uploadImageInImageBB(compressedImage, "user");

      if (imgUploadError) {
        console.log(imgUploadError);
        return;
      }

      updateBlogForm = {
        img: image,
      };
    }

    updateBlogForm = {
      ...updateBlogForm,
      title,
      selectedCategory,
      description: text,
      updateAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      status: "pending",
      category: selectedCategory,
    };

    const { message, errorMessage } = await updateBlog(updateBlogForm);
    if (message) setUploadStatus({ message, status: "success" });
    else setUploadStatus({ message: errorMessage, status: "danger" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (selectedBlog) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
    setLoading(false);
  };

  return error ? (
    <CustomAlert message={error} variant={"danger"} />
  ) : (
    <section className="section-height pt-4 write">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={"8"} sm={"12"}>
            <div className="content w-100">
              <Form.Control
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {(img || selectedBlog?.img) && (
                <div className="mt-3">
                  <img
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : selectedBlog?.img?.display_url
                    }
                    alt=""
                    className="w-100 rounded border-shadow"
                  />
                  <p className="text-center">Cover Photo</p>
                </div>
              )}
              <div
                className="editorContainer mt-4 border-shadow"
                style={{ height: "500px" }}
              >
                <ReactQuill
                  style={{ height: "457px" }}
                  theme="snow"
                  value={text}
                  onChange={setText}
                  placeholder="Write blog..."
                />
              </div>
            </div>
          </Col>
          <Col md={"4"} sm={"12"}>
            <div className="menu w-100">
              <h3>Publish</h3>
              <span>
                <b>Status: </b> Draft
              </span>
              <span className="d-block pb-2">
                <b>Visibility: </b> Public
              </span>
              <DragAndDropImg setImage={setImg} />
              <div className="d-flex justify-content-between align-items-center pt-3">
                <Button className="btn-outline-warning" size="sm">
                  Save as a draft
                </Button>
                <Button className="btn-outline-info" size="sm" type="submit">
                  {selectedBlog ? "Update" : "Publish"}
                </Button>
              </div>
              <div className="my-3 text-center">
                {loading ? (
                  <Loader />
                ) : (
                  uploadStatus?.status && (
                    <CustomAlert
                      variant={uploadStatus?.status}
                      message={uploadStatus?.message}
                      setState={setUploadStatus}
                    />
                  )
                )}
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
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default Write;
