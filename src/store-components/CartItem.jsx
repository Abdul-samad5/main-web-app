import React, { useContext } from "react";

import { CartContext } from "../context/CartContext";
import SingleCartItem from "./SingleCartItem";

const CartItem = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((cartItem) => {
        return <SingleCartItem key={cartItem.id} item={cartItem} />;
      })}
    </div>
  );
};

export default CartItem;
