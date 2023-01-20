import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../context/CartContext';
import { LoginContext } from '../context/LoginContext';
import { UserContext } from '../context/UserContext';

const Navbar = ({amount_in_cart, product_details, handleDelete, storeName}) => {
    const [cartToggled, setCartToggled] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    // const [userIconToggled, setUserIconToggled] = useState(false);
    
    const { getTotal } = useContext(cartContext);

    const { userLoggedOut } = useContext(LoginContext);
    const { onUserLogOut } = useContext(UserContext);

    const navigate = useNavigate();

    function handleLogOut() {
        userLoggedOut();
        onUserLogOut();
        navigate("/");
    }
    
    return (
        <div className="z-10 bg-gray-100 shadow-sm lg:flex lg:justify-between sticky py-6 lg:py-0 z-30 top-0 px-10 lg:px-20 w-full">
            <div className='w-full lg:w-1/3 flex justify-between '>
                <Link to="/store-front" className='my-auto'>
                    <p className='text-base text-black uppercase hover:text-brand-primary opacity-60'>{storeName}</p> 
                </Link>

                <div className='lg:hidden hover:bg-gray-300 px-2 h-8 w-10 rounded border border-gray-500' onClick={() => setDropDown(!dropDown)}>
                    <div className='bg-black opacity-70 h-1 w-full my-1 rounded'></div>
                    <div className='bg-black opacity-70 h-1 w-full my-1  rounded'></div>
                    <div className='bg-black opacity-70 h-1 w-full my-1  rounded'></div>
                </div>
            </div>

            <ul className={`lg:flex list-none mt-10 lg:mt-0 w-auto py-1 lg:block ${dropDown ? "" : "hidden"} grid place-content-center`}>
                {/* <li className='px-6 grid group block w-full hover:bg-gray-300 place-content-center py-4' onClick={() => setUserIconToggled(!userIconToggled)}>
                    <span onClick={() => setUserIconToggled(!userIconToggled)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 group-hover:fill-brand-primary fill-black' viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </span>
                    <img src={User} alt="User Icon" className='w-5 h-5 my-auto' onClick={() => setUserIconToggled(!userIconToggled)}/>

                    <div className={`${userIconToggled ? "" : "hidden"} rounded bg-white z-10 absolute top-12 right-30 shadow-lg w-[200px] py-2 h-auto`}>  
                        <Link to={"/login"} onClick={() => setUserIconToggled(!userIconToggled)}>
                            <p className='text-center py-4 text-brand-primary hover:text-brand-secondary bg:white hover:bg-gray-100'>Log in</p>
                        </Link>
                            
                        <Link to="/register" onClick={() => setUserIconToggled(!userIconToggled)}>
                            <p className='text-center py-4 text-brand-primary hover:text-brand-secondary bg:white hover:bg-gray-100'>Sign up</p>
                        </Link> 
                    </div>

                    <span className='px-5 py-3 bg-white hidden rounded group-hover:block absolute right-70 top-12 shadow-lg'>
                        <p className='text-xs text-black'>User</p>
                    </span>
                </li> */}
                <li className='pb-[15px] px-6 group hover:bg-gray-300 flex justify-center align-center place-content-center hover:cursor-pointer' onClick={() => {setCartToggled((prev) => !prev);}}>
                    <div className='grid place-content-center'>
                        <div className='relative bg-brand-primary rounded-full w-4 h-4 text-center top-2 left-3'>
                            <p className='text-white text-xs'>{amount_in_cart}</p>
                        </div>
                        
                        <span onClick={() => {setCartToggled((prev) => !prev);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 hover:cursor-pointer h-5 fill-black group-hover:fill-brand-primary' viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                        </span>

                        <div className={`${cartToggled ? "" : "hidden"} z-10 bg-slate-200 absolute top-16 right-16 shadow-lg w-[300px] h-auto px-5 py-3`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 my-3 fill-black ${product_details.length === 0 ? "" : "hidden"} mx-auto`} viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                            <p className={`text-sm text-center my-3 ${product_details.length === 0 ? "" : "hidden"}`}>No products in the cart.</p>

                            {product_details.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Products
                                            productImage={item.productLogo}
                                            productName={item.productName}
                                            quantity={item.quantity}
                                            price={item.productPrice}
                                            deleteFromCart={handleDelete}
                                            id={item.id}
                                        />
                                    </div>
                                )
                            })}
                            <hr></hr>
                            <div className='flex justify-between mt-3'>
                                <p className='text-sm'>SUBTOTAL:</p>
                                <span className='flex my-2 lg:my-auto'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3 fill-black my-auto' viewBox="0 0 448 512"><path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z"/></svg>
                                    <p className='text-sm my-auto'>{getTotal()}</p>
                                </span>
                            </div>

                            {product_details.length > 0 && <Link to="/store-front/checkout">
                                <button type='button' onClick={() => {setCartToggled((prev) => !prev);}} className='text-white rounded py-3 mt-3 w-full text-center bg-brand-primary hover:bg-brand-secondary'>PROCEED TO CHECKOUT</button>
                            </Link>}
                            {product_details.length === 0 && 
                                <button type='button' onClick={() => {setCartToggled((prev) => !prev);}} className='text-white hover:cursor-not-allowed opacity-50 rounded py-3 mt-3 w-full text-center bg-black'>PROCEED TO CHECKOUT</button>}
                            <Link to="/store-front/view-cart" onClick={() => {setCartToggled((prev) => !prev);}}>
                                <p className='mt-4 text-brand-primary text-center mx-auto w-1/2 hover:text-brand-secondary text-sm' onClick={() => {setCartToggled((prev) => !prev);}}>
                                    View Cart
                                </p>
                            </Link>
                        </div>
                    </div>
                    <p className='flex ml-2 mt-4'>Cart</p>
                    {/* <span className='px-5 py-3 bg-white hidden rounded group-hover:block absolute right-50 top-12 shadow-lg'>
                        <p className='text-xs text-black'>Cart</p>
                    </span> */}
                </li>
                {/* <li className='grid py-4 px-6 group place-content-center hover:cursor-pointer hover:bg-gray-300'>
                    <div className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 group-hover:cursor-pointer h-5 fill-black group-hover:fill-brand-primary' viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/></svg>
                    </div>

                    <span className='px-3 py-2 bg-white hidden rounded group-hover:block absolute right-30 top-14 shadow-lg'>
                        <p className='text-xs text-black'>Settings</p>
                    </span>
                    <p className='flex ml-2 mt-4'>Settings</p>
                </li> */}
                {/* <li className='grid place-content-center group hover:cursor-pointer hover:bg-gray-300 py-4 px-6' onClick={handleLogOut}>
                    <div className='my-auto peer' onClick={handleLogOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 hover:cursor-pointer fill-black group-hover:fill-brand-primary h-5`} viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
                    </div>

                    <p className='mt-2'>Log out</p>

                    <span className='px-3 py-2 bg-white hidden rounded group-hover:block absolute right-10 top-10 shadow-lg'>
                        <p className='text-xs text-black'>Log out</p>
                    </span>
                </li> */}
            </ul> 
        </div>
    )
};

const Products = ({productImage, productName, quantity, price, id, deleteFromCart}) => {
    return (
        <div className='flex justify-between'>
            <img src={productImage} alt="Product" className='w-1/4 h-[80px]'/>

            <div className='my-auto'>
                <p className='text-sm text-black'>{productName}</p>
                <span className='flex'>
                    <p className='text-xs my-auto'>{quantity}</p>
                    <p className='my-auto mx-2 text-xs'>x</p>
                    <span className='flex my-2 lg:my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-2 h-2 fill-black my-auto' viewBox="0 0 448 512"><path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z"/></svg>
                        <p className='text-xs my-auto'>{price}</p>
                    </span>
                </span>
                
            </div>

            <span onClick={() => deleteFromCart(id)} className="my-auto ">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-3 fill-slate-300 hover:fill-brand-primary"
                >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
            </span>
        </div>
    )
}

export default Navbar;