import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { getSingleBlog, updateBlog, uploadBlog } from "../../apis/blog";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import DragAndDropImg from "../../components/shared/dragAndDrop/DragAndDropImg";
import Loader from "../../components/shared/loader/Loader";
import CategoryOptions from "../../components/write/categoryOptions/CategoryOptions";
import { compressImage } from "../../utils/handleImages/compressImage";
import { uploadImageInImageBB } from "../../utils/handleImages/uploadImage";
import {
  getDataFromLS,
  setDataInLS,
  removeDataFromLS,
} from "../../utils/localStorage";
import "./write.scss";

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
  const [draftAlert, setDraftAlert] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);

  // get blog data
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
      setSelectedCategory(blog.categoryId);
    };

    get();
  }, [searchParams]);

  // fetch draft blog data
  useEffect(() => {
    if (!searchParams.get("draft")) return;

    const draft = getDataFromLS("draft-blogs");
    if (draft) {
      const blogData = draft[Number(searchParams.get("draft"))];
      setText(blogData.description);
      setTitle(blogData.title);
      setSelectedCategory(blogData.category);
    }
  }, [searchParams]);

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
      description: text,
      createAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      updateAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      category: selectedCategory,
    };

    const { blog, errorMessage } = await uploadBlog(blogForm);
    const successMessage =
      "Thank you to post a blog. Please wait for publish your blog by authority of Tech Blog";
    if (blog) {
      setUploadStatus({ message: successMessage, status: "success" });
      if (searchParams.get("draft")) {
        const data = getDataFromLS("draft-blogs");
        if (data) {
          if (data.length === 0) removeDataFromLS("draft-blogs");
          else
            setDataInLS(
              data.filter((b, i) => i !== Number(searchParams.get("draft"))),
              "draft-blogs"
            );
        }
      }
    } else setUploadStatus({ message: errorMessage, status: "danger" });
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

  const handleSaveAsDraft = () => {
    const blogData = {
      title,
      description: text,
      createAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      updateAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      category: selectedCategory,
      status: "draft",
    };
    const data = getDataFromLS("draft-blogs");
    if (searchParams.get("draft")) {
      data[Number(searchParams.get("draft"))] = blogData;
      setDataInLS(data, "draft-blogs");
      setSaveDraft(true);
    } else {
      if (data) {
        if (data.length === 5) {
          setDraftAlert(true);
        } else {
          setDataInLS([...data, blogData], "draft-blogs");
          setSaveDraft(true);
        }
      } else {
        setDataInLS([blogData], "draft-blogs");
        setSaveDraft(true);
      }
    }
  };

  const handleAllowDeleteFromDraftAndInsertNew = () => {
    const data = getDataFromLS("draft-blogs");
    const newArr = [];

    for (let i = 1; i < data.length; i++) {
      newArr.push(data[i]);
    }
    newArr.push(data);
    setDataInLS(newArr, "draft-blogs");
    setSaveDraft(true);
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
                style={{ height: "500px", overflow: "hidden" }}
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
                <Button
                  className="btn-outline-warning"
                  size="sm"
                  onClick={handleSaveAsDraft}
                >
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
                {draftAlert && (
                  <div class="alert alert-dismissible alert-secondary">
                    <div className="display-flex flex-column justify-content-center align-items-center">
                      <div>
                        <strong className="text-danger">
                          Draft storage full!
                        </strong>{" "}
                        Please confirm the oldest draft to delete for insert new
                        draft.
                      </div>
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        size="sm"
                        onClick={handleAllowDeleteFromDraftAndInsertNew}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
                {saveDraft && (
                  <CustomAlert
                    variant={"success"}
                    message={"Save as draft!"}
                    setState={setSaveDraft}
                  />
                )}
              </div>
              <CategoryOptions
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default Write;
