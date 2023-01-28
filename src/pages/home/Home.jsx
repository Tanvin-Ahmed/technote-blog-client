import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../apis/blog";
import { blogContext } from "../../components/context/BlogContext";
import SearchBox from "../../components/home/searchBox/SearchBox";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import Loader from "../../components/shared/loader/Loader";
import TimeStamp from "../../components/shared/timeStapm/TimeStamp";
import { getSubString } from "../../utils/getSubString";
import { textToHtml } from "../../utils/textToHtml";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  const {
    rowsPerPage,
    approvedBlogs,
    setApprovedBlogs,
    approvedBlogsTotalPage,
    approvedBlogsCurrentPage,
    setApprovedBlogsCurrentPage,
    blogPageTracker,
    searchTerm,
    searchArea,
  } = useContext(blogContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoute = (id) => {
    navigate(`/post/${id}`);
  };

  const searchBlogs = async () => {
    setLoading(true);
    const { blogs, errorMessage } = await getAllBlogs(
      typeof searchTerm === "object" ? searchTerm.id : "",
      "approved",
      rowsPerPage,
      0,
      typeof searchTerm === "string" ? searchTerm : ""
    );

    if (blogs.length) {
      const blogsData = blogs.map((blog) => ({
        ...blog,
        img: JSON.parse(blog.img),
      }));
      setApprovedBlogs(blogsData);
    } else {
      setApprovedBlogs([]);
    }
    setError(errorMessage);
    setLoading(false);

    setApprovedBlogsCurrentPage(1);
    blogPageTracker.current = 1;
  };

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const { blogs, errorMessage } = await getAllBlogs(
        "",
        "approved",
        rowsPerPage,
        approvedBlogsCurrentPage * rowsPerPage,
        ""
      );
      if (blogs.length) {
        const blogsData = blogs.map((blog) => ({
          ...blog,
          img: JSON.parse(blog.img),
        }));
        setApprovedBlogs(blogsData);
      }
      setError(errorMessage);
      setLoading(false);
    };
    if (blogPageTracker.current === -1) {
      get();
      setApprovedBlogsCurrentPage(1);
      blogPageTracker.current++;
    }
  }, [
    approvedBlogsCurrentPage,
    rowsPerPage,
    setApprovedBlogs,
    blogPageTracker,
    setApprovedBlogsCurrentPage,
    searchTerm,
    searchArea,
  ]);

  const loadMore = async () => {
    if (blogPageTracker.current < approvedBlogsCurrentPage) {
      blogPageTracker.current++;

      setLoading(true);
      const { blogs, errorMessage } = await getAllBlogs(
        searchArea === "category" ? searchTerm.id : "",
        "approved",
        rowsPerPage,
        approvedBlogsCurrentPage * rowsPerPage,
        typeof searchTerm === "string" ? searchTerm : ""
      );
      if (blogs.length) {
        const blogsData = blogs.map((blog) => ({
          ...blog,
          img: JSON.parse(blog.img),
        }));
        setApprovedBlogs((prev) => [...prev, ...blogsData]);
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className="section-height home">
      <div className="posts mt-4">
        <SearchBox searchBlogs={searchBlogs} />
        {error ? (
          <CustomAlert message={error} variant={"warning"} />
        ) : (
          <>
            <h1>Popular blogs</h1>
            {!!approvedBlogs?.length
              ? approvedBlogs.map((post) => (
                  <Card className="w-100 my-5 p-4" key={post.id}>
                    <Row>
                      <Col md={"4"} sm={"12"}>
                        <Card.Img
                          src={post?.img?.display_url}
                          className="card-img border-shadow"
                          alt="blog img"
                        />
                      </Col>
                      <Col md={"8"} sm={"12"}>
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>
                            <small className="text-primary">
                              {post?.category_name}
                            </small>
                            <p>
                              {textToHtml(getSubString(post.description, 400))}
                              ...
                            </p>
                            <small>
                              <strong>
                                <TimeStamp
                                  createAt={post.createAt}
                                  updateAt={post.updateAt}
                                />
                              </strong>
                            </small>
                          </Card.Text>
                          <Button
                            onClick={() => handleRoute(post.id)}
                            variant="outline-info"
                          >
                            Read more
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              : null}
          </>
        )}
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : null}
        {approvedBlogsTotalPage > 1 &&
          approvedBlogsTotalPage > approvedBlogsCurrentPage + 1 && (
            <div className="text-center">
              <Button onClick={loadMore}>More blog</Button>
            </div>
          )}
      </div>
    </section>
  );
};

export default Home;
