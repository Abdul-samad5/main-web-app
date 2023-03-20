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
    <nav className="bg-white border-gray-200 items-center px-5 sm:px-4 py-2.5 dark:bg-gray-200">
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
              <span
                onClick={() => {
                  setCartToggled((prev) => !prev);
                }}
                className="relative flex gap-3 md:gap-3 w-[100%]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 fill-black mx-auto`}
                  viewBox="0 0 576 512"
                >
                  <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
                </svg>
                <div className="">
                  <div className="absolute bg-brand-primary rounded-full w-4 h-4 text-center top-[-10px] right-2">
                    <p className="text-white text-xs">{cartItems.length}</p>
                  </div>
                </div>
              </span>
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
              className="w-8 h-8 rounded-full"
              src={storeLogo}
              alt="user photo"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* // <nav className="bg-white flex border-gray-200 px-1 sm:px-4 py-1 rounded dark:bg-gray-100">
  //   <div className="w-full flex justify-between ">
  //     <div className="flex items-center gap-5">
  //       <Link to={"/dashboard"}>
  //         <IoIosArrowBack size={25} />
  //       </Link>

  //       <Link to="/store-front" className="my-auto">
  //         <p className="text-base text-black uppercase hover:text-brand-primary opacity-60">
  //           {storeName}
  //         </p>
  //       </Link>
  //     </div>
  //     <div */
}
{
  /* //       className="lg:hidden hover:bg-gray-300 px-2 h-8 w-10 rounded border border-gray-500"
  //       onClick={() => setDropDown(!dropDown)}
  //     >
  //       <div className="bg-black opacity-70 h-1 w-full my-1 rounded"></div>
  //       <div className="bg-black opacity-70 h-1 w-full my-1  rounded"></div>
  //       <div className="bg-black opacity-70 h-1 w-full my-1  rounded"></div>
  //     </div> */
}
{
  /* //   </div> */
}

{
  /* //   <ul className={`lg:flex list-none justify-center my-5 gap-5 w-auto py-1`}>
  //     <li */
}
{
  /* //       className="px-6 group flex justify-center hover:cursor-pointer"
  //       onClick={() => {
  //         setCartToggled((prev) => !prev);
  //       }}
  //     >
  //       <div className="grid place-content-center">
  //         <div className="relative bg-brand-primary rounded-full w-4 h-4 text-center top-2 left-3">
  //           <p className="text-white text-xs">{cartItems.length}</p>
  //         </div>

  //         <span
  //           onClick={() => {
  //             setCartToggled((prev) => !prev);
  //           }}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="w-5 hover:cursor-pointer h-5 fill-black group-hover:fill-brand-primary"
  //             viewBox="0 0 576 512"
  //           >
  //             <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
  //           </svg>
  //         </span>

  //         <div
  //           className={`${
  //             cartToggled ? "" : "hidden"
  //           } z-10 bg-slate-200 absolute top-16 right-16 shadow-lg w-[350px] h-auto px-5 py-3`}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className={`w-5 h-5 my-3 fill-black ${
  //               cartItems.length === 0 ? "" : "hidden"
  //             } mx-auto`}
  //             viewBox="0 0 576 512"
  //           >
  //             <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
  //           </svg>
  //           {cartItems.length > 0 ? (
  //             <CartItem />
  //           ) : (
  //             <p className={`text-sm text-center my-3`}>
  //               No products in the cart.
  //             </p>
  //           )}

  //           <hr></hr>
  //           <div className="flex justify-between mt-3">
  //             <p className="text-sm">SUBTOTAL:</p>
  //             <span className="flex my-2 lg:my-auto">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="w-3 h-3 fill-black my-auto"
  //                 viewBox="0 0 448 512"
  //               >
  //                 <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
  //               </svg>
  //               <p className="text-sm my-auto">{getCartItemsTotal()}</p>
  //             </span>
  //           </div>

  //           {cartItems.length > 0 ? (
  //             <Link to="/store-front/checkout">
  //               <button
  //                 type="button"
  //                 onClick={() => {
  //                   setCartToggled((prev) => !prev);
  //                 }}
  //                 className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
  //               >
  //                 PROCEED TO CHECKOUT
  //               </button>
  //             </Link>
  //           ) : (
  //             ""
  //           )}

  //           <Link
  //             to="/store-front/view-cart"
  //             onClick={() => {
  //               setCartToggled((prev) => !prev);
  //             }}
  //           >
  //             <p
  //               className="mt-4 text-brand-primary text-center mx-auto w-1/2 hover:text-brand-secondary text-sm"
  //               onClick={() => {
  //                 setCartToggled((prev) => !prev);
  //               }}
  //             >
  //               View Cart
  //             </p>
  //           </Link>
  //         </div>
  //       </div>
  //     </li>

  //     <li
  //       className="px-6 flex w-full hover:bg-gray-300 place-content-center py-4"
  //       onClick={() => setUserIconToggled(!userIconToggled)}
  //     >
  //       <span onClick={() => setUserIconToggled(!userIconToggled)}>
  //         <div className="w-[50px] h-[50px]">
  //           <img
  //             src={storeLogo}
  //             alt="Store Logo"
  //             className="rounded-full shadow-lg w-[100%] h-[100%] border-2 border-slate-100 "
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>
  //       </span>

  //       <div
  //         className={`${
  //           userIconToggled ? "" : "hidden"
  //         } rounded bg-white z-10 absolute top-12 right-30 shadow-lg w-[200px] py-2 h-auto`}
  //       >
  //         <Link
  //           to={"/login"}
  //           onClick={() => setUserIconToggled(!userIconToggled)}
  //         >
  //           <p className="text-center py-4 text-brand-primary hover:text-brand-secondary bg:white hover:bg-gray-100">
  //             My Profile
  //           </p>
  //         </Link>
  //         <Link
  //           to={"/login"}
  //           onClick={() => setUserIconToggled(!userIconToggled)}
  //         >
  //           <p className="text-center py-4 text-brand-primary hover:text-brand-secondary bg:white hover:bg-gray-100">
  //             Settings
  //           </p>
  //         </Link>

  //         <Link
  //           to="/register"
  //           onClick={() => setUserIconToggled(!userIconToggled)}
  //         >
  //           <p className="text-center py-4 text-brand-primary hover:text-brand-secondary bg:white hover:bg-gray-100">
  //             Log out
  //           </p>
  //         </Link>
  //       </div>
  //     </li>
  //   </ul>
  // </nav> */
}
