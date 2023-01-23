import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Register, Dashboard, StoreFront } from "./pages";
import { LoginContext } from "./context/LoginContext";
import React, { useContext } from "react";
import { Cart, Checkout } from "./store-components";
import { cartContext } from "./context/CartContext";
import { GetStarted, Login } from "./components";
import Cookies from "js-cookie";

function App() {
  const { isLoggedIn } = useContext(LoginContext);
  const tk = Cookies.get("_tksr");

  const PreventLogin = ({ children }) => {
    return tk ? children : <Navigate to={"/"} />;
  };
  const { cart, deleteFromCart, clearCart, changeQuantity } =
    useContext(cartContext);
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
        <Route
          path="/store-front"
          element={
            <PreventLogin>
              <StoreFront />
            </PreventLogin>
          }
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
              <Cart
                cart={cart}
                deleteFromCart={deleteFromCart}
                clearCart={clearCart}
                changeQuantity={changeQuantity}
              />
            </PreventLogin>
          }
        />
        <Route
          path="/store-front/checkout"
          element={
            <PreventLogin>
              <Checkout cart={cart} />
            </PreventLogin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
