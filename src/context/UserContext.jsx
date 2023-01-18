import React, { useState, createContext } from "react";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // const getUserToken = (data) => {
  //   if (userData === undefined) {
  //     window.localStorage.setItem("isLoggedIn", false);
  //     setUserData(null);
  //   } else {
  //     setUserData(data);
  //   }
  // };

  const onUserLogOut = () => {
    setUserData(null);
    // window.localStorage.setItem("isLoggedIn", false);
  };

  const onUserLogin = (data) => {
    setUserData(data);
    // window.localStorage.setItem("isLoggedIn", true);
  }

  return (
    <UserContext.Provider value={{ onUserLogOut, userData, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
