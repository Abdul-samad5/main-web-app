import { useState, useContext } from 'react';
import { styles } from '../constants';
import axios from 'axios';
import { BASE_URL } from '../services/services';
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
  storeDetails,
  finances,
  websiteSettings,
} from '../assets';
import { AiFillWarning } from 'react-icons/ai';

import {
  AddEditProducts,
  Collections,
  MyCustomers,
  TransactionHistory,
  StoreReviews,
  StoreDetails,
  Discounts,
  WebsiteSettings,
  MyOrders,
  AllProducts,
  MyStore,
  Finances,
  UserAccount,
} from '../components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
import { getStoreInfo, userLogout } from '../services/services';
import Cookies from 'js-cookie';
import { User } from '../constants/config';

function DbIcon({ src }) {
  return <img src={src} className='w-[16px]' alt='Icon' />;
}

const Dashboard = () => {
  // Sidebar
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [emailUrl, setEmailUrl] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Component to be rendered on the main
  const [activeComponent, setActiveComponent] = useState([<MyStore />]);
  const tk = Cookies.get('_tksr');
  const id = Cookies.get('_id');
  const isVerified = Cookies.get('isVerify');
  const url = Cookies.get('emailUrl');

  console.log(typeof isVerified);
  // verified state
  const [verifyState, setVerifyState] = useState(isVerified);

  // Dropdowns on the sidebar
  const [isProdOpen, setIsProdOpen] = useState(false);
  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function handleClick() {
    setIsNavOpen((prev) => !prev);
  }
  const { userLoggedOut } = useContext(LoginContext);
  const { onUserLogOut } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogOut() {
    async function logUserOut() {
      const res = await userLogout();
      navigate('/');
      console.log(res);
      if (res) {
        userLoggedOut();
        onUserLogOut();
        // navigate('/login');
      }
    }
    logUserOut();
  }

  function showActiveComponent(e, comp) {
    e.stopPropagation();
    setActiveComponent([comp]);
  }

  function handleDropdown(e, handler) {
    e.stopPropagation();
    handler((prev) => !prev);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${BASE_URL}store_settings/store_details`,
        { headers: { Authorization: `Bearer ${tk}` } }
      );
      console.log(response, 'kk');
      const store_name = response.data.data['store_name'];
      const profileLogo = response.data.data['store_logo'];
      // const url = response.data.user_data.user_email_url;

      // const verifyState = response.data.user_data.user_is_active;

      setStoreName(`${store_name}`);
      setStoreLogo(profileLogo);
      // setEmailUrl(url);
      // setIsEmailVerified(verifyState);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!tk) {
      navigate('/');
    }
    return;
  }, [tk]);

  return (
    <div className='w-full overflow-hidden'>
      <div className='w-full flex'>
        {/* {Sidebar} */}
        <div
          className={`w-full lg:w-1/5 shrink-0 fixed left-0 top-0 h-screen border-r border-brand-gray-300 ${
            isNavOpen ? '-translate-x-[0]' : '-translate-x-[100%]'
          } lg:-translate-x-[0] z-10 bg-white transition-transform duration-500 overflow-y-scroll`}
        >
          <div className='border-b p-5 flex w-full justify-between items-center'>
            <img src={logo} className='w-[50px]' alt='Yetti Logo' />
            <img
              src={close}
              className='w-[24px] lg:hidden'
              alt='Icon'
              onClick={handleClick}
            />
          </div>
          <div className='border-b flex items-center justify-between p-4 mb-[10px]'>
            <h1 className='font-bold text-[16px] '>{storeName}</h1>
            <DbIcon src={edit} />
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <MyStore />)}
            onClick={(e) => {
              showActiveComponent(e, <MyStore />);
              handleClick();
            }}
          >
            <DbIcon src={store} />
            <h2>My Store</h2>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <MyOrders />)}
            onClick={(e) => {
              showActiveComponent(e, <MyOrders />);
              handleClick();
            }}
          >
            <DbIcon src={orders} />
            <h2>My Orders</h2>
          </div>
          <div
            className='w-full'
            onClick={(e) => handleDropdown(e, setIsProdOpen)}
          >
            <div className={`${styles.dbNavItem} relative`}>
              <DbIcon src={products} />
              <h2>Products</h2>
              <div className='absolute top-1/2 -translate-y-1/2 right-4'>
                <DbIcon src={isProdOpen ? arrow_down : arrow_right} />
              </div>
            </div>
            <div
              className={`${
                isProdOpen ? 'max-h-[200px]' : 'max-h-0'
              } transition-[max-height] duration-300 pl-[24px] overflow-hidden `}
            >
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <AllProducts />)}
                onClick={(e) => {
                  showActiveComponent(e, <AllProducts />);
                  handleClick();
                }}
              >
                <DbIcon src={all_prods} />
                <h2>All Products</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
                onClick={(e) => {
                  showActiveComponent(e, <AddEditProducts />);
                  handleClick();
                }}
              >
                <DbIcon src={add_prod} />
                <h2>Add New Product</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <Collections />)}
                onClick={(e) => {
                  showActiveComponent(e, <Collections />);
                  handleClick();
                }}
              >
                <DbIcon src={collections} />
                <h2>Collections</h2>
              </div>
            </div>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <MyCustomers />)}
            onClick={(e) => {
              showActiveComponent(e, <MyCustomers />);
              handleClick();
            }}
          >
            <DbIcon src={customers} />
            <h2>My Customers</h2>
          </div>
          <div
            className='w-full'
            onClick={(e) => handleDropdown(e, setIsMarkOpen)}
          >
            <div className={`${styles.dbNavItem} relative`}>
              <DbIcon src={products} />
              <h2>Marketing</h2>
              <div className='absolute top-1/2 -translate-y-1/2 right-4'>
                <DbIcon src={isMarkOpen ? arrow_down : arrow_right} />
              </div>
            </div>
            <div
              className={`${
                isMarkOpen ? 'max-h-[200px]' : 'max-h-0'
              } transition-[max-height] duration-300 pl-[24px] overflow-hidden`}
            >
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <Discounts />)}
                onClick={(e) => {
                  showActiveComponent(e, <Discounts />);
                  handleClick();
                }}
              >
                <DbIcon src={discounts} />
                <h2>Discounts</h2>
              </div>
              {/* <div
                className={`${styles.dbNavItemDrop}`}
                onClick={(e) => showActiveComponent(e, <AddEditProducts />)}
              >
                <DbIcon src={marketing} />
                <h2>Campaign</h2>
              </div> */}
            </div>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <Finances />)}
            onClick={(e) => {
              showActiveComponent(e, <Finances />);
              handleClick();
            }}
          >
            <DbIcon src={finances} />
            <h2>Finances</h2>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <StoreReviews />)}
            onClick={(e) => {
              showActiveComponent(e, <StoreReviews />);
              handleClick();
            }}
          >
            <DbIcon src={review} />
            <h2>Store reviews</h2>
          </div>
          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
            onClick={(e) => {
              showActiveComponent(e, <TransactionHistory />);
              handleClick();
            }}
          >
            <DbIcon src={history} />
            <h2>Transaction history</h2>
          </div>
          <div className='border-b border-t p-4 mb-[10px]'>
            <h1 className='font-bold text-[16px] text-brand-gray'>Settings</h1>
          </div>
          {/* <div
            className={`${styles.dbNavItem} relative w-full`}
            onClick={(e) => showActiveComponent(e, <StoreDetails />)}
          >
            <DbIcon src={settings} />
            <h2>Store settings</h2>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <DbIcon src={arrow_right} />
            </div>
          </div> */}
          <div
            className='w-full'
            onClick={(e) => handleDropdown(e, setIsSettingsOpen)}
          >
            <div className={`${styles.dbNavItem} relative`}>
              <DbIcon src={settings} />
              <h2>Store Settings</h2>
              <div className='absolute top-1/2 -translate-y-1/2 right-4'>
                <DbIcon src={isSettingsOpen ? arrow_down : arrow_right} />
              </div>
            </div>
            <div
              className={`${
                isSettingsOpen ? 'max-h-[200px]' : 'max-h-0'
              } transition-[max-height] duration-300 pl-[24px] overflow-hidden`}
            >
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <StoreDetails />)}
                onClick={(e) => {
                  showActiveComponent(e, <StoreDetails />);
                  handleClick();
                }}
              >
                <DbIcon src={storeDetails} />
                <h2>Store Details</h2>
              </div>
              <div
                className={`${styles.dbNavItemDrop}`}
                // onClick={(e) => showActiveComponent(e, <WebsiteSettings />)}
                onClick={(e) => {
                  showActiveComponent(e, <WebsiteSettings />);
                  handleClick();
                }}
              >
                <DbIcon src={websiteSettings} />
                <h2>Website Settings</h2>
              </div>
            </div>
          </div>
          {/* <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={subscription} />
            <h2>Subscription</h2>
          </div> */}

          <div
            className={`${styles.dbNavItem}`}
            // onClick={(e) => showActiveComponent(e, <UserAccount />)}
            onClick={(e) => {
              showActiveComponent(e, <UserAccount />);
              handleClick();
            }}
          >
            <DbIcon src={user_account} />
            <h2>User Account</h2>
          </div>

          {/* <div
            className={`${styles.dbNavItem}`}
            onClick={(e) => showActiveComponent(e, <TransactionHistory />)}
          >
            <DbIcon src={cookies} />
            <h2>Privacy & Cookies</h2>
          </div> */}
        </div>

        {/* {Main} */}
        <div className='lg:w-4/5 w-full shrink-0 bg-brand-gray-200 min-h-screen p-[24px] lg:px-10 lg:py-5 lg:absolute top-0 right-0'>
          <div className='w-full flex justify-between items-center'>
            <div className='flex gap-8 items-center'>
              <img
                src={burger}
                className='w-[24px] block lg:hidden'
                alt='Icon'
                onClick={handleClick}
              />
              <Link to={'/store-front'}>
                <button className={`${styles.buttonOutline}`}>
                  Go to store front
                </button>
              </Link>
            </div>
            {verifyState === 'false' && (
              <div className='hidden p-6 bg-[#fff9e9] rounded-xl md:flex items-center gap-2 ml-4 mr-4'>
                <AiFillWarning className='text-[#d39f1c]' />
                <h2 className='text-center'>
                  Your Email is not verified. Click{' '}
                  {/* <Link className='text-blue-200 hover:cursor-pointer'>
                    here
                  </Link>{' '} */}
                  <span className='text-blue-200 hover:cursor-pointer'>
                    <a
                      href={url}
                      target='_blank'
                      onClick={() => {
                        setVerifyState('true');
                      }}
                    >
                      here
                    </a>
                  </span>{' '}
                  to verify
                </h2>
              </div>
            )}
            <div className='flex items-center'>
              <div className='relative w-[370px] hidden lg:block'>
                <img
                  src={search}
                  alt='Icon'
                  className='w-[13px] absolute top-1/2 left-3 -translate-y-[50%]'
                />
                <input
                  type='search'
                  placeholder='Search for customers,orders,products...'
                  className='w-full placeholder:text-brand-gray-400 bg-inherit border py-4 px-8 rounded-xl'
                />
              </div>
              <div className='mr-[24px] ml-2'>
                <img src={bell} alt='Icon' className='w-[18px]' />
              </div>
              <div
                className='flex items-center gap-2'
                onClick={() => setIsLogOpen(!isLogOpen)}
              >
                <img
                  src={storeLogo === '' ? user_img : storeLogo}
                  alt='Profile Image'
                  className={
                    storeLogo === ''
                      ? 'w-[32px]'
                      : 'w-[40px] h-[40px] rounded-full'
                  }
                />
                <img src={arrow_down} alt='Icon' className='w-[13px]' />
                {/* <Link to="/"> */}
                <div
                  onClick={handleLogOut}
                  className={`absolute flex px-2 py-2 ${
                    isLogOpen ? 'flex' : 'hidden'
                  } top-20 right-10 rounded-sm shadow-lg hover:bg-gray-200 bg-white flex group`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='fill-black my-auto group-hover:fill-brand-secondary h-3 w-3'
                    viewBox='0 0 512 512'
                  >
                    <path d='M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z' />
                  </svg>
                  <p className='text-xs text-black  my-auto mx-3 opacity-60 group-hover:opacity-100'>
                    Sign out
                  </p>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
          {verifyState === 'false' && (
            <div className='p-6 bg-[#fff9e9] rounded-xl flex items-center justify-center gap-2 ml-4 mr-4 mt-4 md:hidden'>
              <AiFillWarning className='text-[#d39f1c] ' />
              <h2 className='text-center'>
                Your Email is not verified. Click{' '}
                <span className='text-blue-200 hover:cursor-pointer'>
                  <a
                    href={url}
                    target='_blank'
                    onClick={() => {
                      setVerifyState('true');
                    }}
                  >
                    here
                  </a>
                </span>{' '}
                to verify
              </h2>
            </div>
          )}

          <div>{activeComponent[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
