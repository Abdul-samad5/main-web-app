import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cartItems, getCartItemsTotal } = useContext(CartContext);
  const { storeName } = useContext(UserContext);
  return (
    <div className="">
      {/* <Navbar/> */}
      <Navbar />
      <div className="bg-gray-200 lg:px-20 px-6 py-2 flex justify-start items-start">
        <Link
          to={`/store-front/${storeName}`}
          className="text-brand-primary text-xs hover:text-brand-secondary hover:cursor-pointer"
        >
          Home
        </Link>

        <Link to="/store-front/view-cart">
          <p className="text-brand-primary text-xs hover:text-brand-secondary hover:cursor-pointer">
            {" "}
            / shopping cart
          </p>
        </Link>
      </div>
      <h1 className="text-3xl font-semibold text-black text-center my-8">
        SHOPPING CART
      </h1>

      {/* To be displayed if there's nothing in the cart yet */}
      <div className={cartItems.length === 0 ? "my-6" : "hidden"}>
        {/* <img src={Logo} alt="" className='w-1/3 mx-auto'/> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-1/4 mx-auto fill-gray-300"
          viewBox="0 0 576 512"
        >
          <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
        </svg>

        <h1 className="text-center text-4xl font-semibold text-black">
          SHOPPING CART IS EMPTY
        </h1>
        <p className="text-gray-300 text-base text-center">
          You have no items in your shopping cart!
        </p>
        <Link to="/store-front" className="">
          <div className="mx-auto lg:w-1/4 w-1/2 mt-8 text-center bg-brand-primary hover:bg-brand-secondary rounded text-white px-3 py-3">
            Continue shopping
          </div>
        </Link>
      </div>

      {/* To display all the products the user has added to the cart */}
      <div className={cartItems.length === 0 ? "hidden" : 'lg:px-20 px-10'}>
          {cartItems.map((product, index) => {
              return (
                <div key={index}>
                  <CartProducts
                    productLogo={product.media}
                    productName={product.title}
                    productPrice={product.price}
                    id={product.id}
                    // deleteFromCart={deleteFromCart}
                    // changeQuantity={changeQuantity}
                    quantity={product.quantity}
                    // reRender={reRender}
                  />
                </div>
              )
          })}
        <div className="py-6">
          <div className="lg:flex lg:justify-between grid place-content-center w-full">
            <Link to={`/store-front/${storeName}`}>
              <span className="flex group hover:opacity-80 hover:cursor-pointer">
                <span className="mr-3 my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-brand-primary group-hover:fill-brand-secondary"
                    viewBox="0 0 512 512"
                  >
                    <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                  </svg>
                </span>
                <p className="text-brand-primary my-auto group-hover:text-brand-secondary">
                  Continue shopping
                </p>
              </span>
            </Link>

            <div className="lg:flex">
              <div className="flex group lg:my-auto my-3 hover:opacity-80 hover:cursor-pointer">
                <span className="my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 mr-1 h-3 fill-brand-primary group-hover:fill-brand-secondary"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                  </svg>
                </span>
                <p className="text-sm group-hover:text-brand-secondary text-brand-primary">
                  CLEAR SHOPPING CART
                </p>
              </div>

              {/* <div className="flex group lg:my-auto my-3 lg:ml-3 hover:opacity-80 hover:cursor-pointer">
                <span className="my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 mr-1 h-3 fill-brand-primary group-hover:fill-brand-secondary"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                  </svg>
                </span>
                <p className="text-sm group-hover:text-brand-secondary text-brand-primary">
                  UPDATE CART
                </p>
              </div> */}
            </div>
          </div>

          <div className="shadow-lg px-5 py-5 w-11/12 lg:w-1/3 mx-auto mt-10 border border-gray-100">
            <div className="flex justify-between mb-3">
              <p>SUBTOTAL:</p>
              <span className="flex my-2 lg:my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-black my-auto"
                  viewBox="0 0 448 512"
                >
                  <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                </svg>
                <p className="text-sm my-auto">{getCartItemsTotal()}</p>
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <p className="text-black font-semibold">GRAND TOTAL:</p>
              <span className="flex my-2 lg:my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-black my-auto"
                  viewBox="0 0 448 512"
                >
                  <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                </svg>
                <p className="text-sm my-auto">{"Get grand total"}</p>
              </span>
            </div>

            <Link
              to="/store-front/checkout"
              className="grid place-content-center"
            >
              <div className="w-full flex text-white py-auto hover:cursor-pointer rounded mx-auto mt-4 py-3 text-center px-4 bg-brand-primary hover:bg-brand-secondary">
                <div className="my-auto mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-white"
                    viewBox="0 0 576 512"
                  >
                    <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
                  </svg>
                </div>
                <span className="my-auto">Proceed to checkout</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Cart product. Can edit the quantity and delete the particular item from the cart.
const CartProducts = ({ productLogo, productName, productPrice, id, quantity }) => {
  const [thisQuantity, setThisQuantity] = React.useState(quantity);
  
  const handleChange = (event) => {
    setThisQuantity(event.target.value);
    // changeQuantity(id, event.target.value);
    // reRender();
  };

  return (
    <div className="flex justify-between w-full py-6 border-t border-b border-gray-200">
      <img
        src={productLogo}
        alt=""
        className="rounded my-auto shadow-sm w-[80px] h-[50px]"
      />

      <span className="lg:flex justify-between lg:w-1/2">
        <p className="text-sm font-semibold lg:my-auto my-2 text-black">
          {productName}
        </p>

        <span className="flex my-2 lg:my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 fill-black my-auto"
            viewBox="0 0 448 512"
          >
            <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
          </svg>
          <p className="text-sm my-auto">{productPrice}</p>
        </span>

        <input
          type="number"
          name="quantity"
          value={thisQuantity}
          className="bg-gray-200 rounded my-2 lg:my-auto w-[120px] py-3 px-3"
          onChange={handleChange}
        />

        <span className="flex my-2 lg:my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 fill-black my-auto"
            viewBox="0 0 448 512"
          >
            <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
          </svg>
          <p className="text-sm my-auto">{2 * thisQuantity}</p>
        </span>
      </span>

      <span className="my-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3 fill-brand-primary hover:fill-brand-secondary"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
        </svg>
      </span>
    </div>
  );
};

export default Cart;
