import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap.min.css";
import BlogContext from "./components/context/BlogContext";
import UserContext from "./components/context/UserContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext>
      <BlogContext>
        <App />
      </BlogContext>
    </UserContext>
  </React.StrictMode>
);
