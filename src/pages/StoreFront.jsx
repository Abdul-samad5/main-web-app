import React, { useContext, useEffect, useState } from "react";
import { Products, Navbar, Hero, Footer } from "../store-components";
import axios from "axios";
import { BASE_URL } from "../services/services";
import Cookies from "js-cookie";

const StoreFront = () => {

  const token = Cookies.get("_tksr");

  // useEffect(() => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //     "Content-Type": "application/json",
  //   };

  //   async function fetchData() {
  //     const response = await axios.get(`${BASE_URL}store_settings/store_details`);;

  //     const store_name = response.data.data["store_name"];
  //     const storeLogo = response.data.data["store_logo"];

  //     setStoreName(store_name);
  //     setStoreLogo(storeLogo);
  //     console.log(response);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="relative">
      <Navbar />
      <div className="lg:px-16 px-3">
        <Hero />
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default StoreFront;
