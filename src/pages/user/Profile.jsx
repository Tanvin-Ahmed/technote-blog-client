import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { deleteBlog, getMyBlogs, getMyBlogsCount } from "../../apis/blog";
import { blogContext } from "../../components/context/BlogContext";
import { userContext } from "../../components/context/UserContext";
import Avatar from "../../components/shared/avatar/Avatar";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import Loader from "../../components/shared/loader/Loader";
import BlogCard from "../../components/user/BlogCard";
import { pageCounter } from "../../utils/pageCounter";

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
  const hadleNextPage = () => {
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
        {myBlogs.map((blog) => (
          <Col md={4} sm={12} key={blog?.id} className="my-3">
            <BlogCard blog={blog} isUser handleDeleteBlog={handleDeleteBlog} />
          </Col>
        ))}
        <div className="text-center">
          {totalPage > 1 && totalPage - 1 > currentPage && (
            <Button className="btn-outline-info" onClick={hadleNextPage}>
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

const Profile = () => {
  const { rowsPerPage } = useContext(blogContext);
  const { userInfo } = useContext(userContext);

  const [myBlogs, setMyBlogs] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalBlogCount, setTotalBlogCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageTracker = useRef(-1);

  const [myPendingBlogs, setMyPendingBlogs] = useState([]);
  const [totalPendingBlogPage, setTotalPendingBlogPage] = useState(0);
  const [totalPendingBlogCount, setTotalPendingBlogCount] = useState(0);
  const [pendingBlogCurrentPage, setPendingBlogCurrentPage] = useState(0);
  const pendingBlogPageTracker = useRef(-1);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pendingBlogError, setPendingBlogError] = useState(null);
  const [pendingBlogloading, setPendingBlogLoading] = useState(false);

  useEffect(() => {
    getMyBlogsCount("approved").then((data) => {
      setTotalBlogCount(data.count);
      setTotalPage(pageCounter(data.count, rowsPerPage));
    });
    getMyBlogsCount("pending").then((data) => {
      setTotalPendingBlogCount(data.count);
      setTotalPendingBlogPage(pageCounter(data.count, rowsPerPage));
    });
  }, [rowsPerPage]);

  useEffect(() => {
    const get = async (status) => {
      if (status === "approved") {
        setLoading(true);
      } else {
        setPendingBlogLoading(true);
      }
      const { blogs, errorMessage } = await getMyBlogs(
        status,
        rowsPerPage,
        rowsPerPage * currentPage
      );
      const blogsData = blogs.map((b) => ({ ...b, img: JSON.parse(b.img) }));
      if (status === "approved") {
        setMyBlogs((prev) => [...prev, ...blogsData]);
      } else {
        setMyPendingBlogs((prev) => [...prev, ...blogsData]);
      }
      if (errorMessage) {
        if (status === "approved") {
          setError({ message: errorMessage, status: "danger" });
        } else {
          setPendingBlogError({ message: errorMessage, status: "danger" });
        }
      }
      if (status === "approved") {
        setLoading(false);
      } else {
        setPendingBlogLoading(false);
      }
    };

    if (pageTracker.current < currentPage) {
      get("approved");
      pageTracker.current++;
    } else if (pendingBlogPageTracker.current < pendingBlogCurrentPage) {
      get("pending");
      pendingBlogPageTracker.current++;
    }
  }, [currentPage, rowsPerPage, pendingBlogCurrentPage]);

  const handleDeleteBlog = async (id, status) => {
    const { message, errorMessage } = await deleteBlog(id);
    if (message) {
      if (status === "approved") {
        setMyBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        setMyPendingBlogs((prev) => prev.filter((b) => b.id !== id));
      }
    }
    if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <section className="pt-2">
      <Row>
        <Col md={3} sm={12} className="border-shadow p-3 rounded">
          <div className="text-center">
            <Avatar
              src={userInfo?.img?.display_url}
              alt=""
              styles={{ width: "100px", height: "100px" }}
            />
            <div className="mt-3">
              <h5>
                <strong>{userInfo?.username}</strong>
              </h5>
              <small>
                <strong>{userInfo?.email}</strong>
              </small>
              <hr style={{ border: "1px solid gray" }} />
              <p>Total Published blog: {totalBlogCount}</p>
              <p className="text-danger">
                Total Pending blog: {totalPendingBlogCount}
              </p>
            </div>
          </div>
        </Col>
        <Col md={9} sm={12}>
          <DisplayBlogs
            myBlogs={myBlogs}
            handleDeleteBlog={handleDeleteBlog}
            title={"Published Blogs"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            error={error}
            loading={loading}
            setError={setError}
          />
          <div className="mt-5"></div>
          <DisplayBlogs
            myBlogs={myPendingBlogs}
            handleDeleteBlog={handleDeleteBlog}
            title={"Pending Blogs"}
            currentPage={pendingBlogCurrentPage}
            setCurrentPage={setPendingBlogCurrentPage}
            totalPage={totalPendingBlogPage}
            error={pendingBlogError}
            loading={pendingBlogloading}
            setError={setPendingBlogError}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Profile;
