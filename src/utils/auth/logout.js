import { removeDataFromLS } from "../localStorage";

export const logoutFunction = (navigate) => {
  removeDataFromLS("access-token");
  navigate("/login");
};
