import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.scss";

const Loader = ({ size = "" }) => {
  return <Spinner animation="border" variant="primary" size={size} />;
};

export default Loader;
