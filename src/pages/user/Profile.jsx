import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { deleteBlog, getMyBlogs, getMyBlogsCount } from "../../apis/blog";
import { blogContext } from "../../components/context/BlogContext";
import { userContext } from "../../components/context/UserContext";
import Avatar from "../../components/shared/avatar/Avatar";
import { getDataFromLS } from "../../utils/localStorage";
import { pageCounter } from "../../utils/pageCounter";
import DisplayBlogs from "../../components/profile/DisplayBlogs";
import DisplayDraftBlogs from "../../components/profile/DisplayDraftBlogs";

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

  const [draftBlogs, setDraftBlogs] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pendingBlogError, setPendingBlogError] = useState(null);
  const [pendingBlogLoading, setPendingBlogLoading] = useState(false);

  useEffect(() => {
    const draft = getDataFromLS("draft-blogs");
    if (draft) setDraftBlogs(draft);
  }, []);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={userInfo?.img?.display_url}
              alt=""
              styles={{ width: "100px", height: "100px" }}
            />
            <div className="mt-3">
              <div className="text-center">
                <h5>
                  <strong>{userInfo?.username}</strong>
                </h5>
                <small>
                  <strong>{userInfo?.email}</strong>
                </small>
                <hr style={{ border: "1px solid gray" }} />
              </div>
              <p>Total Published blog: {totalBlogCount}</p>
              <p className="text-danger">
                Total Pending blog: {totalPendingBlogCount}
              </p>
              <p className="text-info">Total draft blog: {draftBlogs.length}</p>
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
            loading={pendingBlogLoading}
            setError={setPendingBlogError}
          />
          <div className="mt-5"></div>
          <DisplayDraftBlogs
            draftBlogs={draftBlogs}
            setDraftBlogs={setDraftBlogs}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Profile;
