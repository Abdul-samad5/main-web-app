import React, { useState, useContext } from "react";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";
import CartItem from "./CartItem";

const Navbar = () => {
  const [cartToggled, setCartToggled] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [userIconToggled, setUserIconToggled] = useState(false);

  const { cartItems, getCartItemsTotal } = useContext(CartContext);

  const { userLoggedOut } = useContext(LoginContext);
  const { onUserLogOut, storeName, storeLogo } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogOut() {
    userLoggedOut();
    onUserLogOut();
    navigate("/");
  }

  return (
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>

                {/* <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  About us
                </a>

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Contact us
                </a>

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Coupons
                </a> */}
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <div
                onClick={() => {
                  setCartToggled((prev) => !prev);
                }}
              >
                <div className="relative bg-brand-primary rounded-full top-[0] right-2">
                  <p className="text-white text-xs absolute">
                    {cartItems.length}
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 fill-white mx-auto`}
                viewBox="0 0 576 512"
              >
                <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
              </svg>
            </button>

            <div class="relative ml-3">
              <div>
                <button
                  type="button"
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setDropDown(prev => !prev)}
                >
                  <span class="sr-only">Open user menu</span>
                  {/* <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                  <img
                    class="h-8 w-8 rounded-full"
                    src={storeLogo}
                    alt=""
                  />
                </button>
              </div>

              <div
                class={`right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ${dropDown ? "absolute" : "hidden invinsible"} shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            About us
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Contact us
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Coupons
          </a>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;

{
  /* <nav className="bg-white border-gray-200 items-center px-5 sm:px-4 py-5 dark:bg-gray-200">
      <div className="container flex gap-8 items-center justify-between mx-auto">
        <Link to={"/store-front"} className="flex items-center">
          <span className="self-center text-md md:text-2xl font-semibold whitespace-nowrap ">
            {storeName}
          </span>
        </Link>
        <div className="flex items-center justify-between gap-1 md:gap-10">
          <div
            className={`z-50 ${
              dropDown ? "" : "hidden"
            } my-4 text-base list-none bg-white divide-y fixed right-10 top-10 divide-gray-100 rounded-lg shadow `}
          >
            <div className="px-4 py-3">
              <span className="block text-sm ">{storeName}</span>
              <span className="block text-sm font-medium truncate">
                @myyetti.co
              </span>
            </div>
            <ul className="py-2">
              <li>
                <Link
                  to={"/dashboard"}
                  className="block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-200 "
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-200 "
                >
                  Settings
                </a>
              </li>
  
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-200  "
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <ul className="border-0 order-0 ">
            <li>
             
            </li>
  
            <div
              className={`${
                cartToggled ? "" : "hidden"
              }  absolute top-16 right-1 bg-slate-100 z-100 p-3`}
            >
              {cartItems.length > 0 ? (
                <>
                  <div class="flex items-center justify-between mb-2">
                    <h5 class="text-xl font-bold leading-none text-gray-900">
                      Your Cart
                    </h5>
                    <a
                      href="#"
                      class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      View Cart
                    </a>
                  </div>
                  <CartItem />
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 my-3 fill-black mx-auto`}
                    viewBox="0 0 576 512"
                  >
                    <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
                  </svg>
                  <p className={`text-sm text-center my-3`}>
                    No products in the cart.
                  </p>
                </>
              )}
              <div
                className={`flex justify-between my-5 ${
                  cartItems.length > 0 ? "" : "hidden"
                }`}
              >
                <p className="text-base font-semibold text-gray-900">
                  SUBTOTAL:
                </p>
  
                <p className="text-base font-semibold text-gray-900">
                  &#8358;{getCartItemsTotal()}
                </p>
              </div>
              {cartItems.length > 0 ? (
                <Link to="/store-front/checkout">
                  <button
                    type="button"
                    onClick={() => {
                      setCartToggled((prev) => !prev);
                    }}
                    className="text-white rounded py-2 mt-2 w-full text-center bg-brand-primary hover:bg-brand-secondary"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </ul>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
            onClick={() => setDropDown(!dropDown)}
          >
            <img
              className="w-10 h-10 object-cover object-center rounded-full"
              src={storeLogo}
              alt="user photo"
            />
          </button>
        </div>
      </div>
    </nav> */
}
