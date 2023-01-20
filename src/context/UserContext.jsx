import React, { useState, createContext } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //   const [userToken, setUserToken] = useState("");

  const onUserLogin = (token) => {
    Cookies.set("_tksr", token);
  };

  const onUserLogOut = () => {
    Cookies.remove("token");
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
