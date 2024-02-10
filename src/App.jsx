import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Register, Dashboard, StoreFront } from "./pages";
import React, { useContext, useEffect } from "react";
import { Cart, Checkout } from "./store-components";
import { GetStarted, CreateStore, Login, ResetPassword } from "./components";
import Cookies from "js-cookie";
import { SignUp } from "./components";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import ActiveAccount from "./components/ActiveAccount";
import VendorStore from "./store-components/VendorStore";
function App() {
  const PreventLogin = ({ children }) => {
    const tk = Cookies.get("_tksr");
    return tk ? children : <Navigate to={"/"} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PreventLogin>
              <Dashboard />
            </PreventLogin>
          }
        />

        <Route path="/login" element={<Login />} />
        {/* <Route path="/:user_id" element={<VendorStore />} /> */}
        <Route path="/register" element={<Register />} />

        <Route path="/create-store" element={<CreateStore />} />

        {/* <Route
          path="/store-front/:storeName"
          element={
            <PreventLogin>
              <StoreFront />
            </PreventLogin>
          }
        /> */}
         <Route
          path="/:Name"
          element={<StoreFront />  }
        />

        <Route
          path="/getStarted"
          element={
            <PreventLogin>
              <GetStarted />
            </PreventLogin>
          }
        />
        <Route
          path="/store-front/view-cart"
          element={
            <PreventLogin>
              <Cart />
            </PreventLogin>
          }
        />

        <Route
          path="/store-front/checkout"
          element={
            <PreventLogin>
              <Checkout />
            </PreventLogin>
          }
        />

        <Route
          path="/activate-account"
          element={<ActiveAccount/>}
        />
        {/* <Route
          path="/store-front/:productId"
          element={
            <PreventLogin>
              <ProductDetails />
            </PreventLogin>
          }
        /> */}
        <Route
          path="/signUp"
          element={
            <SignUp />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPassword />
          }
        />
        <Route
          path="/reset-password-confirm/:id/:token"
          element={<ResetPasswordConfirm/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
