import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function userLoggedIn() {
    setIsLoggedIn(true);
    window.localStorage.setItem("isLoggedIn", true);
  }

  function userLoggedOut() {

    window.localStorage.clear("isLoggedIn");
    window.localStorage.clear("token");
    setIsLoggedIn(false);
    window.localStorage.setItem("isLoggedIn", false);
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
