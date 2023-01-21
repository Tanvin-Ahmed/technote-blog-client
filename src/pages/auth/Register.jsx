import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../apis/auth";
import { userContext } from "../../components/context/UserContext";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import Loader from "../../components/shared/loader/Loader";
import { getUserData } from "../../utils/auth/tokenValidation";
import { compressImage } from "../../utils/handleImages/compressImage";
import { uploadImageInImageBB } from "../../utils/handleImages/uploadImage";
import "./login.scss";

const Register = () => {
  const { setUserInfo: setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setLoading(true);
    const { compressedImage, errorMessage } = await compressImage(image);

    if (errorMessage) return;

    const { img, errorMessage: imgUploadError } = await uploadImageInImageBB(
      compressedImage,
      "user"
    );

    if (imgUploadError) return console.log(imgUploadError);

    const userData = {
      img,
      ...userInfo,
    };

    const { user, error } = await register(userData);
    setError(error);
    setLoading(false);
    if (!error) {
      setSuccess(user);
      setUser(getUserData());
      navigate(from);
    }
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
            <Form.Group className="mt-4">
              <Form.Control
                type="file"
                id="img-selection"
                accept="image/png, image/gif, image/jpeg, image/*"
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Form.Label
                htmlFor="img-selection"
                className="btn btn-outline-primary"
                style={{ width: "100%", padding: "6px" }}
              >
                Upload Image
              </Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit" className="mt-4">
                Register
              </Button>
            </div>
            <div className="text-center my-4">
              {loading && <Loader />}
              {error && (
                <CustomAlert
                  variant={error.status === 409 ? "warning" : "danger"}
                  message={error.message}
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
              Don you have an account?{" "}
              <Link to="/login">
                <strong>Login</strong>
              </Link>
            </small>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
