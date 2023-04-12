import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/services";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (id) => {
    // const filterId = products.map((product) => product.id);

    const existingItem = cartItems.find((item) => item.id === id);
    const singleItem = products.find((product) => {
      return product.id === id;
    });
    if (singleItem) {
      if (existingItem) {
        return setCartItems((prevItem) => [...prevItem]);
      } else {
        setCartItems((prevItem) => {
          return [...prevItem, singleItem];
        });
      }
    } else {
      setCartItems(cartItems);
    }
  };

  const getCartItemsTotal = () => {
    const prices = cartItems.map((item) => Number(item.price));

    const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);

    return totalPrice * quantity;
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
    const deletedItem = cartItems.filter((product) => id !== product.id);

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
