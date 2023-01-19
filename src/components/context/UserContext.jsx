import React, { createContext, useEffect, useState } from "react";
import { checkToken, getUserData } from "../../utils/auth/tokenValidation";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (checkToken()) {
      setUserInfo(getUserData());
    }
  }, []);

  const values = { userInfo, setUserInfo };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export default UserContext;
