import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { logoutFunction } from "../../../utils/auth/logout";
import { checkToken } from "../../../utils/auth/tokenValidation";
import { userContext } from "../../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { setUserInfo } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = checkToken();

  if (!auth) {
    logoutFunction(navigate);
    setUserInfo({});
  }

  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
