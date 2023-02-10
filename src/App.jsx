import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Register, Dashboard, StoreFront } from "./pages";
import React, { useContext } from "react";
import { Cart, Checkout } from "./store-components";
import { cartContext } from "./context/CartContext";
 
import { GetStarted, Login, ResetPassword } from "./components";


import Cookies from "js-cookie";
import ProductDetails from "./store-components/ProductDetails";

function App() {
  const { cart, deleteFromCart, clearCart, changeQuantity } =
    useContext(cartContext);

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
        <Route
          path="/store-front/:productId"
          element={
            <PreventLogin>
              <ProductDetails />
            </PreventLogin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
