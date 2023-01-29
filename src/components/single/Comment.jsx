import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Avatar from "../shared/avatar/Avatar";
import TimeStamp from "../shared/timeStapm/TimeStamp";

const Comment = () => {
  const [cursor, setCursor] = useState(false);

  const handleDoubleClick = () => {
    setCursor(true);
  };

  const handleBlur = () => {
    setCursor(false);
  };

  return (
    <Card className="border-shadow p-3 my-3">
      <Row>
        <Col sm={2}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <Avatar
              src={
                "https://manofmany.com/wp-content/uploads/2019/04/David-Gandy.jpg"
              }
              alt=""
            />
            <h6>
              <strong>user name</strong>
            </h6>
          </div>
        </Col>
        <Col sm={10}>
          <Card.Text
            contentEditable={cursor}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, impedit delectus consequuntur amet quaerat ducimus harum
            vel optio sit. Aut est laborum tempora cumque nostrum pariatur
            accusantium doloremque sint consequuntur? Consequatur quam commodi
            expedita alias maiores velit delectus. Consequatur nobis excepturi
            vel voluptate enim quos blanditiis error fugit aspernatur quod
            doloremque nesciunt fuga, temporibus dolor quisquam ipsam? Labore
            dolorem rerum odit alias mollitia velit repellendus. Quae
            repellendus animi corporis omnis quas. Facere, veniam! Laudantium
            ducimus adipisci ea delectus in asperiores officia itaque dolore,
            architecto sint voluptates cupiditate inventore consequuntur
            explicabo commodi rem deserunt aliquam eius hic, dolores amet
            dolorum similique.
          </Card.Text>
          <div className="mt-4">
            <small>
              <strong>
                <TimeStamp createAt={new Date()} updateAt={new Date()} />
              </strong>
            </small>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Comment;
