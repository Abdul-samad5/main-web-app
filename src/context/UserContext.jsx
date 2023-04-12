import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getStoreDetails } from "../services/services";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [storeName, setStoreName] = useState("");
  const [storeLogo, setStoreLogo] = useState("");

  const onUserLogin = (token, email, user_id, emailUrl, user_is_active, type) => {
    Cookies.set("_tksr", token, { secure: true });
    Cookies.set("_email", email, { secure: true });
    Cookies.set("_id", user_id, { secure: true });
    Cookies.set("emailUrl", emailUrl, { secure: true });
    Cookies.set("isVerify", user_is_active, { secure: true });
    Cookies.set("user_type", type, { secure: true });
  };

  const onUserLogOut = () => {
    Cookies.remove("_tksr", { path: "" });
    Cookies.remove("_email", { path: "" });
    Cookies.remove("_id", { path: "" });
    Cookies.remove("emailUrl", { path: "" });
    Cookies.remove("isVerify", { path: "" });
    Cookies.remove("user_type", { path: "" });
    Cookies.remove("emailVerify", { path: "" })
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getStoreDetails();

      const store_name = response.data.data["store_name"];
      const storeLogo = response.data.data["store_logo"];

      setStoreName(store_name);
      setStoreLogo(storeLogo);
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{ onUserLogOut, onUserLogin, storeName, storeLogo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
