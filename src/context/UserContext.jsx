import React, { useState, createContext } from "react";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //   const [userToken, setUserToken] = useState("");

  const onUserLogin = (token, data) => {
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  const onUserLogOut = () => {
    window.localStorage.clear("token");
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
