import React from "react";

const defaultStyle = {
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "50%",
};

const Avatar = ({ src, alt, styles }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="border-shadow"
      style={{ ...defaultStyle, ...styles }}
    />
  );
};

export default Avatar;
