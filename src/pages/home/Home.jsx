import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllBlogs } from "../../apis/blog";
import { blogContext } from "../../components/context/BlogContext";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import Loader from "../../components/shared/loader/Loader";
import TimeStamp from "../../components/shared/timeStapm/TimeStamp";
import { getSubString } from "../../utils/getSubString";
import { textToHtml } from "../../utils/textToHtml";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    rowsPerPage,
    approvedBlogs,
    setApprovedBlogs,
    approvedBlogsTotalPage,
    approvedBlogsCurrentPage,
    setApprovedBlogsCurrentPage,
  } = useContext(blogContext);

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoute = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    const get = async (cat = "") => {
      setLoading(true);
      const { blogs, errorMessage } = await getAllBlogs(
        cat,
        "approved",
        rowsPerPage,
        approvedBlogsCurrentPage * rowsPerPage
      );
      if (blogs.length) {
        const blogsData = blogs.map((blog) => ({
          ...blog,
          img: JSON.parse(blog.img),
        }));
        setBlogs(blogsData);
      }
      setError(errorMessage);
      setLoading(false);
    };
    if (searchParams.get("cat")) {
      get(searchParams.get("cat"));
    } else {
      get();
    }
  }, [searchParams, approvedBlogsCurrentPage, rowsPerPage]);

  return (
    <section className="section-height home">
      <div className="posts mt-4">
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : error ? (
          <CustomAlert message={error} variant={"warning"} />
        ) : (
          <>
            <h1>Popular blogs</h1>
            {!!blogs?.length
              ? blogs.map((post) => (
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
      </div>
    </section>
  );
};

export default Home;
