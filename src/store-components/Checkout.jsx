import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../constants";
import { countries } from "../services/services";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { CartContext } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const { cartItems, getCartItemsTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    city: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "Nigeria",
    state: "",
    postalCode: "",
    shippingMethod: "",
  });
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStates();
  }, [formData.country]);

  const fetchStates = () => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: formData.country,
      })
      .then(function (response) {
        const country = response.data;
        setStates((prev) => (prev = country.data.states));
        // console.log(states);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeForm(event.currentTarget.elements.submit.name);
  };

  const changeForm = (value) => {
    setFormData({
      contact: true,
      shipping: true,
      payment: true,
    });
    setFormData((prev) => {
      return { ...prev, [value]: true };
    });
  };

  const handleFinalSubmit = (event) => {
    event.preventDefault();
  };

  const { cartTotal, deleteFromCart } = useContext(CartContext);
  return (
    <div>
      <Navbar
        product_details={cartItems}
        amount_in_cart={cartTotal}
        handleDelete={deleteFromCart}
        storeName={"emmystore"}
      />
      <div className="lg:flex lg:flex-row w-full flex-col-reverse">
        <div className="lg:w-3/5 lg:px-20 lg:px-10 px-8 w-full py-10">
          <h1 className="text-black opacity-60 text-2xl text-center mb-6">
            emmystore
          </h1>

          {/* Contact information and shipping address */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className={FormData.contact ? "" : "hidden"}
          >
            <div className="w-full mb-8">
              <label
                htmlFor="email"
                className="text-lg text-black opacity-70 block mb-4"
              >
                Contact information
              </label>
              <input
                type="text"
                required
                onChange={handleChange}
                value={formData.email}
                className={`${styles.inputBox} px-3 py-3 w-full`}
                placeholder="Email Address"
                id="email"
                name="email"
              />
            </div>{" "}
            Data{" "}
            <h2 className="text-lg text-black opacity-70 mb-3">
              Shipping address
            </h2>
            <div className="flex justify-between w-full my-3">
              <input
                type="text"
                required
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={`${styles.inputBox} w-1/2 mr-3 px-3 py-3`}
                name="firstName"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`${styles.inputBox} w-1/2 ml-3 px-3 py-3`}
                name="lastName"
              />
            </div>
            <input
              type="text"
              required
              onChange={handleChange}
              className={`${styles.inputBox} px-3 my-3 py-3 w-full`}
              value={formData.address}
              placeholder="Address"
              id="address"
              name="address"
            />
            <input
              type="text"
              required
              onChange={handleChange}
              className={`${styles.inputBox} px-3 my-3 py-3 w-full`}
              value={formData.city}
              placeholder="City"
              id="city"
              name="city"
            />
            <div className="w-full flex justify-between my-3">
              <select
                name="country"
                placeholder="Nigeria"
                onChange={handleChange}
                id="country"
                value={formData.country}
                className={`${styles.inputBox} px-3 mr-3 py-3 w-1/3`}
              >
                {countries.map((country, index) => {
                  return <option key={index}>{country}</option>;
                })}
              </select>
              <select
                name="state"
                placeholder="Nigeria"
                onChange={handleChange}
                id="state"
                value={formData.state}
                className={`${styles.inputBox} px-3 mx-3 py-3 w-1/3`}
              >
                {states.map((state, index) => {
                  return <option key={index}>{state.name}</option>;
                })}
              </select>
              <input
                type="text"
                required
                className={`${styles.inputBox} px-3 ml-3 py-3 w-1/3`}
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                id="postalCode"
                name="postalCode"
              />
            </div>
            <input
              type="text"
              required
              className={`${styles.inputBox} px-3 my-2 py-3 w-full`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              id="phone"
              name="phone"
            />
            <div className="lg:flex lg:justify-between grid place-content-center mt-5">
              <Link
                to="/store-front/view-cart"
                className="my-auto grid place-content-center"
              >
                <span className="flex group hover:opacity-80 hover:cursor-pointer my-auto">
                  <span className="mr-3 my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-brand-primary group-hover:fill-brand-secondary"
                      viewBox="0 0 512 512"
                    >
                      <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                    </svg>
                  </span>
                  <p className="text-brand-primary text-xs my-auto group-hover:text-brand-secondary">
                    Return to cart
                  </p>
                </span>
              </Link>

              <input
                type="submit"
                id="submit"
                className={`${styles.button} w-auto mt-4 lg:mt-0`}
                name="shipping"
                value="Continue to shipping method"
              />
            </div>
          </form>

          {/* Shipping method */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className={formData.shipping ? "" : "hidden"}
          >
            <div className="border border-gray-300 rounded shadow-lg px-3 py-2">
              <div className="flex border-b border-gray-300 py-2">
                <p className="text-black text-sm opacity-70">Contact</p>
                <p className="text-black text-sm mx-4">{formData.email}</p>
              </div>{" "}
              <div className="flex justify-between border-b border-gray-300 py-2">
                <p className="text-black text-sm opacity-70">Ship to</p>
                <p className="text-black text-sm">
                  {formData.firstName +
                    " " +
                    formData.lastName +
                    ". " +
                    formData.address +
                    " " +
                    formData.city +
                    ", " +
                    formData.country +
                    ". " +
                    formData.postalCode}
                </p>
                <p
                  className="hover:text-brand-primary text-xs opacity-50 hover:cursor-pointer text-black"
                  onClick={() => changeForm("contact")}
                >
                  Change
                </p>
              </div>
              <div
                className={`flex border-b border-gray-300 py-2 ${
                  formData.shippingMethod ? "" : "hidden"
                }`}
              >
                <p className="text-black text-sm opacity-70">Method</p>
                <p className="text-black text-sm mx-4">
                  {formData.shippingMethod}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-lg text-black opacity-70 block mb-3">
                Shipping method
              </h2>
              <div className="border border-gray-300 rounded shadow-lg px-3 py-2">
                <div className="flex justify-between border-b border-gray-300 py-2">
                  <span>
                    <input
                      required
                      type="radio"
                      id="first"
                      name="shippingMethod"
                      value="FLAT RATE. #1000"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="first"
                      className="text-black opacity-60 font-semibold mx-4"
                    >
                      FLAT RATE
                    </label>
                  </span>
                  <span className="flex my-2 lg:my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 fill-black my-auto"
                      viewBox="0 0 448 512"
                    >
                      <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                    </svg>
                    <p className="text-sm my-auto">1,000.00</p>
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-300 py-2">
                  <span>
                    <input
                      type="radio"
                      required
                      name="shippingMethod"
                      value="Customer Pick-up. Free"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor=""
                      className="text-black opacity-60 font-semibold mx-4"
                    >
                      Customer Pick-up
                    </label>
                  </span>
                  <p>FREE</p>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:justify-between grid place-content-center mt-5">
              <div
                className="my-auto grid place-content-center"
                onClick={() => changeForm("contact")}
              >
                <span className="flex group hover:opacity-80 hover:cursor-pointer my-auto">
                  <span className="mr-1 my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-brand-primary group-hover:fill-brand-secondary"
                      viewBox="0 0 512 512"
                    >
                      <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                    </svg>
                  </span>
                  <p className="text-brand-primary text-xs my-auto group-hover:text-brand-secondary">
                    Return to shipping address
                  </p>
                </span>
              </div>

              <button
                className={`${styles.button} w-auto mt-4 lg:mt-0`}
                id="submit"
                name="payment"
              >
                Continue to payment method
              </button>
            </div>
          </form>

          {/* Payment method */}
          <form
            action="#"
            onSubmit={handleFinalSubmit}
            className={FormData.payment ? "" : "hidden"}
          >
            <div className="border border-gray-300 rounded shadow-lg px-3 py-2">
              <div className="flex border-b border-gray-300 py-2">
                <p className="text-black text-sm opacity-70">Contact</p>
                <p className="text-black text-sm mx-4">{formData.email}</p>
              </div>{" "}
              <div className="flex justify-between border-b border-gray-300 py-2">
                <p className="text-black text-sm opacity-70">Ship to</p>
                <p className="text-black text-sm">
                  {formData.firstName +
                    " " +
                    formData.lastName +
                    ". " +
                    formData.address +
                    " " +
                    formData.city +
                    ", " +
                    formData.country +
                    ". " +
                    formData.postalCode}
                </p>
                <p
                  className="hover:text-brand-primary text-xs opacity-50 hover:cursor-pointer text-black"
                  onClick={() => changeForm("contact")}
                >
                  Change
                </p>
              </div>
              <div className="flex border-b border-gray-300 py-2">
                <p className="text-black text-sm opacity-70">Method</p>
                <p className="text-black text-sm mx-4">
                  {formData.shippingMethod}
                </p>
              </div>
            </div>

            <div className="lg:flex lg:justify-between grid place-content-center mt-5">
              <div
                className="my-auto grid place-content-center"
                onClick={() => changeForm("shipping")}
              >
                <span className="flex group hover:opacity-80 hover:cursor-pointer my-auto">
                  <span className="mr-1 my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-brand-primary group-hover:fill-brand-secondary"
                      viewBox="0 0 512 512"
                    >
                      <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                    </svg>
                  </span>
                  <p className="text-brand-primary text-xs my-auto group-hover:text-brand-secondary">
                    Return to shipping method
                  </p>
                </span>
              </div>

              <button
                className={`${styles.button} w-auto mt-4 lg:mt-0`}
                id="submit"
                name="shipping"
              >
                Pay now
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-2/5 w-full bg-slate-100 lg:px-10 px-3 py-10">
          {cartItems.map((item) => {
            return (
              <div key={item.id}>
                <CartPrducts
                  productLogo={item.media}
                  productName={item.title}
                  productPrice={item.price}
                  getSubTotal={getCartItemsTotal}
                  // getGrandTotal={getGrandTotal}
                  quantity={item.stock_count}
                />
              </div>
            );
          })}
          <div className="flex justify-between my-6 border-b border-t border-gray-200 py-5">
            <p className="text-base text-black opacity-70">TOTAL: </p>
            <span className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 fill-black my-auto"
                viewBox="0 0 448 512"
              >
                <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
              </svg>
              <p className="text-sm text-black my-auto">
                {getCartItemsTotal()}
              </p>
            </span>
          </div>
          {/* 
          <div className="flex justify-between my-6 border-b border-t border-gray-200 py-5">
            <p className="text-base text-black font-semibold">GRAND TOTAL: </p>
            <span className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 fill-black my-auto"
                viewBox="0 0 448 512"
              >
                <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
              </svg>
              {/* <p className="text-sm text-black my-auto">
                {formData.shippingMethod === "FLAT RATE. #1000"
                  ? getGrandTotal() + 1000
                  : getGrandTotal()}
              </p> 
            </span>
          </div> */}
          <button
            type="submit"
            onClick={() => setShowModal(true)}
            className={`w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500`}
          >
            Proceed
          </button>
        </div>
      </div>
      {showModal && <PaymentModal />}
      <Footer />
    </div>
  );
};

const CartPrducts = ({ productLogo, quantity, productName, productPrice }) => {
  return (
    <div className="flex justify-between w-full mb-3 border-b border-gray-200 py-2">
      <div className="lg:w-1/4 w-1/3 shadow-lg">
        <img src={productLogo} alt="" className="w-full" />
        <div className="relative bg-gray-800 rounded-full w-4 h-4 text-center bottom-[90%] left-[90%]">
          <p className="text-white text-xs">{quantity}</p>
        </div>
      </div>

      <p className="text-sm my-auto text-black">{productName}</p>

      <span className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3 fill-black my-auto"
          viewBox="0 0 448 512"
        >
          <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
        </svg>
        <p className="text-sm text-black my-auto">{productPrice}</p>
      </span>
    </div>
  );
};

export default Checkout;
