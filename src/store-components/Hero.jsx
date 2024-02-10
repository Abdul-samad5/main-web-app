import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/services";
import Cookies from "js-cookie";
const Hero = () => {
  const tk = Cookies.get("_tksr");
  const { storeName, storeLogo } = useContext(UserContext);
  const store_name = useParams("storeName");
  const DomainName = window.location.pathname
  let path = DomainName.replace(/\//g,'');
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}store/list`, { headers: { Authorization: `Bearer ${tk}`} })
      .then((r) => r.json())
      .then((r) => {
        // save data from fetch request to state
        setData(r);
        console.log(r)
      });
  }, []);
  return (
    <div className="w-full z-1 rounded-lg mt-4 py-12 grid place-content-center bg-brand-primary h-auto">
      <div className="w-auto lg:flex lg:justify-between grid place-content-center">
        {/* <img
          src={storeLogo}
          alt="Store Logo"
          className="rounded-full object-cover object-center mx-auto shadow-lg h-[200px] md:w-1/2 lg:h-[200px] lg:mx-3 w-1/2 lg:w-1/3"
        /> */}

        {/* <div className='rounded-full bg-gray-300 h-[150px] lg:h-[200px] mx-3 w-3/4 lg:w-1/3'></div> */}

        <span className="mx-3 lg:my-auto mt-5 text-center">
          <p className="text-white text-4xl font-extrabold">Welcome to</p>
          <p className="text-3xl text-black mt-10 opacity-50 font-extrabold animate-pulse animate-bounce duratioon-1000">
          {path}'s store
          </p>
          {/* <p className="text-white text-xl font-bold">Copy the your unique store link {`${BASE_URL}product/list/${data.user_id}`}</p>
          <h2>{data.user_id}</h2> */}
          <p></p>
        </span>
      </div>
    </div>
  );
};

export default Hero;
