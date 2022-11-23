import { BrowserRouter as Router, Route, Routes , Navigate} from "react-router-dom";
import { Register, Dashboard, StoreFront} from "./pages";
import { LoginContext } from "./context/LoginContext";
import React, { useContext, createContext, useState} from "react";
import { Cart, Checkout } from "./store-components";
import { logo } from "./assets";

export const cartContext = createContext();
function App() {
  const [products, setProducts] = useState([
    {
        id: 1,
        productLogo: logo,
        productPrice: 2000,
        productName: "Cloth"
    },
    {
        id: 2,
        productLogo: logo,
        productPrice: 4000,
        productName: "Indomie"
    },
    {
        id: 3,
        productLogo: logo,
        productPrice: 10000,
        productName: "Bedsheets"
    },
    {
        id: 4,
        productLogo: logo,
        productPrice: 5000,
        productName: "Tv Remote"
    },
  ]);

  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const addToCart = (id) => {
      const item = cart.find(p => p.id === id);
      if(typeof item === 'undefined') {
        const product = products.find(p => p.id === id);
        product.quantity = 1;
        cart.push(product)
        console.log(product);
        setCart(cart);
        setCartLength(() => cart.length);
      } else {
          alert("Already added to cart.");
      }
  }

  const changeQuantity = (id, value) => {
      let Item = cart.find(item => item.id === id);
      const index = cart.indexOf(Item);
      cart[index].quantity = value;
      setCart(cart);
  }

  const deleteFromCart = (id) => {
      let product = cart.find(p => p.id === id);
      cart.splice(cart.indexOf(product), 1);
      setCart(cart);
      setCartLength(() => cart.length);
  }

  const clearCart = () => {
      setCart([]);
      setCartLength(0);
  }

  const getTotal = () => {
      if(cart.length === 0) {
          return 0
      }
      return cart.reduce((total, currentValue) => {
          return total + currentValue.productPrice
      }, 0);
  }
  const {isLoggedIn} = useContext(LoginContext);
  const PreventLogin = ({children}) => {
    return isLoggedIn ? children : <Navigate to="/"/>
  }

  return (
    <cartContext.Provider value={{getTotal, products, cart, deleteFromCart, clearCart, changeQuantity, addToCart, cartLength}}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={
            <PreventLogin>
              <Dashboard />
            </PreventLogin>
          } />
          <Route path="/store-front" element={
            <PreventLogin>
              <StoreFront/>
            </PreventLogin>
          }/>
          <Route path="/store-front/view-cart" element={
            <PreventLogin>
              <Cart
                cart={cart}
                deleteFromCart={deleteFromCart}
                clearCart={clearCart}
                changeQuantity={changeQuantity}
              />
            </PreventLogin>
          }/>
          <Route path="/store-front/checkout" element={
            <PreventLogin>
              <Checkout cart={cart}/>
            </PreventLogin>
          }/>
        </Routes>
      </Router>
    </cartContext.Provider>
  );
}

export default App;
