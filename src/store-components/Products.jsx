import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";
import {
  getProducts,
  getProductList,
  createOrder,
  BASE_URL,
} from "../services/services";

const Products = ({ handleAdd, handleDelete, cart }) => {
  const [products, setProducts] = useState([]);
  const { useData } = useContext(UserContext);
  async function fetchProducts() {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };

    const res = await axios.get(`${BASE_URL}product/list`, config);
    if (res) {
      setProducts(res.data);
    }
  }

  async function dataAdd() {
    const data = {
      product: 1,
      amount: "1000",
      status: "pending",
      purchase_type: "paystack",
    };
    try {
      const res = await createOrder(data);
      if (!res.status === "OK") return;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full lg:px-10 md:px-5 px-10 z-1 py-5 text-center">
      <p className="text-black text-2xl">OUR PR0DUCTS</p>
      <div className="flex flex-wrap justify-between mt-10 w-full">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="lg:w-1/5 lg:mx-2 md:w-2/5 md:mx-2 w-full"
            >
              <DisplayProducts
                productLogo={product.productLogo}
                productName={product.productName}
                productPrice={product.productPrice}
                id={product.id}
                addToCart={handleAdd}
                deleteFromCart={handleDelete}
                cart={cart}
                dataAdd={dataAdd}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DisplayProducts = ({
  productName,
  productLogo,
  productPrice,
  id,
  addToCart,
  deleteFromCart,
  cart,
  dataAdd,
}) => {
  const [displayToggled, setDisplayToggled] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const { isLoggedIn } = useContext(LoginContext);
  const add = () => {
    if (isLoggedIn === false) {
      alert("You need to login first!");
      return;
    }
    // addToCart(id);
    dataAdd();
    setAdded(true);
  };
  return (
    <div className="shadow-lg group rounded w-full border z-1 border-slate-200 mb-5">
      <div className={`w-full h-[300px]`}>
        <img src={productLogo} alt="Logo" className="w-full h-full" />
      </div>

      <div
        onClick={() => {
          setDisplayToggled((prev) => !prev);
        }}
        className="invisible group-hover:visible relative group bottom-[280px] left-5 shadow-lg grid place-content-center bg-white hover:bg-brand-primary w-10 h-10 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black w-5 h-5"
          viewBox="0 0 576 512"
        >
          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
        </svg>
      </div>

      <div
        className={
          displayToggled
            ? "h-full grid overflow-hidden place-content-center w-full top-0 right-0 left-0 bottom-0 z-30 outline-none fixed"
            : " -translate-x-full hidden"
        }
      >
        <div className="mx-auto bg-white shadow-lg rounded lg:w-3/5 w-11/12 h-[500px] px-5 py-7">
          <div
            className="flex justify-end item-end hover:cursor-pointer mb-5"
            onClick={() => setDisplayToggled(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-gray-200 hover:fill-black"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </div>

          <div className="flex justify-between w-full">
            <div className="w-2/5 mx-auto text-center ">
              <img
                src={productLogo}
                alt=""
                className="w-full h-[300px] mb-10"
              />
              <p className="text-black font-semibold text-base">
                {productName}
              </p>
              <p className="text-sm font-semibold text-sm">{`#${productPrice}`}</p>
            </div>

            <div className="w-1/2 border-l border-gray-200">
              <h2 className="text-black font-semibold text-base mb-6">
                PRODUCT DETAILS
              </h2>
              <p className="w-1/2 text-center opacity-70 mx-auto text-black text-sm">
                hgdh sgf hudhfjdjghfg ufh ghgduf fgds uyffuu gfvv jdbhdshfhfghdf
                gfds shg fgdjh fjhsd fjfjddhgfgdsshf gsfvhsd vf sddc bcsdcv
                bdsbbbdsvs fbdjjjhf aagsh gdfhdgg s sahs ahsgb haa shsa sahasgas
                sas gasgfsf hgd b fvhdvkq dghdgh
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          added
            ? "h-full grid overflow-hidden place-content-center w-full top-0 right-0 left-0 bottom-0 z-30 outline-none fixed"
            : " -translate-x-full hidden"
        }
      >
        <div className="mx-auto bg-white shadow-lg rounded lg:w-3/4 w-11/12 lg:h-[auto] h-auto lg:px-10 px-6 py-7">
          <div
            className="flex justify-end item-end hover:cursor-pointer mb-5"
            onClick={() => setAdded(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-gray-200 hover:fill-black"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </div>

          <div className="w-full grid place-content-center">
            <h1 className="text-3xl text-black font-extrabold">
              Added to cart successfully!
            </h1>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setAdded(false)}
                className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
              >
                Continue shopping
              </button>
              <Link to="/store-front/view-cart" className="my-3">
                <button
                  type="button"
                  className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
                >
                  View Cart
                </button>
              </Link>
              <Link to="/store-front/checkout" className="my-3">
                <button
                  type="button"
                  className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
                >
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-3 px-6">
        <div className="text-center bg-gray-100 w-full mb-3">
          <p className="text-sm text-black">{productName}</p>
          {/* <p className='text-base text-brand-primary font-semibold'>{`#${productPrice}`}</p> */}
          <span className="flex my-2 lg:my-auto mx-auto w-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 fill-black my-auto"
              viewBox="0 0 448 512"
            >
              <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
            </svg>
            <p className="text-sm my-auto">{productPrice}</p>
          </span>
        </div>

        {cart.filter((item) => item.id === id).length === 0 ? (
          <button
            onClick={add}
            className="w-full grid place-content-center text-white mx-auto py-3 text-center px-4 bg-brand-primary hover:bg-brand-secondary"
          >
            <div className="flex mx-auto pl-3">
              <div className="my-auto mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-white"
                  viewBox="0 0 576 512"
                >
                  <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
                </svg>
              </div>
              <span className="my-auto">Add to cart</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => deleteFromCart(id)}
            className="w-full grid place-content-center text-white mx-auto py-3 text-center px-4 bg-brand-primary hover:bg-brand-secondary"
          >
            <div className="flex mx-auto pl-3">
              <div className="my-auto mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-white"
                  viewBox="0 0 576 512"
                >
                  <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
                </svg>
              </div>
              <span className="my-auto">Delete from cart</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
