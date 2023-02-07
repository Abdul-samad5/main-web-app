import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/CartContext";
import { Products, Navbar, Hero, Footer } from "../store-components";
import axios from "axios";
import { BASE_URL } from "../services/services";
// import { getProducts } from "../services/services";
import Cookies from "js-cookie";
// import useFetchData from "../hooks/useFetchProducts";

const StoreFront = () => {
  const { cartLength, cart, products, deleteFromCart, addToCart } =
    useContext(cartContext);
  // const [myProducts, setMyProducts] = useState([]);
  const [name, setStoreName] = useState("");
  const [storeLogo, setStoreLogo] = useState("");
  const tk = Cookies.get("_tksr");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}store_settings/store_details`, { headers: { Authorization: `Bearer ${tk}`} });
      const store_name = response.data.data["store_name"];
      const profileLogo = response.data.data["store_logo"];

      console.log(response);
      setStoreName(`${store_name}`);
      setStoreLogo(profileLogo);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar
        product_details={cart}
        amount_in_cart={cartLength}
        handleDelete={deleteFromCart}
        storeName={name}
      />
      <div className="lg:px-16 px-3">
        <Hero storeLogo={storeLogo} storeName={name} />
        <Products
          products={products}
          handleAdd={addToCart}
          cart={cart}
          handleDelete={deleteFromCart}
        />
      </div>
      <Footer />
    </div>
  );
};

export default StoreFront;
