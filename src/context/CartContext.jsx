import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/services";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (id) => {
    const filterId = products.map((product) => product.id);
    console.log(filterId);
    const singleItem = products.find((product) => {
      return product.id === id;
    });
    setCartItems((prevItem) => {
      return [...prevItem, singleItem];
    });
    console.log(singleItem);
  };

  const getCartItemsTotal = () => {
    const prices = cartItems.map((item) => Number(item.price));

    const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);

    return totalPrice;
  };

  const deleteFromCart = (id) => {
    const deletedItem = cartItems.filter((product) => id !== product.id);
    console.log(deletedItem);
    return setCartItems(deletedItem);
  };

  useEffect(() => {
    const getData = async () => {
      const request = await getProducts();
      const data = request.data.data;

      setProducts(data);
    };
    getData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        deleteFromCart,
        getCartItemsTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
