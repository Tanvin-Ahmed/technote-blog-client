import { Button, Col, Row } from "react-bootstrap";
import CustomAlert from "../shared/customAlert/CustomAlert";
import Loader from "../shared/loader/Loader";
import BlogCard from "./BlogCard";

const DisplayBlogs = ({
  myBlogs,
  title,
  totalPage,
  currentPage,
  setCurrentPage,
  error,
  setError,
  loading,
  handleDeleteBlog,
}) => {
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <h5>
        <strong>{title}</strong>
      </h5>
      <Row
        className="border-shadow py-4"
        style={{ height: "500px", overflowY: "auto" }}
      >
        {!loading && !error ? (
          !!myBlogs.length ? (
            myBlogs.map((blog) => (
              <Col lg={4} md={6} sm={12} key={blog?.id} className="my-3">
                <BlogCard
                  blog={blog}
                  isUser
                  handleDeleteBlog={handleDeleteBlog}
                />
              </Col>
            ))
          ) : (
            <CustomAlert message={"No blogs found!"} variant={"info"} />
          )
        ) : null}
        <div className="text-center">
          {totalPage > 1 && totalPage - 1 > currentPage && (
            <Button className="btn-outline-info" onClick={handleNextPage}>
              More
            </Button>
          )}
          {loading && <Loader />}
          {error && (
            <CustomAlert
              message={error.message}
              variant={error.status}
              setState={setError}
            />
          )}
        </div>
      </Row>
    </>
  );
};

export default DisplayBlogs;
