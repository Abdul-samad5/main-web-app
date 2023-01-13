import React from "react";
import { useState } from "react";
import { styles } from "../constants/index";
import sortImage from "../assets/images/sort.png";
import { product } from "../assets";

// Structural template for the components such as the My Customers, Collections, etc.
const UserData = ({
  type,
  data,
  image,
  infoHead,
  children: Children,
  handleNext,
  handleSearch,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [reRender, setReRender] = useState(false);

  // const render = () => {
  //   setReRender(prev => prev = !prev);
  // }

  const handleClick = () => {
    setCurrentPage((prev) => {
      return prev + 1;
    });
    handleNext();
  };

  const search = (event) => {
    setSearchValue((prev) => {
      prev = event.target.value;
      handleSearch(prev);
    });
  };

  return (
    <div className="rounded shadow-xl w-full lg:px-5 px-2 py-3 lg:mx-auto my-auto h-auto">
      {/* Search Bar */}
      <div className="flex justify-between">
        <span className="w-2/5">
          <input
            placeholder={`Search ${type}`}
            className={`${styles.inputBox} pl-9 pr-3 w-full`}
            type="text"
            value={searchValue}
            onChange={search}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${styles.svgStyle} bottom-8 left-4`}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </span>

        <div className="border flex justify-between border-slate-300 h-10 rounded-lg shadow-sm px-4">
          <img src={sortImage} className="w-4 h-3 my-auto mx-1" />
          <p className="text-base my-auto mx-1 text-slate-300">Sort</p>
        </div>
      </div>

      <div className="flex justify-between mt-10 align-center">
        <span className="flex justify-between">
          <p className="text-xs mr-1">#</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-2 h-4 fill-slate-400"
          >
            <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
          </svg>
        </span>
        {infoHead.map((word, index) => {
          return (
            <p key={index} className="text-sm">
              {word}
            </p>
          );
        })}
      </div>

      <div className="mt-3">
        {/* Image and text to be displayed if no data is found */}
        <img
          src={image}
          alt="No customer found"
          className={data.length === 0 ? "mx-auto w-auto h-auto" : "hidden"}
        />
        <p
          className={data.length === 0 ? "text-base text-center" : "hidden"}
        >{
          type === "My Orders" ? "No orders found" : `No ${type} found`
        }</p>

        {/* Structure of the children passed into the component and to be mapped into each of the data also passed into the component. } */}
        {data.map((children, index) => {
          // Displays the details of each collection if the type of the component equals Collections.
          if (type === "Collections") {
            return (
              <div className="mb-3" key={index + 1}>
                <Children id={children.id} no={index} collectionName={children.name} product={children.image}/>
              </div>
            );
            // Displays the details of each customer if the type of the component equals Customer.
          } else if (type === "Customer") {
            return (
              <div className="mb-3">
                <Children
                  id={index + 1}
                  key={index + 1}
                  name={"Alex Ikenna"}
                  email={"Alex@gmail.com"}
                  noOfOrders={"29"}
                  location={"Lagos, LA. Nigeria"}
                  amount={"#4,555,000"}
                  // {propsKeys}
                />
              </div>
            );
            // Displays the details of each store review if the type of the component equals Store Reviews.
          } else if (type === "Store Reviews") {
            return (
              <div className="mb-3">
                <Children
                  id={index + 1}
                  key={index + 1}
                  reviews={"Alex Ikenna"}
                  ratings={"Alex@gmail.com"}
                  date={"29"}
                />
              </div>
            );
          } else if (type === "Transaction History") {
            return (
              <div className="mb-3" key={index}>
                <Children
                  id={children.id}
                  name={children.product}
                  // order={"Alex@gmail.com"}
                  date={children.date_created}
                  amount={children.amount}
                  paymentMethod={children.purchase_type}
                  status={children.status}
                />
              </div>
            );
          } else if (type === "Discounts") {
            return (
              <div className="mb-3" key={index + 1}>
                <Children
                  id={children.id}
                  no={index}
                  discountCode={children.discount_code}
                  method={children.discount_method}
                  type={children.discount_type}
                  discount_value={children.discount_value}
                  value={children.value}
                  end_date={children.end_date}
                  active={children.active}
                  // id, discountStatus, method, status, type, usage
                />
              </div>
            );
          } else if (type === "My Orders") {
            return (
              <div className="mb-3">
                <Children
                  id={index + 1}
                  key={index + 1}
                  customer={"Alex Ikenna"}
                  date={"Alex@gmail.com"}
                  status={"Cancelled"}
                  total={"Stripe"}
                />
              </div>
            )
          } else if (type === "Products") {
              return (
                <div className="mb-3" key={index}>
                  <Children
                    id={children.id}
                    keys={index + 1}
                    productName={children.title}
                    price={children.price}
                    status={children.status}
                    inventory={children.stock_count}
                  />
                </div>
              )
          } else {}
        })}
      </div>

      <div className="flex justify-between mt-10 align-center">
        <span className="flex justify-between">
          <p className="text-xs text-slate-400 my-auto">View</p>
          <select className="bg-gray-100 rounded mx-1 my-auto w-9 text-xs">
            <option className="bg-gray-100 rounded">5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
          <p className="text-xs text-slate-400 my-auto">entries per page</p>
        </span>

        <span className="flex justify-between">
          <p
            className={
              data.length === 0 ? "text-xs text-slate-400 hidden" : "text-xs text-slate-400"
            }
          >
            Showing 1 to 5 of 5 entries
          </p>
          <p
            className={
              data.length === 0 ? "text-xs text-slate-400" : "text-xs text-slate-400 hidden"
            }
          >
            Showing 0 to 0 of 0 entries
          </p>
          <p className="text-blue-700 text-xs mx-2">{currentPage}</p>
          <span onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-4 h-4 fill-slate-300"
            >
              <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4 fill-slate-300"
          >
            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default UserData;
