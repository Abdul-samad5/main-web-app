import React from "react";
import ReactDOM from "react-dom/client";
import LoginProvider from "./context/LoginContext";
import "./index.css";
import { Register } from "./pages";
import { Dashboard }from "./pages";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Dashboard />
  </React.StrictMode>
);
