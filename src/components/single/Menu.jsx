import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../apis/blog";
import CustomAlert from "../shared/customAlert/CustomAlert";
import Loader from "../shared/loader/Loader";

const Menu = ({ category, blogId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    // get blogs by category from server
    const get = async () => {
      setLoading(true);
      const { blogs } = await getAllBlogs(category, "approved", 5, 0);
      if (blogs.length) {
        const blogsData = blogs
          .filter((blog) => blog.id !== blogId)
          .map((blog) => ({
            ...blog,
            img: JSON.parse(blog.img),
          }));
        setblogs(blogsData);
        setError(null);
      } else {
        setError({ message: "No related blog found!", status: "warning" });
      }
      setLoading(false);
    };
    get();
  }, [category, blogId]);

  const handleRoute = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="menu">
      <h3>Other post you may like</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert
          message={error.message}
          variant={error.status}
          setState={setError}
        />
      ) : (
        !!blogs.length &&
        blogs.map((post) => (
          <Card key={post.id} className="mb-4 p-2">
            <Card.Img
              src={post?.img?.display_url}
              style={{ height: "150px", width: "100%", objectFit: "cover" }}
              alt=""
              className="border-shadow"
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleRoute(post?.id)}
              >
                Read More
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Menu;
