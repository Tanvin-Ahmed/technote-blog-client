import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { posts } from "../../utils/fakeData";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleRoute = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <section className="section-height home">
      <div className="posts mt-4">
        <h1>Popular blogs</h1>
        {posts.map((post) => (
          <Card className="w-100 my-5 p-4" key={post.id}>
            <Row>
              <Col md={"4"} sm={"12"}>
                <Card.Img
                  src={post.img}
                  className="card-img border-shadow"
                  alt="blog img"
                />
              </Col>
              <Col md={"8"} sm={"12"}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Button onClick={() => handleRoute(post.id)} variant="info">
                    Read more
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Home;
