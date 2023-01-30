import React, { useState, createContext } from "react";
import Cookies from "js-cookie";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    
  const onUserLogin = (token, email, user_id) => {
    Cookies.set("_tksr", token, { secure: true });
    Cookies.set("_email", email, { secure: true });
    Cookies.set("_id", user_id, { secure: true });
  };

  const onUserLogOut = () => {
    Cookies.remove("_tksr", { path: "" });
    Cookies.remove("_email", { path: "" });
    Cookies.remove("_id", { path: "" });
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
