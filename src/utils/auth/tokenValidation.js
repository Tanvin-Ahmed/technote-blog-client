import jwt_decode from "jwt-decode";
import { getDataFromLS } from "../localStorage";

export const checkTokenSyntax = (token = "") => {
  const pattern =
    /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gi.test(token);

  return pattern;
};

export const checkToken = () => {
  const token = getDataFromLS("access-token");

  if (!token) return false;

  const pattern = checkTokenSyntax(token);

  if (pattern) {
    const { exp } = jwt_decode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  }

  return false;
};

export const getUserData = () => {
  const token = getDataFromLS("access-token");

  if (!token) return {};

  const pattern = checkTokenSyntax(token);
  if (pattern) {
    const { data } = jwt_decode(token);
    const info = { ...data, img: data?.img && JSON.parse(data.img) };
    return info;
  }
};
