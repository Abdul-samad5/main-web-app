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
import ProductDetails from "./store-components/ProductDetails";

function App() {
  const { isLoggedIn } = useContext(LoginContext);


  // const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  const PreventLogin = ({ children }) => {
    console.log(isLoggedIn);
    return isLoggedIn ? children : <Navigate to={"/"} />;
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
            
              <StoreFront />
            
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
            
              <Cart
                cart={cart}
                deleteFromCart={deleteFromCart}
                clearCart={clearCart}
                changeQuantity={changeQuantity}
              />
            
          }
        />
        <Route
          path="/store-front/checkout"
          element={
            <Checkout cart={cart} />
          }
        />
        <Route
          path="/store-front/:productId"
          element={
            <ProductDetails />
          }
        />
      </Routes>
    </Router>
  );
}

{/* <PreventLogin>
              <Checkout cart={cart} />
            </PreventLogin> */}

export default App;
