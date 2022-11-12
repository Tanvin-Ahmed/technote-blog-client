import React from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  return (
    <Container>
      <div className="form-container">
        <div className="card p-4 main">
          <Form>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                Email address
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit" className="mt-4">
                Login
              </Button>
            </div>
            <Alert variant="danger" className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <strong>Oh snap!</strong> and try submitting again.
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                ></button>
              </div>
            </Alert>
            <small>
              Don't you have an account? <Link to="/register">Register</Link>
            </small>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
