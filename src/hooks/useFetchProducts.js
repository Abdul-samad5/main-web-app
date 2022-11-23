import axios from "axios";
import { useState, useEffect } from 'react';

// Function to get the products from the API endpoint using axios, useState, and useEffect.
const useFetchProducts = (url) => {
    // Stores a boolean as axios tries to retrieve the data from the API endpoint.
    const [isLoading, setIsLoading] = useState(true);

    // If axios encounters an error, this keeps track the error.
    const [isError, setIsError] = useState(false);

    // Stores the the data - products in this case - axios gets from the database.
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            setProducts(response.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setIsError(true);
        });
    }, [url]);

    return {isLoading, isError, products}
}

export default useFetchProducts;