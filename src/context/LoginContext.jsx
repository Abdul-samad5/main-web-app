import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  function userLoggedOut() {
    Cookies.remove('_tksr');
    Cookies.remove('email_url');
    Cookies.remove('user_is_active');
  }

  return (
    <LoginContext.Provider value={{ userLoggedOut }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
