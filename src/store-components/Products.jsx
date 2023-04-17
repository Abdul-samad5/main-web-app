import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { CartContext } from "../context/CartContext";
import Modal from "../components/Modal";


const Products = () => {
  const { products, addToCart } = useContext(CartContext);

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
  const { isLoggedIn } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalText] = useState(null);

  const add = (id) => {
    if (isLoggedIn === false) {
      alert("You need to login first!");
      return;
    }
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

export default Products;

{
  /* <div className="group rounded w-[100%] z-1 mb-10">
  <div className={`border-slate-100 bg-gray-100`}>
    <Link to={`/store-front/${id}`}>
      <img
        src={productLogo}
        alt="Logo"
        width={"100%"}
        className="my-auto h-[150px]"
      />
    </Link>
  </div>

  {/* <div className="group-hover:visible relative group top-[50px] left-[50px] shadow-lg grid place-content-center bg-white hover:bg-brand-primary w-8 h-8 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black w-5 h-5"
          viewBox="0 0 576 512"
        >
          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
        </svg>
      </div> */
}

{
  /* Product added pop-up */
}
// <div
//   className={
//     "h-full grid hidden overflow-hidden place-content-center w-full top-0 right-0 left-0 bottom-0 z-30 outline-none fixed"
//   }
// >
//   <div className="mx-auto bg-white shadow-lg rounded lg:w-3/4 w-11/12 lg:h-[auto] h-auto lg:px-10 px-6 py-7">
//     <div className="flex justify-end item-end hover:cursor-pointer mb-5">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-6 h-6 fill-gray-200 hover:fill-black"
//         viewBox="0 0 320 512"
//       >
//         <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
//       </svg>
//     </div>

//     <div className="w-full grid place-content-center">
//       <h1 className="text-3xl text-black font-extrabold">
//         Added to cart successfully!
//       </h1>
//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={() => setAdded(false)}
//           className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
//         >
//           Continue shopping
//         </button>
//         <Link to="/store-front/view-cart" className="my-3">
//           <button
//             type="button"
//             className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
//           >
//             View Cart
//           </button>
//         </Link>
//         <Link to="/store-front/checkout" className="my-3">
//           <button
//             type="button"
//             className="text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary"
//           >
//             Proceed to checkout
//           </button>
//         </Link>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="h-[200px] p-5">
//   <div className="w-full flex justify-between">
//     <p className="text-xl font-bold text-black">{productName}</p>
//     {/* <p className='text-base text-brand-primary font-semibold'>{`#${productPrice}`}</p> */}
//     <div className="flex lg:my-auto ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-3 h-3 fill-black relative top-1.5"
//         viewBox="0 0 448 512"
//       >
//         <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
//       </svg>
//       <p className="text-3xl font-bold text-black">{productPrice}</p>
//       {/* <p className="text-sm text-black font-bold relative top-0.5">.00</p> */}
//     </div>
//   </div>
//   <p className="text-black flex justify-start ml-2 opacity-60 text-xs my-2">
//     {productDescription}
//   </p>
//   <p className="my-2 text-sm font-semibold text-black opacity-60">{`(${stock_count})`}</p>
//   <button
//     onClick={() => add(id)}
//     className="w-auto ml-1 flex transition-all duration-400 justify-start my-3 border border-black rounded-full text-black py-1 text-center px-4 hover:border-none hover:bg-brand-primary hover:text-white"
//   >
//     <span className="my-auto">Add to cart</span>
//   </button>
// </div>
// </div>
