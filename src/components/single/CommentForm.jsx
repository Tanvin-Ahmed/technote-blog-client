import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const CommentForm = () => {
  const [cursor, setCursor] = useState(false);
  const [content, setContent] = useState("");

  const handleFocus = () => {
    setCursor(true);
  };
  const handleBlur = () => {
    setCursor(false);
  };

  const handleInputText = (e) => {
    setContent(e.target.innerHTML);
  };

  return (
    <>
      <h4>Feel free to leave a feedback</h4>
      <Card className={cursor ? "border-shadow p-2" : "p-2"}>
        <Card.Text
          contentEditable
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
      <Button className="btn-outline-warning" size="sm">
        Submit
      </Button>
    </>
  );
};

export default CommentForm;
