import React from "react";
import { Button, Card } from "react-bootstrap";
import { posts } from "../../utils/fakeData";

const Menu = () => {
  return (
    <div className="menu">
      <h3>Other post you may like</h3>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4 p-2">
          <Card.Img
            src={post.img}
            style={{ height: "150px", width: "100%", objectFit: "cover" }}
            alt=""
            className="border-shadow"
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Button variant="outline-primary" size="sm">
              Read More
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Menu;
