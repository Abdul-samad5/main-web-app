import React, { useState, createContext } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //   const [userToken, setUserToken] = useState("");
  
  // const getUserToken = (data) => {
  //   if (userData === undefined) {
  //     window.localStorage.setItem("isLoggedIn", false);
  //     setUserData(null);
  //   } else {
  //     setUserData(data);
  //   }
  // };

  //const onUserLogOut = () => {
    // setUserData(null);
    // window.localStorage.setItem("isLoggedIn", false);
    
  const onUserLogin = (token) => {
    Cookies.set("_tksr", token);
  };

  const onUserLogOut = () => {
    Cookies.remove("token");
  };

  // const onUserLogin = (data) => {
   // setUserData(data);
   // window.localStorage.setItem("isLoggedIn", true);
 // }

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
