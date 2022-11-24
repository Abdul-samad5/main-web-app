import React, { useContext } from 'react';
import { cartContext } from '../context/CartContext';
import { logo } from '../assets';
import { Products, Navbar, Hero, Footer } from '../store-components';

const StoreFront = () => {
    const { cartLength, cart, products, deleteFromCart, addToCart } = useContext(cartContext);

    return (
        <div>
            <Navbar product_details={cart} amount_in_cart={cartLength} handleDelete={deleteFromCart} storeName={"emmystore"}/>
            <Hero storeLogo={logo} storeName={"emmystore"}/>
            <Products products={products} handleAdd={addToCart} cart={cart} handleDelete={deleteFromCart}/>
            <Footer/>
        </div>
    )
}

export default StoreFront;