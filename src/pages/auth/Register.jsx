import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../../apis/user";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import "./login.scss";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { user, errorMessage } = await register(userInfo);
    setError(errorMessage);
    setSuccess(user);
    setLoading(false);
  };

  return (
    <Container>
      <div className="form-container">
        <div className="card p-4 main">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                User name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="username"
                onChange={handleChange}
                value={userInfo.username}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={userInfo.email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                value={userInfo.password}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit" className="mt-4">
                Register
              </Button>
            </div>
            {error && (
              <CustomAlert
                variant={"danger"}
                message={error}
                setState={setError}
              />
            )}
            {success && (
              <CustomAlert
                variant={"success"}
                message={success}
                setState={setSuccess}
              />
            )}
            <small>
              Don you have an account? <Link to="/login">Login</Link>
            </small>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
