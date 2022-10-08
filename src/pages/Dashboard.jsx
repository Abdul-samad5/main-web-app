import { useState } from "react";
import { styles } from "../constants";
import {
  logo,
  all_prods,
  add_prod,
  collections,
  customers,
  edit,
  history,
  marketing,
  orders,
  products,
  review,
  store,
  settings,
  arrow_right,
  arrow_down,
  search,
  bell,
  user_img,
  burger,
  close,
  discounts,
  cookies,
  user_account,
  subscription,
} from "../assets";

import {
  AddEditProducts,
  Collections,
  MyCustomers,
  TransactionHistory,
  StoreReviews,
} from "../components";

function DbIcon({ src }) {
  return <img src={src} className="w-[16px]" alt="Icon" />;
}

const Dashboard = () => {
  // Sidebar
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Component to be rendered on the main
  const [activeComponent, setActiveComponent] = useState([<AddEditProducts />]);

  // Dropdowns on the sidebar
  const [isProdOpen, setIsProdOpen] = useState(false);
  const [isMarkOpen, setIsMarkOpen] = useState(false);

  function handleClick() {
    setIsNavOpen((prev) => !prev);
  }

  function showActiveComponent(e, comp) {
    e.stopPropagation();
    setActiveComponent([comp]);
  }

  function handleDropdown(e, handler) {
    e.stopPropagation();
    handler((prev) => !prev);
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full flex">
        {/* {Sidebar} */}
        <div
          className={`w-full lg:w-1/5 shrink-0 fixed left-0 top-0 h-screen border-r border-brand-gray-300 ${
            isNavOpen ? "-translate-x-[0]" : "-translate-x-[100%]"
          } lg:-translate-x-[0] z-10 bg-white transition-transform duration-500 overflow-y-scroll no-scrollbar`}
        >
          <div className="border-b p-5 flex w-full justify-between items-center">
            <img src={logo} className="w-[50px]" alt="Yetti Logo" />
            <img src={close} className="w-[24px] lg:hidden" alt="Icon" onClick={handleClick} />
          </div>
          <div className="border-b flex items-center justify-between p-4 mb-[10px]">
            <h1 className="font-bold text-[16px] ">Micheline</h1>
            <DbIcon src={edit} />
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={store} />
            <h2>My Store</h2>
          </div>
          <div className={`${styles.dbNavItem}`}>
            <DbIcon src={orders} />
            <h2>My Orders</h2>
          </div>
          <div className="w-full" onClick={(e) => handleDropdown(e, setIsProdOpen)}>
            <div className={`${styles.dbNavItem} relative`}>
              <DbIcon src={products} />
              <h2>Products</h2>
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <DbIcon src={isProdOpen ? arrow_down : arrow_right} />
              </div>
            </div>
            <div
              className={`${
                isProdOpen ? "max-h-[200px]" : "max-h-0"
              } transition-[max-height] duration-300 pl-[24px] overflow-hidden`}
            >
              <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
              >
                <DbIcon src={all_prods} />
                <h2>All Products</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
              >
                <DbIcon src={add_prod} />
                <h2>Add New Product</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <Collections />)}
              >
                <DbIcon src={collections} />
                <h2>Collections</h2>
              </div>
            </div>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <MyCustomers />)}
          >
            <DbIcon src={customers} />
            <h2>My Customers</h2>
          </div>
          <div className="w-full" onClick={(e) => handleDropdown(e, setIsMarkOpen)}>
            <div className={`${styles.dbNavItem} relative`}>
              <DbIcon src={products} />
              <h2>Marketing</h2>
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <DbIcon src={isMarkOpen ? arrow_down : arrow_right} />
              </div>
            </div>
            <div
              className={`${
                isMarkOpen ? "max-h-[200px]" : "max-h-0"
              } transition-[max-height] duration-300 pl-[24px] overflow-hidden`}
            >
              <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
              >
                <DbIcon src={discounts} />
                <h2>Discounts</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
              >
                <DbIcon src={marketing} />
                <h2>Campaign</h2>
              </div>
            </div>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <StoreReviews />)}
          >
            <DbIcon src={review} />
            <h2>Store reviews</h2>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={history} />
            <h2>Transaction history</h2>
          </div>
          <div className="border-b border-t p-4 mb-[10px]">
            <h1 className="font-bold text-[16px] text-brand-gray">Settings</h1>
          </div>
          <div className={`${styles.dbNavItem} relative w-full`}>
            <DbIcon src={settings} />
            <h2>Store settings</h2>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <DbIcon src={arrow_right} />
            </div>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={subscription} />
            <h2>Subscription</h2>
          </div>

          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={user_account} />
            <h2>User Account</h2>
          </div>

          <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={cookies} />
            <h2>Privacy & Cookies</h2>
          </div>
        </div>

        {/* {Main} */}
        <div className="lg:w-4/5 w-full shrink-0 bg-brand-gray-200 min-h-screen p-[24px] lg:px-10 lg:py-5 lg:absolute top-0 right-0">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <img
                src={burger}
                className="w-[24px] block lg:hidden"
                alt="Icon"
                onClick={handleClick}
              />
              <button className={`${styles.buttonOutline}`}>Go to store front</button>
            </div>
            <div className="flex items-center">
              <div className="relative w-[370px] hidden lg:block">
                <img
                  src={search}
                  alt="Icon"
                  className="w-[13px] absolute top-1/2 left-3 -translate-y-[50%]"
                />
                <input
                  type="search"
                  placeholder="Search for customers,orders,products..."
                  className="w-full placeholder:text-brand-gray-400 bg-inherit border py-4 px-8 rounded-xl"
                />
              </div>
              <div className="mr-[24px] ml-2">
                <img src={bell} alt="Icon" className="w-[18px]" />
              </div>
              <div className="flex items-center gap-2">
                <img src={user_img} alt="Profile Image" className="w-[32px]" />
                <img src={arrow_down} alt="Icon" className="w-[13px]" />
              </div>
            </div>
          </div>
          <div>{activeComponent[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
