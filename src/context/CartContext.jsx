import React, { createContext, useEffect, useState } from "react";
import { logo } from "../assets";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (id) => {
    const items = cart.find((item) => item.id === id);
    setCart((prevItem) => {
      return [
        { ...prevItem, id: items.id, name: items.name, image: items.image },
      ];
    });
  };

  useEffect(() => {
    setCartTotal(cart.length);
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
