import React, { createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //   const [userToken, setUserToken] = useState("");

  const onUserLogin = (token) => {
    Cookies.set("_tksr", token, { secure: true });
  };

  const onUserLogOut = () => {
    Cookies.remove("_tksr", { path: "" });
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
