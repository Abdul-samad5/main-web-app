import React, { createContext, useEffect, useState } from "react";
import { getProductsId } from "../services/services";
export const BuyerContext = createContext();

const BuyerContextProvider = ({ children }) => {
    const [productsId, setProductsId] = useState([]);
    const urls = window.location.pathname;
    console.log(urls); 
    const items = localStorage.getItem("Cart");
    const [cartItems, setCartItems] = useState(items !== null ? JSON.parse(items) : []);
    const [quantity, setQuantity] = useState(1);
  
    const addToCart = (id) => {
      const existingItem = cartItems.find((item) => item.id === id);
      const singleItem = productsId.find((product) => {
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
  
  useEffect(() => {
    const getData = async () => {
      const request = await getProductsId(urls);
      const data = request.data.data;
      console.log(data);

      setProductsId(data);
    };
    getData();
  }, []);
  return (
    <BuyerContext.Provider
      value={{
        productsId,
        addToCart
      }}
    >
      {children}
    </BuyerContext.Provider>
  );
};

export default BuyerContextProvider;
