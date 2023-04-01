import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { postComment } from "../../apis/comment";
import CustomAlert from "../shared/customAlert/CustomAlert";

const CommentForm = ({ blogId, setComments, setPageCount, totalPages }) => {
  const [cursor, setCursor] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFocus = () => {
    setCursor(true);
  };
  const handleBlur = () => {
    setCursor(false);
  };

  const handleInputText = (e) => {
    setContent(e.target.innerHTML);
  };

  const handleSubmit = () => {
    setLoading(true);
    const info = { message: content, post_id: blogId };
    postComment(info).then((data) => {
      if (data.errorMessage) {
        setError({ message: data.errorMessage, status: "danger" });
      } else {
        if (totalPages > 0) {
          const comment = {
            ...data.comment,
            authorImg: JSON.parse(data.comment.authorImg),
          };
          setComments((prev) => [comment, ...prev]);
        } else {
          setPageCount(1);
        }
      }
      setLoading(false);
    });
  };

  return (
    <>
      <h4>Feel free to leave a feedback</h4>
      <Card className={cursor ? "border-shadow p-2" : "p-2"}>
        <Card.Text
          contentEditable
          suppressContentEditableWarning
          className="p-3"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            overflowX: "hidden",
            outline: "none",
          }}
          onInput={handleInputText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {!cursor ? "Write your opinion..." : null}
        </Card.Text>
      </Card>
      {loading ? (
        <Button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Loading...</span>
        </Button>
      ) : (
        <Button
          className="btn-outline-warning"
          size="sm"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
      {error && (
        <div className="my-2">
          <CustomAlert
            message={error.message}
            variant={error.status}
            setState={setError}
          />
        </div>
      )}
    </>
  );
};

export default CommentForm;
