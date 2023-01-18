import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../apis/user";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import Loader from "../../components/shared/loader/Loader";
import "./login.scss";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
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

    const { user, error } = await login(userInfo);
    setError(error);
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
                Email address
              </Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
                value={userInfo.email}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="exampleInputEmail1" class="form-label mt-4">
                Password
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                value={userInfo.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit" className="mt-4">
                Login
              </Button>
            </div>
            <div className="text-center my-4">
              {loading && <Loader />}
              {error && (
                <CustomAlert
                  variant={error?.status === 401 ? "warning" : "danger"}
                  message={error?.message}
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
            </div>
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
