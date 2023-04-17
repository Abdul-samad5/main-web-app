import React, { useContext, useEffect, useState } from "react";
import { Products, Navbar, Hero, Footer } from "../store-components";

const StoreFront = () => {
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
