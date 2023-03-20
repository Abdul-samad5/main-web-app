import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/services";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < 0) {
      return 1;
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrease = () => {
    if (quantity < 0) {
      return 1;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (id) => {
    // const filterId = products.map((product) => product.id);
    const singleItem = products.find((product) => {
      return product.id === id;
    });
    setCartItems((prevItem) => {
      return [...prevItem, singleItem];
    });
  };

  const getCartItemsTotal = () => {
    const prices = cartItems.map((item) => Number(item.price));

    const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);

    return totalPrice * quantity;
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
        cartItems,
        addToCart,
        deleteFromCart,
        getCartItemsTotal,
        quantity,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
