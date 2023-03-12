import React, { useContext } from "react";
import { useState } from "react";
import { IoMdTrash, IoIosAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

import { CartContext } from "../context/CartContext";

const CartItem = () => {
  const {
    cartItems,
    deleteFromCart,
    getCartItemsTotal,
    quantity,
    handleIncrease,
    handleDecrease,
  } = useContext(CartContext);
  const [itemQuantity, setItemQuantity] = useState(quantity);

  return (
    <div>
      {cartItems.map((cartItem) => {
        return (
          <div class="w-[300px] ">
            <div class="">
              <ul
                key={cartItem.id}
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li class="pt-3 pb-0 sm:pt-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src={cartItem.media}
                        alt="item image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate ">
                        {cartItem.title}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {cartItem.quantity}
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 ">
                      &#8358;{cartItem.price}
                    </div>
                    <div className=" inline-flex items-center text-base font-semibold text-gray-900 ">
                      <IoIosAdd onClick={() => handleIncrease()} />
                      <input
                        type="text"
                        value={quantity}
                        className="w-[15px] bg-white pl-0.5"
                        name="cartQuantity"
                        onChange={() =>
                          setItemQuantity(getCartItemsTotal() * itemQuantity)
                        }
                      />
                      <AiOutlineMinus onClick={() => handleDecrease()} />
                    </div>
                    <button
                      onClick={() => deleteFromCart(cartItem.id)}
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
      })}
    </div>
  );
};

export default CartItem;

//   <span
//     onClick={() => deleteFromCart(cartItem.id)}
//     className="my-auto  flex items-center gap-3"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 448 512"
//       className="w-4 h-3 fill-slate-300 hover:fill-brand-primary"
//     >
//       <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
//     </svg>
//   </span>
// </div>
