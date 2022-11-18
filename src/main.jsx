import React from "react";
import ReactDOM from "react-dom/client";
import LoginProvider from "./context/LoginContext";
import "./index.css";
import App from "./App";
import UserContext from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>
);