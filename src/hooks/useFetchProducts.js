import axios from "axios";
import { useState, useEffect } from 'react';
import { getProducts } from "../services/services";

// Function to get the products from the API endpoint using axios, useState, and useEffect.
const useFetchProducts = () => {
    // Stores a boolean as axios tries to retrieve the data from the API endpoint.
    const [isLoading, setIsLoading] = useState(true);

    // If axios encounters an error, this keeps track the error.
    const [isError, setIsError] = useState(false);

    // Stores the the data - products in this case - axios gets from the database.
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const res = await getProducts();
            if (!res.statusText === "OK") return;
            console.log(res);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsError(true);
        }
    }

    useEffect(() => {
        fetchProducts();
    });

    return {isLoading, isError, products}
}

export default useFetchProducts;