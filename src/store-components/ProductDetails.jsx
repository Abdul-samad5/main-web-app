import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/services";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";
import { styles } from "../constants";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState();
  const { productId } = useParams("productId");
  const [quantity, setQuantity] = useState(1);
  const { userData } = useContext(UserContext);
  const { cart, deleteFromCart, cartLength } = useContext(CartContext);

  async function fetchProduct() {
    // const token = window.localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${userData.access}` },
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(`${BASE_URL}product/${productId}`, config);
      if (res) {
        setProductDetails(res.data);
        console.log(res);
      }
      if (!res.statusText === "OK") return;
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();

  const addToCart = async (id) => {
    const data = {
      product: id,
      quantity: quantity,
    };
    try {
      const res = await axios.post();
    } catch (error) {
      console.log(error);
    }
  };

  async function buyNow() {
    try {
      addToCart(id);
      navigate("/store-front/checkout");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <Navbar
        product_details={cart}
        amount_in_cart={cartLength}
        handleDelete={deleteFromCart}
        storeName={"emmystore"}
      />
      <div className="px-20 py-10 lg:flex lg:justify-between lg:gap-10 w-full h-auto">
        <div
          className={`lg:w-1/2 w-full h-[450px] flex justify-center align-center rounded-lg shadow-lg border border-slate-100 bg-gray-100`}
        >
          <img
            src={productDetails?.media}
            className="my-auto w-[200px] border border-gray-200 h-[200px]"
          />
        </div>

        <div className="lg:w-1/2 w-full px-4">
          <div className="border-b border-gray pb-6">
            <h1 className="font-bold text-3xl text-black mb-4">
              {/* Airpods-Max */}
              {productDetails?.title}
            </h1>
            <p className="text-base opacity-60 font-semibold">
              {/* a fine sublime product of the highest quality; 
                            will, most certainly, please your undoubtedly high, hohemian tastes and senses. */}
              {productDetails?.description}
            </p>
          </div>

          <div className="border-b border-gray py-4">
            <h1 className="font-bold text-3xl text-black mb-4">
              {/* $456.00 or 99.99/month */}
              {`${productDetails?.price} a piece`}
            </h1>
          </div>

          <div className="my-10">
            <div className="flex justify-center mb-2">
              <p
                onClick={() => setQuantity((prev) => prev - 1)}
                className={
                  "relative text-3xl text-brand-primary font-bold left-6 top-1 cursor-pointer"
                }
              >
                -
              </p>
              <input
                className={`${styles.inputBox} rounded-full text-center`}
                value={quantity}
              />
              <p
                onClick={() => setQuantity((prev) => prev + 1)}
                className={
                  "relative text-3xl text-brand-primary font-bold right-6 cursor-pointer"
                }
              >
                +
              </p>
              <p className="text-xs text-black opacity-60">{`Only ${productDetails} left. Don't miss it!`}</p>
            </div>

            <div className="flex justify-between w-full">
              <div
                onClick={buyNow}
                className="lg:w-1/2 shadow-lg cursor-pointer lg:mr-3 w-full flex transition-all justify-center duration-400 justify-start my-3 bg-brand-primary rounded-full text-white py-3 text-center px-4 hover:bg-brand-secondary hover:text-black"
              >
                <span className="my-auto">Buy Now</span>
              </div>

              <div
                onClick={() => addToCart(id)}
                className="lg:w-1/2 shadow-lg lg:ml-3 cursor-pointer w-full flex justify-center transition-all duration-400 justify-start my-3 border border-brand-primary rounded-full text-brand-primary py-3 text-center px-4 hover:border-none hover:bg-brand-primary hover:text-white"
              >
                <span className="my-auto">Add to cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
