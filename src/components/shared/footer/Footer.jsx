import React from "react";
import { Container } from "react-bootstrap";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer mt-5">
      <Container>
        <hr />
        <strong className="d-block text-center pb-3">
          Developed by <span className="text-danger">Tanvin Ahmed</span>
        </strong>
      </Container>
    </div>
  );
};

export default Footer;
