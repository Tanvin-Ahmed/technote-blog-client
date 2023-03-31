import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeDataFromLS } from "../../../utils/localStorage";
import { blogContext } from "../../context/BlogContext";
import { userContext } from "../../context/UserContext";
import "./header.scss";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const { pendingBlogsCurrentPage } = useContext(blogContext);

  const handleLogout = () => {
    setUserInfo({});
    removeDataFromLS("access-token");
  };

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="#cover" className="logo">
          Tech Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="m-auto"></div>
          <Nav>
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </Nav.Link>
            {!!Object.keys(userInfo).length ? (
              <>
                <NavDropdown title={userInfo?.username} id="profile-dropdown">
                  <NavDropdown.Item>
                    <Nav.Link>
                      <Link
                        to={"/user/profile"}
                        style={{
                          textDecoration: "none",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        Profile
                      </Link>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link>
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Login
                </Link>
              </Nav.Link>
            )}
            {userInfo?.isAdmin && (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to={`/admin/pending-blogs/${pendingBlogsCurrentPage}`}
                    style={{ textDecoration: "none" }}
                  >
                    Manage Pending Blogs
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/admin/manage-category"
                    style={{ textDecoration: "none" }}
                  >
                    Manage Category
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link>
              <Link to="/write" className="write-button" title="Write a note">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
