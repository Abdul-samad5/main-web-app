import React, { createContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const onUserLogin = (
    token,
    email,
    user_id,
    user_is_active,
    user_email_url
  ) => {
    Cookies.set('_tksr', token, { secure: true });
    Cookies.set('_email', email, { secure: true });
    Cookies.set('_id', user_id, { secure: true });
    Cookies.set('user_is_active', user_is_active, { secure: true });
    Cookies.set('email_url', user_email_url, { secure: true });
  };

  const onUserLogOut = () => {
    Cookies.remove('_tksr', { path: '' });
    Cookies.remove('_email', { path: '' });
    Cookies.remove('_id', { path: '' });
    Cookies.remove('user_is_active', user_is_active);
    Cookies.remove('email_url', user_email_url);
  };

  return (
    <UserContext.Provider value={{ onUserLogOut, onUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
