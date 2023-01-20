import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../../apis/blog";
import { userContext } from "../../components/context/UserContext";
import Menu from "../../components/single/Menu";
import { textToHtml } from "../../utils/textToHtml";
import "./single.scss";

const Single = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(userContext);
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState(null);

  const handleRoute = () => {
    navigate(`/write?edit=2`);
  };

  useEffect(() => {
    const get = async (blogId) => {
      const { blog, errorMessage } = await getSingleBlog(blogId);
      setBlogData(blog);
      setError(errorMessage);
    };
    if (id) {
      get(id);
    }
  }, [id]);

  const handleDelete = async () => {
    const { message, errorMessage } = await deleteBlog(id);
    navigate("/");
  };

  return (
    <section className="section-height single mt-5">
      <Row>
        <Col md={"8"} sm={"12"}>
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="post-img rounded border-shadow"
          />
          <div className="user mt-4">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="avatar border-shadow"
            />
            <div className="info">
              <h6 className="m-0 p-0">Jhon</h6>
              <p className="m-0 p-0">{moment(blogData?.date).fromNow()}</p>

              {userInfo.id && userInfo.id === blogData?.authorId ? (
                <div className="buttons">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleRoute}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDelete}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="post-content">{textToHtml(blogData.description)}</div>
        </Col>
        <Col md={"4"} sm={"12"}>
          <Menu category={blogData?.category} />
        </Col>
      </Row>
    </section>
  );
};

export default Single;
