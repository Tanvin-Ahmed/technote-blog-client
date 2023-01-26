import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TimeStamp from "../shared/timeStapm/TimeStamp";

const BlogCard = ({ blog, isUser, handleDeleteBlog }) => {
  const navigate = useNavigate();

  const handleViewRoute = () => {
    navigate(`/post/${blog.id}`);
  };

  const handleEditRoute = () => {
    navigate(`/write?edit=${blog.id}`);
  };

  return (
    <Card className="rounded p-2">
      <Card.Img
        src={blog?.img?.display_url}
        className="w-100 rounded"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Title>{blog?.title}</Card.Title>
      <Card.Text>
        <strong>
          <TimeStamp createAt={blog?.createAt} updateAt={blog?.updateAt} />
        </strong>
      </Card.Text>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items center">
          <Button
            size="sm"
            className="btn-outline-info"
            onClick={handleViewRoute}
          >
            View
          </Button>
          {isUser && (
            <>
              <Button
                size="sm"
                className="btn-outline-warning"
                onClick={handleEditRoute}
              >
                Update
              </Button>
              <Button
                size="sm"
                className="btn-outline-danger"
                onClick={() => handleDeleteBlog(blog.id, blog.status)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
