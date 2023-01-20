import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function userLoggedIn() {
    setIsLoggedIn(true);
  }

  function userLoggedOut() {
    setIsLoggedIn(false);
    Cookies.remove("_tksr");
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, userLoggedIn, userLoggedOut }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
