import React from "react";
import ReactDOM from "react-dom/client";
import LoginProvider from "./context/LoginContext";
import "./index.css";
import App from "./App";
import UserContext from "./context/UserContext";
import CartContextProvider from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <UserContext>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </UserContext>
    </LoginProvider>
  </React.StrictMode>
);
