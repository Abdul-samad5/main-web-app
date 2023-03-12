import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Products, Navbar, Hero, Footer } from "../store-components";
import axios from "axios";
import { BASE_URL } from "../services/services";
// import { getProducts } from "../services/services";
import Cookies from "js-cookie";
// import useFetchData from "../hooks/useFetchProducts";

const StoreFront = () => {
  return (
    <div>
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
