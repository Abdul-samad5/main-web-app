import React from "react";

const Hero = ({ storeLogo, storeName }) => {
  return (
    <div className="w-full z-1 mt-4 py-12 grid place-content-center h-auto">
      <div className="w-auto">
        <div className="w-[100px] h-[100px]">
          <img
            src={storeLogo}
            alt="Store Logo"
            className="rounded-full shadow-lg w-[100%] h-[100%] border-2 border-slate-100 "
            style={{ borderRadius: "50%" }}
          />
        </div>

        <span className="mx-3 my-auto mt-5 text-center">
          <p className="text-white text-4xl font-extrabold">Welcome</p>
          <p className="text-3xl text-black mt-10 opacity-50 font-extrabold animate-pulse animate-bounce duratioon-1000">
            {storeName}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Hero;
