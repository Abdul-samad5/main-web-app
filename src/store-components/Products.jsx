import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Modal from "../components/Modal";

const Products = () => {
  const { addToCart, products } = useContext(CartContext);

  return (
    <div className="w-full lg:px-0 mt-8 md:px-5 px-10 z-1 py-5">
      <p className="text-black font-bold text-2xl">OUR PR0DUCTS</p>
      {products.length === 0 && (
        <p className="text-lg flex justify-center align-center my-20">
          No products found!
        </p>
      )}
      <div className="flex flex-wrap gap-5 mt-10 w-full">
        {products.map((product, index) => {
          return (
            <DisplayProducts
              productLogo={product.media}
              productName={product.title}
              productPrice={product.price}
              productDescription={product.description}
              id={product.id}
              stock_count={product.stock_count}
              addToCart={addToCart}
              key={index}
              amount={product.price}
            />
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
  addToCart,
  id,
  productDescription,
  stock_count,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalText] = useState(null);

  const add = (id) => {
  
    addToCart(id);
    setShowModal(true);
    setModalText("Product successfully added to cart!");

    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  return (
    <>
      {showModal && <Modal text={modalContent} showModal={showModal} />}
      <div
        key={id}
        className="w-full max-w-[300px] bg-white border border-gray-200 rounded-lg shadow"
      >
        <a href="#">
          <img
            className="w-[100%] h-[250px] object-center object-cover"
            src={productLogo}
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {productName}
            </h5>
          </a>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {productDescription}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg md:text-3xl font-bold text-gray-900">
              &#8358;{productPrice}
            </span>
            <span
              onClick={() => add(id)}
              className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center bg-brand-primary hover:bg-brand-secondary dark:focus:ring-blue-800"
            >
              Add to cart
            </span>
          </div>
        </div>
      </div>
    </>
  );
};


export default Products