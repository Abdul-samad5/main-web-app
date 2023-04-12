import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoMdTrash, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const SingleCartItem = ({ item }) => {
  const { quantity, deleteFromCart, handleIncrease, handleDecrease } =
    useContext(CartContext);
  const [count, setCount] = useState(quantity);

  const handleCartIncrease = () => {
    setCount(count + 1);
  };

  const handleCartDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div class="w-[300px] ">
      <div class="">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="pt-3 pb-0 sm:pt-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src={item.media}
                  alt="item image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate ">
                  {item.title}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {item.quantity}
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 ">
                <p>&#8358;{item.price}</p>
              </div>
              <div className=" inline-flex items-center text-base font-semibold text-gray-900 ">
                <input
                  type="text"
                  value={count}
                  className="w-[20px] bg-slate-100"
                  name="cartQuantity"
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <IoMdArrowDropup onClick={() => handleCartIncrease()} />
                <IoMdArrowDropdown onClick={() => handleCartDecrease()} />
              </div>
              <button
                onClick={() => deleteFromCart(item.id)}
                className=" inline-flex items-center text-base font-semibold text-gray-900 "
              >
                <IoMdTrash />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleCartItem;
