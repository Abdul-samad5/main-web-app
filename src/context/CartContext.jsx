import React, { createContext, useState } from 'react';
import { logo } from '../assets';
export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            productLogo: logo,
            productPrice: 2000,
            productName: "Cloth"
        },
        {
            id: 2,
            productLogo: logo,
            productPrice: 4000,
            productName: "Indomie"
        },
        {
            id: 3,
            productLogo: logo,
            productPrice: 10000,
            productName: "Bedsheets"
        },
        {
            id: 4,
            productLogo: logo,
            productPrice: 5000,
            productName: "Tv Remote"
        },
    ]);
    
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const addToCart = (id) => {
        const item = cart.find(p => p.id === id);
        if(typeof item === 'undefined') {
        const product = products.find(p => p.id === id);
        product.quantity = 1;
        cart.push(product)
        console.log(product);
        setCart(cart);
        setCartLength(() => cart.length);
        } else {
            alert("Already added to cart.");
        }
    }
    
    const changeQuantity = (id, value) => {
        let Item = cart.find(item => item.id === id);
        const index = cart.indexOf(Item);
        cart[index].quantity = value;
        setCart(cart);
    }

    const deleteFromCart = (id) => {
        let product = cart.find(p => p.id === id);
        cart.splice(cart.indexOf(product), 1);
        setCart(cart);
        setCartLength(() => cart.length);
    }

    const clearCart = () => {
        setCart([]);
        setCartLength(0);
    }
    
    const getTotal = () => {
        if(cart.length === 0) {
            return 0
        }
        return cart.reduce((total, currentValue) => {
            return total + currentValue.productPrice
        }, 0);
    }

    return (
        <cartContext.Provider value={{getTotal, products, cart, deleteFromCart, clearCart, changeQuantity, addToCart, cartLength}}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider;