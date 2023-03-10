import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = () => {
  const { cartItems, deleteFromCart } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((cartItem) => {
        return (
          <div className="flex gap-5" key={cartItem.id}>
            <div className="w-[50px] ">
              <img
                src={cartItem.media}
                alt="Product"
                className="w-[100%] h-[50px]"
                style={{ borderRadius: "50%" }}
              />
            </div>

            <div className="my-auto flex gap-3">
              <h3 className="text-black">{cartItem.title}</h3>

              <span className="flex my-2 lg:my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-2 fill-black my-auto"
                  viewBox="0 0 448 512"
                >
                  <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                </svg>
                <h3 className=" font-bold my-auto">{cartItem.price}</h3>
              </span>
            </div>

            <span
              onClick={() => deleteFromCart(cartItem.id)}
              className="my-auto "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-3 fill-slate-300 hover:fill-brand-primary"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
