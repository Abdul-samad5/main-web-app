import React, { useContext, useEffect, useState } from "react";
import { Products, Navbar, Hero, Footer } from "../store-components";
import axios from "axios";
import { BASE_URL } from "../services/services";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const StoreFront = () => {
  const [myProducts, setMyProducts] = useState([]);
  const token = Cookies.get("_tksr");
  const store_name = useParams("storeName");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}store/${store_name.storeName}`);
        // if (res) {
        //   setMyProducts(res.data.data);
        // }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <div className="lg:px-16 px-3">
        <Hero />
        {/* {!myProducts.length ? <p className="text-center text-black flex align-center justify-center text-lg font-bold">Loading...</p> : } */}
        <Products products={myProducts}/>
      </div>
      <Footer />
    </div>
  );
};

export default StoreFront;
