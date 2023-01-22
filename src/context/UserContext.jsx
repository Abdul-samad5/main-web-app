import React, { useState, createContext } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //   const [userToken, setUserToken] = useState("");

  const onUserLogin = (token) => {
    window.sessionStorage.setItem("_tksr", JSON.stringify(token));
  };

  const onUserLogOut = () => {
    window.sessionStorage.removeItem("_tksr");
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
