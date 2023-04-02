import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Hero = () => {
  const { storeName, storeLogo } = useContext(UserContext);
  return (
    <div className="w-full z-1 rounded-lg mt-4 py-12 grid place-content-center bg-brand-primary h-auto">
      <div className="w-auto lg:flex lg:justify-between grid place-content-center">
        <img
          src={storeLogo}
          alt="Store Logo"
          className="rounded-full object-cover object-center mx-auto shadow-lg h-[200px] md:w-1/2 lg:h-[200px] lg:mx-3 w-1/2 lg:w-1/3"
        />

        {/* <div className='rounded-full bg-gray-300 h-[150px] lg:h-[200px] mx-3 w-3/4 lg:w-1/3'></div> */}

        <span className="mx-3 lg:my-auto mt-5 text-center">
          <p className="text-white text-4xl font-extrabold">Welcome to</p>
          <p className="text-3xl text-black mt-10 opacity-50 font-extrabold animate-pulse animate-bounce duratioon-1000">
            {`${storeName}'s store`}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Hero;
