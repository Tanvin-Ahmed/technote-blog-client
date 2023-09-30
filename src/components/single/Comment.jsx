import {
  faCircleCheck,
  faEdit,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { deleteComment, updateComment } from "../../apis/comment";
import { userContext } from "../context/UserContext";
import Avatar from "../shared/avatar/Avatar";
import CustomAlert from "../shared/customAlert/CustomAlert";
import Loader from "../shared/loader/Loader";
import TimeStamp from "../shared/timeStapm/TimeStamp";

const Comment = ({ comment, setComments }) => {
  const { userInfo } = useContext(userContext);
  const [cursor, setCursor] = useState(false);
  const [content, setContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setContent(comment?.message);
  }, [comment?.message]);

  const handleEditEnable = () => {
    if (userInfo.id === comment.authorId) setCursor((prev) => !prev);
  };

  const handleCencle = () => {
    handleEditEnable();
    if (!updatedContent.trim()) return;
    setContent("Loading...");
    setTimeout(() => {
      setContent(comment.message);
    }, 10);
  };

  const handleDeleteComment = () => {
    setLoading(true);
    deleteComment(comment.id, userInfo.id).then((data) => {
      if (data.errorMessage) {
        setError({ message: data.errorMessage, status: "danger" });
      } else {
        setComments((prev) => prev.filter((c) => c.id !== comment.id));
      }
      setLoading(false);
    });
  };

  const handleInput = (e) => {
    setUpdatedContent(e.target.innerHTML);
  };

  const handleUpdate = () => {
    updateComment({ id: comment.id, message: updatedContent }).then((data) => {
      if (data.errorMessage) {
        setError({ message: data.errorMessage, status: "danger" });
      } else {
        setComments((prev) => {
          const index = prev.findIndex((c) => c.id === data.comment.id);
          if (index !== -1) prev[index] = data.comment;
          return prev;
        });
        handleEditEnable();
      }
    });
  };

  return (
    <Card
      className="border-shadow p-3 my-3"
      style={
        userInfo?.id === comment.authorId
          ? { backgroundColor: "rgba(0, 173, 255, 0.15)" }
          : {}
      }
    >
      <Row>
        <Col sm={2}>
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">
            <Avatar src={comment?.authorImg?.display_url} alt="" />
            <h6 className="mt-2">
              <strong>{comment?.authorName}</strong>
            </h6>
            {userInfo?.id === comment.authorId && (
              <div className="w-100 mt-2 d-flex justify-content-around align-items-center">
                {cursor ? (
                  <>
                    <Button
                      className="btn-outline-success"
                      size="sm"
                      onClick={handleUpdate}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                    <Button
                      className="btn-outline-warning"
                      size="sm"
                      onClick={handleCencle}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </Button>
                  </>
                ) : (
                  <Button
                    className="btn-outline-info"
                    size="sm"
                    onClick={handleEditEnable}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                )}
                <Button
                  className="btn-outline-danger"
                  size="sm"
                  onClick={handleDeleteComment}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            )}
            {loading && (
              <div className="mt-3 w-100 d-flex justify-content-center align-items-center">
                <Loader size="sm" />
              </div>
            )}
          </div>
        </Col>
        <Col sm={10}>
          <Card.Text
            suppressContentEditableWarning
            contentEditable={cursor}
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: content }}
          ></Card.Text>
          <div className="mt-4">
            <small>
              <strong>
                <TimeStamp
                  createAt={comment?.createdAt}
                  updateAt={comment?.updatedAt}
                />
              </strong>
            </small>
          </div>
        </Col>
      </Row>
      {error && (
        <div className="mt-2">
          <CustomAlert
            variant={error.status}
            message={error.message}
            setState={setError}
          />
        </div>
      )}
    </Card>
  );
};

export default Comment;
