import { Button, Card, Col, Row } from "react-bootstrap";
import CustomAlert from "../shared/customAlert/CustomAlert";
import TimeStamp from "../shared/timeStapm/TimeStamp";
import draftImg from "../../assets/draft/draft-blog.png";
import { removeDataFromLS, setDataInLS } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const DisplayDraftBlogs = ({ draftBlogs, setDraftBlogs }) => {
  const navigate = useNavigate();

  const handleDeleteBlog = (i) => {
    const newBlogs = draftBlogs.filter((blog, index) => index !== i);
    setDraftBlogs(newBlogs);
    if (!newBlogs.length) removeDataFromLS("draft-blogs");
    else setDataInLS(newBlogs, "draft-blogs");
  };

  const handleEditRoute = (index) => {
    navigate(`/write?draft=${index}`);
  };

  return (
    <>
      <h5>
        <strong>Draft Blogs</strong>
      </h5>
      <Row
        className="border-shadow py-4"
        style={{ height: "500px", overflowY: "auto" }}
      >
        {!!draftBlogs.length ? (
          draftBlogs.map((blog, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="my-3">
              <Card className="rounded p-2">
                <Card.Img
                  src={draftImg}
                  className="w-100 rounded"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Title>{blog?.title}</Card.Title>
                <Card.Text>
                  <strong>
                    <TimeStamp
                      createAt={blog?.createAt}
                      updateAt={blog?.updateAt}
                    />
                  </strong>
                </Card.Text>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items center flex-wrap">
                    <Button
                      size="sm"
                      className="btn-outline-warning my-2"
                      onClick={() => handleEditRoute(index)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className="btn-outline-danger my-2"
                      onClick={() => handleDeleteBlog(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <CustomAlert message={"No blogs found!"} variant={"info"} />
        )}
      </Row>
    </>
  );
};

export default DisplayDraftBlogs;
