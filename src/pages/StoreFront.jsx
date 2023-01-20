import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/CartContext";
import { logo } from "../assets";
import { Products, Navbar, Hero, Footer } from "../store-components";
import axios from "axios";
import { BASE_URL } from "../services/services";
import { UserContext } from "../context/UserContext";

const StoreFront = () => {
  const { cartLength, cart, products, deleteFromCart, addToCart } =
    useContext(cartContext);
  const { userData } = useContext(UserContext);
  const [name, setName] = useState("");
  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: { Authorization: `Bearer ${userData.access}` },
        "Content-Type": "application/json",
      };
      const res = await axios.get(`${BASE_URL}store/list`, config);
      if (res) {
        setName(res.data.stores[0].store_name);
      }
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
        <Hero storeLogo={logo} storeName={name} />
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
