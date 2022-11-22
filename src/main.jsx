import React from "react";
import ReactDOM from "react-dom/client";
import LoginProvider from "./context/LoginContext";
import "./index.css";
import App from "./App";
import UserContext from "./context/UserContext";
import { Dashboard } from "./pages";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <UserContext>
        <App />
      </UserContext>
    </LoginProvider>
  </React.StrictMode>
);