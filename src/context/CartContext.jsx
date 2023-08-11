import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/services";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const items = localStorage.getItem("Cart");
  const [cartItems, setCartItems] = useState(items !== null ? JSON.parse(items) : []);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    const singleItem = products.find((product) => {
      return product.id === id;
    });
    const newItem = {...singleItem, quantity: 1}
    if (singleItem) {
      if (existingItem) {
        setCartItems((prevItem) => [...prevItem]);
      } else {
        setCartItems((prevItem) => {
          return [...prevItem, newItem];
        });
        localStorage.setItem("Cart", JSON.stringify([...cartItems, newItem]));
      }
      // console.log(cartItems);
    } else {
      setCartItems(cartItems);
    }
  };

  const getCartItemsTotal = () => {
    const subTotal = cartItems.reduce((acc, curr)  => acc + Number(curr.price), 0);

    const grandTotal = cartItems.reduce((acc, curr)  => acc + (curr.price * curr.quantity), 0);

    return [subTotal, grandTotal];
  };

  const handleIncrease = () => {
    if (quantity < 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity < 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const deleteFromCart = (id) => {
    const newItems = cartItems.filter((product) => id !== product.id);
    localStorage.setItem("Cart", JSON.stringify(newItems));
    setCartItems(newItems);
  };

  useEffect(() => {
    const getData = async () => {
      const request = await getProducts();
      const data = request.data.data;
      console.log(data);

      setProducts(data);
    };
    getData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        getCartItemsTotal,
        addToCart,
        cartItems,
        quantity,
        deleteFromCart,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
