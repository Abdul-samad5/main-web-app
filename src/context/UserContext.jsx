import React, { useState, createContext } from "react";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const getUserToken = (data) => {
    if (userData === undefined) {
      window.localStorage.setItem("isLoggedIn", false);
      setUserData(null);
    } else {
      setUserData(data);
    }
  };

  const onUserLogOut = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, getUserToken, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
