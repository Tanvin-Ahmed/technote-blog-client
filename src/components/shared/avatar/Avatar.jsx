import React from "react";

const Avatar = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="border-shadow"
      style={{
        width: "50px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  );
};

export default Avatar;
